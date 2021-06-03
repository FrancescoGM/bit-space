import { NextApiRequest, NextApiResponse } from 'next'
import { apiFootball } from '../../../services/apiFootball'
import { Player } from '../../../models/Player'

type ResponsePlayer = {
  player: Player
}

type PlayerResponse = {
  response: ResponsePlayer[]
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { name } = req.query

    const { data } = await apiFootball.get<PlayerResponse>('players', {
      params: {
        search: name,
        league: '1'
      }
    })

    const players: Player[] = data.response.map(({ player }) => ({
      id: player.id,
      name: player.name,
      age: player.age,
      nationality: player.nationality
    }))

    return res.status(200).json(players)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}
