import React from "react";

interface JoinDBTypeProps {
  joinId: string;
  joinPsword: string;
  joinPswordCheck: string;
  setRunJoin: (a: boolean) => void;
  setJoinFailAlert: (a: boolean) => void;
}

const JoinDB = ({
  joinId,
  joinPsword,
  joinPswordCheck,
  setRunJoin,
  setJoinFailAlert,
}: JoinDBTypeProps) => {



  return <></>;
};

export default JoinDB;


/* 
뮤테이션할 컴포넌트임
여기서의 조건문:
그냥 비번이랑 재확인 비번을 확인후 뮤테이션해야함

*/