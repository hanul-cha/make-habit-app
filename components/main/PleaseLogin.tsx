import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { setMainLoadding } from "../../src/store/apply";
import Paper from "@mui/material/Paper";

const PleaseLogin = () => {
  setMainLoadding(true);
  useEffect(() => {
    return () => {
      setMainLoadding(false);
    };
  }, []);
  //컴포넌트가 활성화되면 로딩창을 끄고 언마운트되면 다시 켜줌
  return (
    <div className="pleaseLogin">
      <h2 className="pleaseLoginTitle">
        <span className="pleaseLoginInner">로그인</span>이 필요합니다
      </h2>
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

      <Paper elevation={1}>
        <div className="demo">
          <h2>테스트용 계정</h2>
          <p>ID : ccchhh1234</p>
          <p>PW : 123456</p>
        </div>
      </Paper>
    </div>
  );
};

export default PleaseLogin;
