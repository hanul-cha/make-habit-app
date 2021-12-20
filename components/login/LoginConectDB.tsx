import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

interface LoginConectDbTypeProps {
  id: string;
  psword: string;
}

const GET_USER_INFO = gql`
  query MyQuery($userId: String!) {
    userByUserId(userId: $userId) {
      name
    }
  }
`;

const LoginConectDB = ({ id, psword }: LoginConectDbTypeProps) => {
  const router = useRouter();

  const successLogin = () => {
    router.push(
      {
        pathname: "/",
        query: {
          user: "광희",
          psword: 1234,
        },
      },
      "/"
    );
  };

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      userId: id,
    },
  });
  console.log(loading, data);

  return <></>;
};

export default LoginConectDB;
