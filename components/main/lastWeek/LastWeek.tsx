import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button } from "@mui/material";
import DrawingLastWeek from "./DrawingLastWeek";

interface LastWeekTypeProps {
  userId: string | undefined;
}

const LastWeek = ({ userId }: LastWeekTypeProps) => {

  const GET_WEEK_HABIT = gql`
    query MyQuery($userId: String!) {
      userByUserId(userId: $userId) {
        myhabitsByUserId {
          nodes {
            habitTitle
            habitId
          }
        }
      }
    }
  `;
  //현재 유저가 가진 모든 habit을 가져올것임
  const GET_CHECK_HABIT = gql`
    query MyQuery($userId: String!) {
      userByUserId(userId: $userId) {
        habitchecksByUserId {
          nodes {
            checkDate
            myhabitByHabitId {
              habitId
            }
          }
        }
      }
    }
  `;
  //현재 유저가 가진 모든 체크 리스트를 가져올것임

  const weekLoad = useQuery(GET_WEEK_HABIT, {
    variables: {
      userId,
    },
  });

  const checkLoad = useQuery(GET_CHECK_HABIT, {
    variables: {
      userId,
    },
  }); //이거 그냥 가져와서 저번주 아닌거 날린다음 남은거랑 위에 쿼리랑 map두번 돌려서 남겨야 할듯함

  /* useEffect(() => {
    if (!weekLoad.loading && !checkLoad.loading && userId !== undefined) {
      console.log(weekLoad.data);
      console.log(checkLoad.data);
    }
  }); */

  /* console.log(userId); */
  return (
    <>
      {weekLoad.data !== undefined && checkLoad.data !== undefined ? (
        <>
          {weekLoad.data.userByUserId.myhabitsByUserId.nodes.length !== 0 ? (
            <DrawingLastWeek
              myHabitList={weekLoad.data.userByUserId.myhabitsByUserId.nodes}
              habitCheckList={checkLoad.data.userByUserId.habitchecksByUserId.nodes}
            />
          ) : (
            <div className="noLastWeekHabit">
              <h2>저번주에 해야할 습관이 없습니다.</h2>
              <p>혹시 아직 일정 추가를 안하셨나요?</p>
              <Button className="lastWeek_btn" variant="outlined">
                추가하기!!
              </Button>
              {/* 여기에 뮤테이트 추가 해야함 */}
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default LastWeek;

/* 
실험해봐야할것
1. 다른 유저 아이디로 아무 취미랑 체크리스트가 없을때 나오는 데이터 형식을 찾아봐야함
2. 취미가 하나도 없을때 데이터 형식, 취미는 있는데 저번주의 체크리스트가 없을때의 데이터 형식 두가지 체크

지금현재는 저번주 취미의 갯수(사실상 다가져오면 끝임)와 저번주에 체크한 겟수를 확보함(아직 fillter전)
근데 문제는 그거야 뒤에 두게 비교해서 달성률을 만들수는 있는데 
어떤 취미를 체크했지?? 라고 했을때 한번더 쿼리를 보내고 싶진않아 그래서 두번째 쿼리에서 해결할수 없을까?
*/
