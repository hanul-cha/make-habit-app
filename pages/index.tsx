import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Main from "../components/main/main";
import styles from "../styles/Home.module.css";



const Home: NextPage = () => {
  const [checkLogin, setCheckLogin] = useState({});
  return (
    <>
      <Main checkLogin={checkLogin} setCheckLogin={setCheckLogin} />
    </>
  );
};

/* Home.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
}; */

export default Home;
