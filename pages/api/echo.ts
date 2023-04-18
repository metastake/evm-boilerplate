import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const echo = {
    headers: req.headers,
    cookies: req.cookies,
    body: req.body
  }

  return res.status(200).json(echo)
}