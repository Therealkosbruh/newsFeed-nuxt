import ky from 'ky'

export const kyClient = ky.create({
  prefix: 'https://hacker-news.firebaseio.com/v0',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get']
  }
})