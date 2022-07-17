import type { NextApiRequest, NextApiResponse } from 'next'
import { mongodb } from '../../db/mongodb';
import { ApplicationModel } from '../../db/models/application';

export async function handleGetApplicationData(req: NextApiRequest, res: NextApiResponse) {

    await mongodb.connect()

    const { client_id } = req.query;
    
    const queryResult = await ApplicationModel.findOne({ clientId: client_id })
    res.json({ result: queryResult })
}