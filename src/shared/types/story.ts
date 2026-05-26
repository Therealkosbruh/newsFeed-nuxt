export interface Story {
  id: number
  title: string
  url?: string
  by: string
  time: number
  score: number
  descendants?: number
  kids?: number[]
  type: 'story' | 'comment' | 'job'
}

export type StoryType = 'top' | 'new' | 'best'