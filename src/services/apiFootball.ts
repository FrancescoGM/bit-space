import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export function apiFootballClient(config?: AxiosRequestConfig): AxiosInstance {
  return axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    },
    ...config
  })
}

export const apiFootball = apiFootballClient()
