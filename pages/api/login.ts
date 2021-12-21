import type { NextApiRequest, NextApiResponse } from 'next'

const login = (req: any, res:NextApiResponse) => {
    if(req.method === "POST") {
        const params = req.body.params
        res.setHeader("Set-Cookie",`params=1234;Max-Age=3600;HttpOnly,Secure`)
        res.statusCode = 200;
        res.json({ message: 'ok' });
        console.log(params)
    }
}

export default login