import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

interface JoinDBTypeProps {
  joinId: string;
  joinName: string;
  joinPsword: string;
  joinPswordCheck: string;
  setRunJoin: (a: boolean) => void;
  setJoinFailAlert: (a: boolean) => void;
  setdontUseThisId: (a :boolean) => void;
}

const JoinDB = ({
  joinId,
  joinName,
  joinPsword,
  joinPswordCheck,
  setRunJoin,
  setJoinFailAlert,
  setdontUseThisId,
}: JoinDBTypeProps) => {
  console.log("on");

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

  const [setUser, {data, loading}] = useMutation(SET_USER, {
    onError: (error) => {
      console.log(error)
      setdontUseThisId(true)
    }
  })

  console.log(loading, data)

  useEffect(() => {
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
          password: joinPsword
        }
      })
      if(loading && data){
        console.log("yes")
        setRunJoin(false)
      } else if(loading) {
        setRunJoin(false)
      }
      console.log(data)
      
    } else {
      setJoinFailAlert(true)
      setRunJoin(false)
    }
  })

  

  return <></>;
};

export default JoinDB;

/* 
해당 컴포넌트는 일시적으로 폐기임

*/
