import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const health = { status: 'green', healthy: true }

  return res.status(200).json(health)
}
