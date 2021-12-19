import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface MainTypeProps {
  checkLogin: {
    user?: string;
    psword?: number;
  };
  setCheckLogin: (a: {}) => void;
}

const Main = ({ checkLogin, setCheckLogin }: MainTypeProps) => {
  const router = useRouter();

  let user = router.query;
  console.log(user.user);

  useEffect(() => {
    if (user.user !== undefined) {
      setCheckLogin(user);
    }
  }, []);

  return (
    <>
      {user.user !== undefined ? (
        <h1>hi {checkLogin.user}</h1>
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
