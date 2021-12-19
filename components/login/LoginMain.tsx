import { useRouter } from 'next/router'
import React from 'react'

const LoginMain = () => {
    const router = useRouter()
    const successLogin = () => {
        router.push({
            pathname: '/',
            query: {
                user: "광희",
                psword:1234
            },
            
        },'/')
    }
    return (
        <div>
            
            <h2>login</h2>
            <button onClick={successLogin}>로그인하기</button>
        
        </div>
    )
}

export default LoginMain
