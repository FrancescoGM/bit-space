import { NextApiRequest, NextApiResponse } from 'next'
import { ValidationError } from 'yup'
import { fauna } from '../../../services/fauna'
import { formTeamScheme } from '../../team/create'
import { query as q } from 'faunadb'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      res.status(405).end('Method not allowed')
    }
    const data = await formTeamScheme.validate(req.body, { stripUnknown: true })

    const team = await fauna.query(
      q.Create(q.Collection('teams'), {
        data: {
          created_at: q.ToString(q.Now()),
          ...data
        }
      })
    )

    res.status(200).json({ message: 'Successfully created team', team })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(500).end(error.message)
    }
    res.status(500).end(error)
  }
}
