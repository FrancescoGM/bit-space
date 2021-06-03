import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { fauna } from '../../services/fauna'
import { Team } from '../../models/Team'

type FaunaTeamResponse = {
  ref: {
    id: string
  }
  data: Team
}

type TeamsQueryResponse = {
  data: FaunaTeamResponse[]
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
  try {
    const teams = await fauna.query<TeamsQueryResponse>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('teams'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    )

    const players = teams.data.map(team => team.data.players).flat(2)

    const ageTeams = teams.data.map(team => ({
      id: team.ref.id,
      name: team.data.name,
      average: (
        team.data.players.flat().reduce((acc, player) => acc + player.age, 0) /
        11
      ).toFixed(2)
    }))

    const data = {
      teams: teams.data.map(team => ({
        id: team.ref.id,
        name: team.data.name,
        description: team.data.description
      })),
      averageAgeTeams: {
        most: ageTeams
          .sort((a, b) => Number(a.average) - Number(b.average))
          .slice(0, 4),
        less: ageTeams
          .sort((a, b) => Number(b.average) - Number(a.average))
          .slice(0, 4)
      },

      pickedPlayer: {
        most: players
          .sort(
            (a, b) =>
              players.filter(v => v.id === a.id).length -
              players.filter(v => v.id === b.id).length
          )
          .pop(),
        less: players
          .sort(
            (a, b) =>
              players.filter(v => v.id === a.id).length +
              players.filter(v => v.id === b.id).length
          )
          .pop()
      }
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).end()
  }
}
