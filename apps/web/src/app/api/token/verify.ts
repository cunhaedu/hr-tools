import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if(req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed!' })
  }

  const { token } = req.body;

  console.log(token);

  try {
    const secret = String(process.env.NEXTAUTH_SECRET);
    jwt.verify(token, secret);

    res.json({ message: 'Provided token is valid!' });
  } catch (error) {
    res.status(400).json({ message: 'Provided token is invalid!' });
  }
}
