import type { NextApiRequest, NextApiResponse } from 'next'

const isLogin = (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200;
    res.json({ params: req.cookies.params });
}

export default isLogin