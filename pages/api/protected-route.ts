import { AuthenticatedRequest } from '../../lib/middleware/auth.middleware';
import { authMiddleware } from '../../lib/middleware/auth.middleware';
import { NextApiResponse } from 'next';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  // req.user is now available with the decoded token payload
  const { user } = req;
  
  res.json({ 
    message: 'Protected data', 
    user 
  });
}

export default authMiddleware(handler); 