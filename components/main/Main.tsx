import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface MainTypeProps {
  loginUser: {
    user?: string;
    psword?: number;
  };
  setLoginUser: (a: {}) => void;
}

const Main = ({ loginUser, setLoginUser }: MainTypeProps) => {
  const router = useRouter();

  let user = router.query;

  useEffect(() => {
    if (user.user !== undefined) {
      setLoginUser(user);
      console.log(user.user);
    }
  }, []);

  return (
    <>
      {user.user !== undefined ? (
        <h1>hi {loginUser.user}</h1>
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
