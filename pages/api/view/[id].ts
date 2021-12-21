import type { NextApiRequest, NextApiResponse } from 'next'

const id = (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200;
    res.json({ name: req.query.id })
}

export default id