import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const UseJoinMutation = (id: string) => {
  const GET_USER_INFO = gql`
    query MyQuery($userId: String!) {
      userByUserId(userId: $userId) {
        userId
        password
        name
      }
    }
  `;

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      userId: id,
    },
  });

  return {
    loading,
    data,
  };
};

export default UseJoinMutation;

//뮤테이션을 관리하는 커스텀 훅