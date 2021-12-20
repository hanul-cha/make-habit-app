import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface MainTypeProps {
  loginUser: {
    user?: string;
    psword?: number;
    name?: string;
  };
  setLoginUser: (a: {}) => void;
}

const Main = ({ loginUser, setLoginUser }: MainTypeProps) => {
  const router = useRouter();

  let user = router.query;
  useEffect(() => {
    if (user.name !== undefined) {
      setLoginUser(user);
    }
  }, []);
  //라우트 이동하면서 받은 값이 있다면 loginUser state를 바꿔줄것임


  return (
    <>
      {loginUser.name !== undefined ? (/* 받은값이 있다면 밑에 컴포넌트를 실행 */
        <h1>hi {loginUser.name}</h1>
        /* 여기에 다른 메인컴포넌트가 들어올것임 */
      ) : (
        <div>
          <h2>로그인이 필요합니다</h2>
          <Link href={"/login"}>로그인</Link>
        </div>
      )}
    </>
  );
};

export default Main;
