import type { NextApiRequest, NextApiResponse } from 'next'

const isLogin = (req:NextApiRequest, res:NextApiResponse) => {
    console.log(req.cookies.id, "isLogin")
    res.statusCode = 200;
    res.json({ id : req.cookies.id });
}

export default isLogin