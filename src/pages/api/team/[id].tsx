import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from '../../../services/fauna'
import { query as q } from 'faunadb'
import { Team } from '../../../models/Team'

interface TeamQueryResponse {
  ref: {
    id: string
  }
  data: Team
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      res.status(405).end('Method not allowed')
    }

    const { id } = req.query

    if (!id) {
      return res.status(400).end('Id is not defined')
    }

    const team = await fauna.query<TeamQueryResponse>(
      q.Get(q.Ref(q.Collection('teams'), id))
    )

    res.status(200).json({ id: team.ref.id, ...team.data })
  } catch (error) {
    res.status(500).end(error)
  }
}
