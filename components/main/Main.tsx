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
  console.log(user.name);
  useEffect(() => {
    if (user.name !== undefined) {
      setLoginUser(user);
      
    }
  }, []);


  return (
    <>
      {user.name !== undefined ? (
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
