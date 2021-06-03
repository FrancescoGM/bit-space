import useSWR from 'swr'
import { api } from '../services/api'
import { AxiosRequestConfig } from 'axios'

export function useFetch<Data = unknown, Error = unknown>(
  url: string,
  options?: AxiosRequestConfig
): { data: Data; error: Error } {
  const { data, error } = useSWR<Data>(url, async url => {
    const { data } = await api.get(url, options)
    return data
  })
  return { data, error }
}
