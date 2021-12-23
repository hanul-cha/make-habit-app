import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import UseGraphql from "../customhooks/UseGraphql";


interface MainTypeProps {
  loginUser: string;
  userInfo:{
    name?:string
    password?:string
    userId? :string
  } | null | undefined
  setLoginUser: (a: string) => void;
  setUserInfo:(a:any) => void
}

const Main = ({ loginUser, userInfo, setLoginUser, setUserInfo }: MainTypeProps) => {
  const router = useRouter();

  

  let user = router.query;
  useEffect(() => {
    if (user.userId !== undefined) {
      setLoginUser(String(user.userId));
    }
    //첫로그인하고나서 그려줄 화면에 필요한 setState
    axios.get("/api/isLogin").then((res) => {
      if (res.status === 200 && res.data.id) {
        setLoginUser(res.data.id);
      }
    });
    //새로고침이나 라우트 이동후에 사용할 setState

    

  }, []);

  const { loading, data } = UseGraphql(loginUser)
  console.log(loading, data)
  
  //위에거 대신에 state에 할당해보자
  useEffect(() => {
    if(!loading){
      /* console.log(data.userByUserId) */
      setUserInfo(data.userByUserId)
      console.log(userInfo)
    }
  })
  

  const removeCookie = () => {
    axios.get("/api/logout").then((res) => {
      if (res.status === 200) {
        console.log("쿠키삭제 완료");
        router.push('/login')
      }
    });
  }; //쿠키 삭제
  /* console.log(loginUser); */

  return (
    <>
      {userInfo !== null /* 받은값이 있다면 밑에 컴포넌트를 실행 */ ? (
        <div>
          <h1>hi {userInfo?.name}</h1>
          <button onClick={removeCookie}>logout</button>
        </div>
      ) : (
        /* 여기에 다른 메인컴포넌트가 들어올것임 */
        <div>
          <h2>로그인이 필요합니다</h2>
          <Link href={"/login"}>로그인</Link>
        </div>
      )}
    </>
  );
};

export default Main;
