import { kyClient, algoliaClient } from "../../../shared/api/httpClient";
import type { Story, StoryType } from "../../../shared/types/story";
import type {
  AlgoliaHit,
  AlgoliaResponse,
} from "../../../shared/types/algolia";

export async function getStoryIds(type: StoryType): Promise<number[]> {
  return kyClient.get(`${type}stories.json`).json<number[]>();
}

export async function getStoryById(id: number): Promise<Story> {
  return kyClient.get(`item/${id}.json`).json<Story>();
}

export async function getStoriesByIds(ids: number[]): Promise<Story[]> {
  const results = await Promise.allSettled(ids.map((id) => getStoryById(id)));
  return results
    .filter((r): r is PromiseFulfilledResult<Story> => r.status === "fulfilled")
    .map((r) => r.value);
}

function hitToStory(hit: AlgoliaHit): Story {
  return {
    id: parseInt(hit.objectID),
    title: hit.title,
    url: hit.url,
    by: hit.author,
    time: hit.created_at_i,
    score: hit.points ?? 0,
    descendants: hit.num_comments ?? undefined,
    type: "story",
  };
}

export async function searchStoriesByQuery(
  query: string,
  page = 0,
  hitsPerPage = 20,
): Promise<{ stories: Story[]; nbPages: number }> {
  const res = await algoliaClient
    .get("search", {
      searchParams: { query, tags: "story", page, hitsPerPage },
    })
    .json<AlgoliaResponse>();

  return { stories: res.hits.map(hitToStory), nbPages: res.nbPages };
}
