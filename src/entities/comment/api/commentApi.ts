import { kyClient } from "../../../shared/api/httpClient";
import type { Comment } from "../../../shared/types/comment";

export async function getCommentById(id: number): Promise<Comment> {
  return kyClient.get(`item/${id}.json`).json<Comment>();
}

export async function getCommentsByIds(ids: number[]): Promise<Comment[]> {
  const results = await Promise.allSettled(ids.map((id) => getCommentById(id)));
  return results
    .filter(
      (r): r is PromiseFulfilledResult<Comment> =>
        r.status === "fulfilled" && !r.value.deleted && !r.value.dead,
    )
    .map((r) => r.value);
}
