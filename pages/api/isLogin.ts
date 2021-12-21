import type { NextApiRequest, NextApiResponse } from 'next'

const isLogin = (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200;
    res.json({ id : req.cookies.id });
}

export default isLogin