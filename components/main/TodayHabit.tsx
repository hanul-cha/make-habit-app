import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import UseGraphql from "../customhooks/UseGraphql";
import DrawingHabit from "./DrawingHabit";

interface TodayHabitTypeProps {
  userId: string | undefined;
}

const TodayHabit = ({ userId }: TodayHabitTypeProps) => {
  const [myhabit, setMyHabit] = useState<any[]>(); //타입을 바꿀 필요가 있음 애니타입 별로...
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
  const toDate = date.getDay(); //오늘 요일

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

  /* console.log(myhabit); */
  /* if (myhabit) {
    console.log(myhabit[0]);
  } */

  //myhabit 의 길이를 알고 싶으면 type지정를 좀 더 해야될거갗은데?

  return (
    <>
      {myhabit && myhabit?.length !== 0 ? (
        <div>
          <h2>오늘의 할일</h2>
          {myhabit.map((e, i) => {
            return (
              <DrawingHabit
              e={e}
              key={i}
              />
            );
          })}{/* 오늘할일 리스트를 그려줄 컴포넌트를 인자수만큼 실행 */}
        </div>
      ) : (
        <div>
          <h2>오늘의 활동이 없습니다</h2>
          <button>추가하기!</button>
        </div>
      )}
    </>
  );
};

export default TodayHabit;
