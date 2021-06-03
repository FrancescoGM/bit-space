import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from '../../../../services/fauna'
import { query as q } from 'faunadb'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method !== 'DELETE') {
      res.setHeader('Allow', 'DELETE')
      res.status(405).end('Method not allowed')
    }
    const id = req.query.id

    if (!id) {
      res.status(400).end('Id is required')
    }

    await fauna.query(q.Delete(q.Ref(q.Collection('teams'), id)))

    res.status(200).json({ message: 'Successful deleting the team' })
  } catch (error) {
    res.status(500).end(error)
  }
}
