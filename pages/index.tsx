import type { NextPage } from "next";
import { useState } from "react";
import Main from "../components/main/Main";
import axios  from "axios";
import styles from "../styles/Home.module.css";



const Home: NextPage = () => {
  const [loginUser, setLoginUser] = useState({});/* 이 state는 유저정보를 가지고 있다 */
  /* console.log(loginUser) */
  axios.get("/api/isLogin").then(res => {
    if(res.status === 200 && res.data.id){
      console.log(res.data.id)
    }
  })
  
  return (
    <>
      <Main loginUser={loginUser} setLoginUser={setLoginUser} />
    </>
  );
};

/* Home.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
}; */

export default Home;
