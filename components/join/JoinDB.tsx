import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

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
        setRunJoin(false)
      } else if(loading) {
        setRunJoin(false)
      }
      
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

로그인 로직처럼 설계했지만 로그인로직은 데이터를 가져오기만 하는 로직이기때문에
graphql의 로딩이 끝날때 까지 요청해도 상관없지만 
해당 로직은 계속해서 데이터베이스를 수정하려 요청을 보내기 때문에 여러번의 리렌더링은 위험하다고 판단했다.
그리고 useQuery는 데이터가 들어오는 타이밍과 로딩타이밍이 거의 딱맞는데
useMutation은 data와 loading타이밍이 잘 안맞는다 

=> 아마 이유는 useQuery같은경우 쿼리를보내고 기댓값 또는 실패했다는 메세지를 기다리지만
뮤테이션의 경우는 쿼리를보내고 로딩이 끝나도 보낸쿼리에 오류가 있으면 data자체를 보내지않기 때문으로보임
=> 그렇기때문에 로그인로직처럼 기다렸다가 컴포넌트를 끄는 방식에서 data가 loading보다 늦게 들어오기때문에
조건문 처리하는데에 복잡함이 있었다...
*/

/* 
이거 체크뮤테이션처럼 커스텀훅으로 구현하면 가능하긴한데
해보니까 엄청 복잡하다
*/
