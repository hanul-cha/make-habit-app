import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  //여기가 로그인
  return (
    <div>
      
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
};

export default Home
