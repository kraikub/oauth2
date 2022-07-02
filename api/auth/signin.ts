import type { NextApiRequest, NextApiResponse } from 'next'

export function handleSignin(req: NextApiRequest, res: NextApiResponse) {
    const { client_id, scope, ref } = req.query;
}