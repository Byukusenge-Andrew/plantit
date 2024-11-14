import { signIn } from "../../../lib/actions/user.action";
import { NextApiRequest, NextApiResponse } from 'next'; 
export default async function handler(req: NextApiRequest, res: NextApiResponse) { // Add types to parameters
  if (req.method === 'POST') {
    return signIn(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed' });
}