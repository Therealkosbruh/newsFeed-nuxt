/// <reference lib="dom" />
import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);

  if (!url || typeof url !== "string" || !url.startsWith("http")) {
    throw createError({ statusCode: 400, message: "Invalid URL" });
  }

  try {
    const html = await $fetch<string>(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HN Reader/1.0)",
        Accept: "text/html",
      },
      timeout: 8000,
    });

    const { document: doc } = parseHTML(html);
    const reader = new Readability(doc as unknown as Document);
    const article = reader.parse();

    return {
      content: article?.content ?? null,
      excerpt: article?.excerpt ?? null,
    };
  } catch {
    throw createError({ statusCode: 422, message: "Could not parse article" });
  }
});
