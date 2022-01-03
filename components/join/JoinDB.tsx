import React from "react";
import { gql, useMutation } from "@apollo/client";

interface JoinDBTypeProps {
  joinId: string;
  joinName: string;
  joinPsword: string;
  joinPswordCheck: string;
  setRunJoin: (a: boolean) => void;
  setJoinFailAlert: (a: boolean) => void;
}

const JoinDB = ({
  joinId,
  joinName,
  joinPsword,
  joinPswordCheck,
  setRunJoin,
  setJoinFailAlert,
}: JoinDBTypeProps) => {
  console.log(joinId, joinName, joinPsword, joinPswordCheck);

  const SET_USER = gql`
    mutation MyMutation(
        $userId:string!
        $name:string!
        $password:string!
    ) {
      createUser(input: { user: { userId: $userId, name: $name, password: $password } }) {
        clientMutationId
      }
    }
  `;

  return <></>;
};

export default JoinDB;

/* 
뮤테이션할 컴포넌트임
여기서의 조건문:
그냥 비번이랑 재확인 비번을 확인후 뮤테이션해야함

*/
