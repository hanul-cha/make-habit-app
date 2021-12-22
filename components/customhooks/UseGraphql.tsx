import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const UseGraphql = (id: string) => {
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

export default UseGraphql;

//그래프 큐엘에 쿼리보내는 커스텀 훅
