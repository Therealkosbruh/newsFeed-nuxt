import { kyClient } from "../../../shared/api/httpClient";
import type { Story, StoryType } from "../../../shared/types/story";

export async function getStoryIds(type: StoryType): Promise<number[]> {
    return kyClient.get(`${type}stories.json`).json<number[]>()
}

export async function getStoryById(id: number): Promise<Story> {
  return kyClient.get(`item/${id}.json`).json<Story>()
}

export async function getStoriesByIds(ids: number[]): Promise<Story[]> {
  const results = await Promise.allSettled(ids.map(id => getStoryById(id)))
  
  return results
    .filter((result): result is PromiseFulfilledResult<Story> => result.status === 'fulfilled')
    .map(result => result.value)
}