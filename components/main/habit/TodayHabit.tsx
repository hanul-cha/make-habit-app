import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import DrawingHabit from "./DrawingHabit";
import { Button } from "@mui/material";
import Link from "next/link";

interface TodayHabitTypeProps {
  userId: string | undefined;
  setToDayLoading: (a: boolean) => void;
}

const TodayHabit = ({ userId, setToDayLoading }: TodayHabitTypeProps) => {
  const [myhabit, setMyHabit] = useState<any[]>(); //타입을 바꿀 필요가 있음 애니타입 별로...

  const GET_USER_INFO = gql`
    query MyQuery($userId: String!, $habitWeek: Int!) {
      userByUserId(userId: $userId) {
        myhabitsByUserId(condition: { habitWeek: $habitWeek }) {
          edges {
            node {
              habitText
              habitTitle
              habitId
            }
          }
        }
      }
    }
  `;

  let date = new Date();
  const toDate = /* 6; */ date.getDay();
  //오늘 요일, 요넘이 habitWeek인자에 할당될것임
  /* console.log(toDate) */

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      userId,
      habitWeek: toDate,
    },
  });

  useEffect(() => {
    if (!loading) {
      setMyHabit(data?.userByUserId?.myhabitsByUserId?.edges);
      setToDayLoading(true);
    }
  }); //로딩이끝나면 내취미에 할당해주고 로딩셋팅을 해줌

  return (
    <>
      {myhabit && myhabit?.length !== 0 ? (
        <div className="todayHabit_main">
          <h2>매주해야될 오늘의 습관</h2>
          {myhabit.map((e, i) => {
            return (
              <DrawingHabit
                e={e}
                key={i}
                userId={userId}
                setToDayLoading={setToDayLoading}
              />
            );
          })}
          {/* 오늘할일 리스트를 그려줄 컴포넌트를 인자수만큼 실행 */}
        </div>
      ) : (
        <div className="noHabit">
          <h2>오늘의 활동이 없습니다</h2>
          <Button
            sx={{
              "&.MuiButton-outlined": {
                backgroundColor: "#fff",
              },
            }}
            className="login_btn"
            variant="outlined"
          >
            <Link href="/addHabit">
              <a>추가하기</a>
            </Link>
          </Button>
          {/* 여기에 뮤테이트 링크 추가 해야함 */}
        </div>
      )}
    </>
  );
};

export default TodayHabit;
