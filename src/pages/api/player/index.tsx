import { NextApiRequest, NextApiResponse } from 'next'
import { apiFootball } from '../../../services/apiFootball'
import { Player } from '../../../models/Player'

type ResponsePlayer = {
  player: Player
}

type PlayerResponse = {
  response: ResponsePlayer[]
}

const players = [
  {
    id: 116819,
    name: 'Juan Francisco García García',
    age: 40,
    nationality: 'Spain'
  },

  {
    id: 117955,
    name: 'Guillermo Luis Franco Farquarson',
    age: 37,
    nationality: 'Mexico'
  },
  {
    id: 79127,
    name: 'Jose Francisco Villavicenco Cevallos',
    age: 42,
    nationality: 'Ecuador'
  },
  { id: 91371, name: 'Francesco Totti', age: 41, nationality: 'Italy' },
  {
    id: 113988,
    name: 'Leonardo Neoren Franco',
    age: 39,
    nationality: 'Argentina'
  },

  { id: 105426, name: 'Frank  Lampard', age: 38, nationality: 'England' },
  { id: 15396, name: 'Francis Odinaka Uzoho', age: 23, nationality: 'Nigeria' },
  {
    id: 35806,
    name: 'Francisco Javier Rodríguez Pinedo',
    age: 39,
    nationality: 'Mexico'
  },
  { id: 6798, name: 'I. Franjić', age: 34, nationality: 'Australia' },

  { id: 2831, name: 'W. Francis', age: 31, nationality: 'Costa Rica' },
  { id: 41, name: 'Juanfran', age: 36, nationality: 'Spain' }
]

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // const { name } = req.query

    // const { data } = await apiFootball.get<PlayerResponse>('players', {
    //   param{
    //     search: name,
    //     league: '1'
    //   }
    // })

    // const players: Player[] = data.response.map(({ player }) => ({
    //   id: player.id,
    //   name: player.name,
    //   age: player.age,
    //   nationality: player.nationality
    // }))

    return res.status(200).json(players)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}
