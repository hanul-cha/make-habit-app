import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import UseGraphql from "../customhooks/UseGraphql";

interface TodayHabitTypeProps {
  userId: string | undefined;
}

const TodayHabit = ({ userId }: TodayHabitTypeProps) => {
  const [myhabit, setMyHabit] = useState();
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
  const toDate = date.getDay() + 1;

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      userId,
      habitWeek: toDate,
    },
  });

  useEffect(() => {
    if (!loading) {
      setMyHabit(data?.userByUserId?.myhabitsByUserId?.edges);
    }
  });

  /* if (!myhabit == undefined) {
    console.log(myhabit?.length);
  } */

  return (
    <>
      {/* {myhabit?.length == 0?(
            <div>
                <h2>오늘의 활동이 없습니다</h2>
            </div>
        ):(
            <div>
                <h2>오늘의 할일</h2>
                <p></p>
            </div>
        )} */}
    </>
  );
};

export default TodayHabit;
