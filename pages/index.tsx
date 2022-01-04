import type { NextPage } from "next";
import { useState } from "react";
import Main from "../components/main/Main";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [loginUser, setLoginUser] = useState(""); /* 이 state는 유저id를 가지고 있다 */
  const [userInfo, setUserInfo] = useState();

  return (
    <>
      <Main
        loginUser={loginUser}
        userInfo={userInfo}
        setLoginUser={setLoginUser}
        setUserInfo={setUserInfo}
      />
    </>
  );
};

/* Home.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
}; */

export default Home;
