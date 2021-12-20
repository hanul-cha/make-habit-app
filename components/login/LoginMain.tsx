import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

import LoginConectDB from "./LoginConectDB";

const LoginMain = () => {
  const [id, setId] = useState("");
  const [psword, setpsword] = useState("");
  const [doLogin, setDoLogin] = useState(false);

  const pushBtn = () => {
    console.log(id, psword);
    setDoLogin(true);
  };

  //type="submit" onClick={pushBtn}
  //<button onClick={successLogin}>로그인하기</button>

  return (
    <>
      <div className="loginField">
        <TextField
          className="textField"
          id="outlined-basic"
          label="id"
          variant="outlined"
          placeholder="user id"
          name="id"
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
          onChange={(e) => setpsword(e.target.value)}
        />

        <Button className="login_btn" variant="outlined" onClick={pushBtn}>
          login
        </Button>
      </div>
      {doLogin && <LoginConectDB id={id} psword={psword} />}
    </>
  );
};

export default LoginMain;
