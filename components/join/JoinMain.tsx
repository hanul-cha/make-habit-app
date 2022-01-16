import React, { useEffect, useState } from "react";
import { TextField, Button, Alert, AlertTitle } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { setMainLoadding } from "../../src/store/apply";

const JoinMain = () => {
  const [joinId, joinSetId] = useState("");
  const [joinName, joinSetName] = useState("");
  const [joinPsword, joinSetpsword] = useState("");
  const [joinPswordCheck, joinSetpswordCheck] = useState("");
  const [JoinFailAlert, setJoinFailAlert] = useState(false);//공백 또는 확인 비번이 틀렸을때 알럿
  const [dontUseThisId, setdontUseThisId] = useState(false);//중복되는 아이디가 있을때 알럿

  useEffect(() => {
    setMainLoadding(true)
  },[])

  const router = useRouter();

  const SET_USER = gql`
    mutation MyMutation($userId: String!, $name: String!, $password: String!) {
      createUser(
        input: { user: { userId: $userId, name: $name, password: $password } }
      ) {
        clientMutationId
      }
    }
  `;
  //뮤테이션 로직, 반환값은 임의의 값을 할당함 = 아무값이나 전달이 되면 오류없이 뮤테이트 되었다는 뜻이기 때문

  const [setUser, { data, loading }] = useMutation(SET_USER, {
    onError: (error) => {
      console.log(error);
      setdontUseThisId(true);
      //아래 조건문이 다맞았는데도 오류가 나온다면 중복PK밖에 없기 때문에 중복아이디 경고창을 띄워준다
    },
  });
  //setUser함수를 호출하면 뮤테이션을 실행함

  const joinBtn = () => {
    if (
      joinId !== "" &&
      joinName !== "" &&
      joinPsword !== "" &&
      joinPswordCheck !== "" &&
      joinPsword == joinPswordCheck
    ) {
      setUser({
        variables: {
          userId: joinId,
          name: joinName,
          password: joinPsword,
        },
      });
    } else {
      setJoinFailAlert(true);
    }
  };
  //조건에 맞으면 뮤테이션을 실행하고 아니라면 경고창을 켜줌

  useEffect(() => {
    if (data) {
      router.push("/login")
    }
    if (loading) {
      setMainLoadding(false)
    } else {
      setMainLoadding(true)
    }
  })
  //뮤테이션 로딩이끝나고 데이터베이스에 반영이 되면 data로 쿼리에서 지정한 값을 가져온다

  useEffect(() => {
    setTimeout(() => {
      setJoinFailAlert(false);
    }, 5000);
  }, [JoinFailAlert]); //JoinFailAlert의 상태가 변할때마다 실행함

  useEffect(() => {
    setTimeout(() => {
      setdontUseThisId(false);
    }, 5000);
  }, [dontUseThisId]); //dontUseThisId 상태가 변할때마다 실행함

  useEffect(() => {
    return () => {
      setJoinFailAlert(false)
      setdontUseThisId(false);
    };
  }, []);//클린업함수
  

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
    </>
  );
};

export default JoinMain;
