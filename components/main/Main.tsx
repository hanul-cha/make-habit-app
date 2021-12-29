import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import UseGraphql from "../customhooks/UseGraphql";
import TodayHabit from "./TodayHabit";
import PleaseLogin from "./PleaseLogin";


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
  /* 
  graphql 서버로 날릴 쿼리 아이디를 뽑는 로직입니다
  로그인을 시도해서 성공했다면 router로 들어온 아이디가 전달될것입니다
  언마운트후 다시 마운트가 되는 시점이 올땐 쿠키에서 아이디를 가져와 전달될겁니다
  */

  const { loading, data } = UseGraphql(loginUser) 
  //아폴로 useQuery 통신방식입니다 loading이 false가 되면 data에 값이 들어옵니다.
  /*
  어떤값이 들어오는진 콘솔을 확인해주세요 
  console.log(loading, data) 
  */
  
  useEffect(() => {
    if(!loading){
      setUserInfo(data.userByUserId)
      /* 
      loading이 끝나면 실질적 유저 정보를 담는 state에 담아줍니다
      console.log(userInfo) 
      */
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
          <TodayHabit userId = {userInfo?.userId} />
        </div>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
};

export default Main;
