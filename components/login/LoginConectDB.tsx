import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios  from "axios";
import UseGraphql from "../customhooks/UseGraphql";
import { setMainLoadding } from "../../src/store/apply";

interface LoginConectDbTypeProps {
  id: string;
  psword: string;
  setFailAlert: (a: boolean) => void;
  setDoLogin: (a: boolean) => void;
}

const LoginConectDB = ({/* 이컴포넌트는 단순히 로직을 수행하기 위한 컴포넌트로 아무것도 리턴하지 않는다 */
  id,
  psword,
  setFailAlert,
  setDoLogin,
}: LoginConectDbTypeProps) => {
  const router = useRouter();

  const { loading, data } = UseGraphql(id)
  //graphql 쿼리가 있는 커스텀훅

  if(loading){
    setMainLoadding(false)
  } else {
    setMainLoadding(true)
  }
  
  useEffect(() => {
    if (!loading) {
      if (data.userByUserId === null) {
        /* 아이디가 틀림 */
        setFailAlert(true);
        setDoLogin(false);
      } else if (psword !== data.userByUserId.password) {
        /* 비밀번호가 틀림 */
        setFailAlert(true);
        setDoLogin(false);
      } else {
        /* 아이디, 비밀번호가 맞으면 == 로그인이 성공하면 */
        axios.post("/api/login",{
          params:{
            name:data.userByUserId.name,
            psword:data.userByUserId.password,
            id
          }
        }).then((res) => {
          if(res.status === 200){
            console.log("쿠키api로 전송완료")
          }
        })
        //데이터 보내서 쿠키로 만들거임
        router.push(
            {
              pathname: "/",
              query: {
                userId: id,
                psword: psword,
                name:data.userByUserId.name
              },
            },
            "/"
          );
        //push
      }
    }
  });

  return <></>;
};

export default LoginConectDB;
