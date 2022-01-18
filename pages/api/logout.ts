import type { NextApiRequest, NextApiResponse } from 'next'

const logout = async (req: any, res:NextApiResponse) => {
        res.setHeader("Set-Cookie",`id=${req.cookies.id};Max-Age=0;HttpOnly,Secure`)
        res.statusCode = 200;
        res.json({message: "ok"})
}

export default logout