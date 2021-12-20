import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

interface LoginConectDbTypeProps {
  id: string;
  psword: string;
  setFailAlert: (a: boolean) => void;
  setDoLogin: (a: boolean) => void;
}

const GET_USER_INFO = gql`
  query MyQuery($userId: String!) {
    userByUserId(userId: $userId) {
      password
      name
    }
  }
`;
//userId로 password를 리턴 받을것임

const LoginConectDB = ({/* 이컴포넌트는 단순히 로직을 수행하기 위한 컴포넌트로 아무것도 리턴하지 않는다 */
  id,
  psword,
  setFailAlert,
  setDoLogin,
}: LoginConectDbTypeProps) => {
  const router = useRouter();

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      userId: id,
    },
  });
  console.log(loading, data);

  useEffect(() => {
    if (!loading) {
      if (data.userByUserId === null) {
        /* 아이디가 틀림 */
        setFailAlert(true);
        setDoLogin(false);
      } else if (psword !== data.userByUserId.password) {
        /* 비밀번호가 틀림 */
        setFailAlert(true);
        setDoLogin(false);
      } else {
        /* 아이디, 비밀번호가 맞으면 */
        router.push(
            {
              pathname: "/",
              query: {
                userId: id,
                psword: psword,
                name:data.userByUserId.name
              },
            },
            "/"
          );

          
      }
    }
  });

  return <></>;
};

export default LoginConectDB;
