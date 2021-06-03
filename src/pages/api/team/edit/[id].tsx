import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from '../../../../services/fauna'
import { query as q } from 'faunadb'
import { formTeamScheme } from '../../../team/create'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      res.status(405).end('Method not allowed')
    }
    const id = req.query.id

    if (!id) {
      res.status(400).end('Id is not defined')
    }

    const data = await formTeamScheme.validate(req.body, { stripUnknown: true })
    console.log(data)
    await fauna.query(
      q.Update(q.Ref(q.Collection('teams'), id), {
        data: {
          updated_at: q.ToString(q.Now()),
          ...data
        }
      })
    )

    res.status(200).json({ message: 'Success in updating the team' })
  } catch (error) {
    res.status(500).end(error)
  }
}
