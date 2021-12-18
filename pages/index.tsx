import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [checkLogin, setCheckLogin] = useState(false)
  return (
    checkLogin?(
      <h1>hi</h1>
    ):(
      <div>
      <h2>로그인이 필요합니다</h2>
      <Link href={'/login'} >로그인</Link>
      </div>
    )
  )
}

/* Home.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
}; */

export default Home
