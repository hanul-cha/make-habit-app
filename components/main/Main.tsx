import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface MainTypeProps {
  checkLogin: boolean;
  setCheckLogin :(a:boolean) => void
}
interface UserType {
    user? :string
    psword? :number
}

const Main = ({ checkLogin, setCheckLogin }: MainTypeProps) => {
  const [newUser, setNewUser] = useState<UserType>();
  const router = useRouter();

  let user:UserType = router.query

  useEffect(() => {
    if (user !== undefined) {
      setNewUser(user);
    }
    
  }, []);

  

  return (
    <>
      {checkLogin ? (
        <h1>hi</h1>
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
