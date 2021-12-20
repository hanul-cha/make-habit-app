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

const LoginConectDB = ({
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
        setFailAlert(true);
        setDoLogin(false);
      } else {
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
