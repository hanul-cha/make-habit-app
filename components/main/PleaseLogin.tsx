import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const PleaseLogin = () => {
  return (
    <div className="pleaseLogin">
      <h2 className="pleaseLoginTitle"><span className="pleaseLoginInner">로그인</span>이 필요합니다</h2>
      <div className="pleaseLoginSection">
        <p>로그인 하러가기</p>
        <Button className="login_btn" variant="outlined">
          <Link href={"/login"}>login</Link>
        </Button>
      </div>
      <div className="pleaseLoginSection">
        <h3>혹시 저희 서비스가 처음인가요?</h3>
        <p>회원가입하러가기</p>
        <Button className="join_btn" variant="outlined">
          <Link href={"/join"}>join</Link>
        </Button>
      </div>
    </div>
  );
};

export default PleaseLogin;
