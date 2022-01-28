import React, { useEffect, useState } from "react";
import { TextField, Button, Alert, AlertTitle } from "@mui/material";

import LoginConectDB from "./LoginConectDB";
import { setMainLoadding } from "../../src/store/apply";

const LoginMain = () => {
  const [id, setId] = useState("");
  const [psword, setpsword] = useState("");
  const [doLogin, setDoLogin] = useState(false); //로그인 로직 컴포넌트를 켜고 끄는 state
  const [failAlert, setFailAlert] = useState(false); //알럿을 키고 끄는 state

  const pushBtn = () => {
    setDoLogin(true);
  };
  //로그인 로직 컴포넌트 실행

  const pushTest = () => {
    setId("ccchhh1234")
    setpsword("123456")
  }

  useEffect(() => {
    setMainLoadding(true);
  }, []);

  useEffect(() => {
    return () => {
      setDoLogin(false);
      setMainLoadding(false);
    };
  }, []);
  //다른 라우트로 이동하기 전에 꺼주는 클린업

  setTimeout(() => {
    setFailAlert(false);
  }, 3000);

  return (
    <>
      {failAlert && (
        <Alert severity="error">
          <AlertTitle>로그인 실패</AlertTitle>
          <strong>아이디 또는 비밀번호를 확인해 주세요</strong>
        </Alert>
      )}

      <h2 className="loginMainTitle">로그인</h2>

      <div className="loginField">
        <TextField
          className="textField"
          id="outlined-basic"
          label="id"
          variant="outlined"
          placeholder="user id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <TextField
          className="textField"
          id="outlined-basic"
          label="password"
          variant="outlined"
          name="psword"
          type="password"
          placeholder="user password"
          value={psword}
          onChange={(e) => setpsword(e.target.value)}
        />

        <Button className="login_btn" variant="outlined" onClick={pushBtn}>
          login
        </Button>
      </div>
      <div className="runLoginTestWrapper">
        <Button sx={{width:400}} className="runLoginTest" variant="outlined" onClick={pushTest}>
          테스트용 아이디로 로그인하기
        </Button>
      </div>
      {doLogin && (
        <LoginConectDB
          id={id}
          psword={psword}
          setFailAlert={setFailAlert}
          setDoLogin={setDoLogin}
        />
      )}
    </>
  );
};

export default LoginMain;
