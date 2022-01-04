import React, { useEffect, useState } from "react";
import { TextField, Button, Alert, AlertTitle } from "@mui/material";
import JoinDB from "./JoinDB";

const JoinMain = () => {
  const [joinId, joinSetId] = useState("");
  const [joinName, joinSetName] = useState("");
  const [joinPsword, joinSetpsword] = useState("");
  const [joinPswordCheck, joinSetpswordCheck] = useState("");
  const [runJoin, setRunJoin] = useState(false);
  const [JoinFailAlert, setJoinFailAlert] = useState(false);
  const [dontUseThisId, setdontUseThisId] = useState(false);

  const joinBtn = () => {
    setRunJoin(true);
  };


  useEffect(() => {
    setTimeout(() => {
      setJoinFailAlert(false);
    }, 5000);
  },[JoinFailAlert])//JoinFailAlert의 상태가 변할때마다 실행함

  useEffect(() => {
    setTimeout(() => {
      setdontUseThisId(false);
    }, 5000);
  },[dontUseThisId])
  

  return (
    <>
      {JoinFailAlert && (
        <Alert severity="error">
          <AlertTitle>회원가입 실패</AlertTitle>
          <strong>작성 안한 칸이 있거나 확인비밀번호가 맞지 않습니다.</strong>
        </Alert>
      )}
      {dontUseThisId && (
        <Alert severity="error">
          <AlertTitle>회원가입 실패</AlertTitle>
          <strong>이미 사용중인 아이디 입니다.</strong>
        </Alert>
      )}

      <h2 className="joinMainTitle">회원가입</h2>

      <div className="joinField">
        <TextField
          className="joinTextField"
          id="outlined-basic"
          label="id"
          variant="outlined"
          placeholder="user id"
          name="id"
          onChange={(e) => joinSetId(e.target.value)}
        />
        
        <TextField
          className="joinTextField"
          id="outlined-basic"
          label="name"
          variant="outlined"
          placeholder="user name"
          name="name"
          onChange={(e) => joinSetName(e.target.value)}
        />

        <TextField
          className="joinTextField"
          id="outlined-basic"
          label="password"
          variant="outlined"
          name="psword"
          type="password"
          placeholder="user password"
          onChange={(e) => joinSetpsword(e.target.value)}
        />

        <TextField
          className="joinTextField"
          id="outlined-basic"
          label="password check"
          variant="outlined"
          name="psword"
          type="password"
          placeholder="same password"
          onChange={(e) => joinSetpswordCheck(e.target.value)}
        />

        <Button className="join_btn" variant="outlined" onClick={joinBtn}>
          join
        </Button>
      </div>
      {runJoin && <JoinDB
        joinId={joinId}
        joinName={joinName}
        joinPsword={joinPsword}
        joinPswordCheck={joinPswordCheck}
        setRunJoin={setRunJoin}
        setJoinFailAlert={setJoinFailAlert}
        setdontUseThisId={setdontUseThisId}
      />}
    </>
  );
};

export default JoinMain;
