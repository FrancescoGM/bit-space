import axios from 'axios'

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://localhost:3000'
      : 'http://localhost:3000/api'
})
