import useSWR from 'swr'
import { api } from '../services/api'
import { TeamListTeam } from '../components/TeamList'
import { ListAverageAgeTeam } from '../components/ListAverageAge'

type HomeData = {
  teams: TeamListTeam[]
  averageAgeTeams: {
    most: ListAverageAgeTeam[]
    less: ListAverageAgeTeam[]
  }
}

export function useHome<Error = unknown>(): { data: HomeData; error: Error } {
  const { data, error } = useSWR<HomeData>(
    '/home',
    async url => {
      const { data } = await api.get(url)
      return data
    },
    { revalidateOnFocus: true }
  )
  return { data, error }
}
