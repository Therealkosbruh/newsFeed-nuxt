export interface AlgoliaHit {
  objectID: string;
  title: string;
  url?: string;
  author: string;
  created_at_i: number;
  points: number | null;
  num_comments: number | null;
}

export interface AlgoliaResponse {
  hits: AlgoliaHit[];
  nbPages: number;
  page: number;
}
