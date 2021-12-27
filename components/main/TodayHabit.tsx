import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import UseGraphql from "../customhooks/UseGraphql";

interface TodayHabitTypeProps {
  userId: string | undefined;
}

const TodayHabit = ({ userId }: TodayHabitTypeProps) => {
  const [myhabit, setMyHabit] = useState<any>();
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
  const toDate = date.getDay() + 1; //오늘 요일

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      userId,
      habitWeek: 6,
    },
  });

  useEffect(() => {
    if (!loading) {
      setMyHabit(data?.userByUserId?.myhabitsByUserId?.edges);
    }
  });

  console.log(myhabit?.length);
  console.log(myhabit);

  return (
    <>
      {myhabit?.length == 0?(
            <div>
                <h2>오늘의 활동이 없습니다</h2>
            </div>
        ):(
            <div>
                <h2>오늘의 할일</h2>
                {myhabit.map((habit: any) => {
                  <h2>{habit.title}</h2>
                })}
            </div>
            /* 이부분 조금 바꿔야 할듯? */
        )}
    </>
  );
};

export default TodayHabit;
