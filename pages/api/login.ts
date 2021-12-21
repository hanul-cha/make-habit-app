import type { NextApiRequest, NextApiResponse } from 'next'


const login = (req: any, res:NextApiResponse) => {
    if(req.method === "POST") {
        const params = req.body.params
        console.log(params)
        res.setHeader(`Set-Cookie`,`id=${params.id};Max-Age=3600;HttpOnly,Secure`)
        res.statusCode = 200;
        res.json({ message: params });
    }
    /* 
    encodeURI 이거 붙여야 한글됨
    */
}

export default login