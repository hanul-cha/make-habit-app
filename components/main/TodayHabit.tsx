import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import UseGraphql from "../customhooks/UseGraphql";

interface TodayHabitTypeProps {
  userId: string | undefined;
}

const TodayHabit = ({ userId }: TodayHabitTypeProps) => {
  const GET_USER_INFO = gql`
    query MyQuery($userId: String!, $habitWeek: Int!) {
      userByUserId(userId: $userId) {
        myhabitsByUserId(condition: { habitWeek: $habitWeek }) {
          edges {
            node {
              habitText
              habitTitle
            }
          }
        }
      }
    }
  `;

let date = new Date();
const toDate = date.getDay();

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      userId,
      habitWeek: toDate
    },
  });

  

  console.log(data);
  return <div></div>;
};

export default TodayHabit;
