import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button } from "@mui/material";
import DrawingLastWeek from "./DrawingLastWeek";
import Link from "next/link";

interface LastWeekTypeProps {
  userId: string | undefined;
  setLastWeekLoading: (a:boolean)=> void
}

const LastWeek = ({ userId, setLastWeekLoading }: LastWeekTypeProps) => {

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
  });

  useEffect(() => {
    if (!weekLoad.loading && !checkLoad.loading && userId !== undefined) {
      setLastWeekLoading(true)
    }
  })//로딩이 끝나고 할당까지 끝나면 로딩셋팅해줌

  useEffect(() => {
    return () => {
      setLastWeekLoading(false)
    }
  },[])//클린업

  /* console.log(userId); */
  return (
    <>
      {weekLoad.data !== undefined && checkLoad.data !== undefined ? (
        <>
          {weekLoad.data.userByUserId.myhabitsByUserId.nodes.length !== 0 ? (
            <DrawingLastWeek
              myHabitList={weekLoad.data.userByUserId.myhabitsByUserId.nodes}
              habitCheckList={
                checkLoad.data.userByUserId.habitchecksByUserId.nodes
              }
            />
          ) : (
            <div className="noLastWeekHabit">
              <h2>저번주에 해야할 습관이 없습니다.</h2>
              <p>혹시 아직 일정 추가를 안하셨나요?</p>
              
              <Button sx={{
                "&.MuiButton-outlined": {
                  backgroundColor: "#fff"
                }
              }} className="lastWeek_btn" variant="outlined" >
                <Link href="/addHabit">
                  <a>추가하기</a>
                </Link>
              </Button>
              {/* 여기에 뮤테이트 추가 해야함 여기에서 사용할 뮤테이션은 커스텀훅으로 만드는게 좋아보임 */}
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
jsx 리턴 해석
어떤 값이 들어올지 모르기 때문에 전부 네로잉 해주느라 조금 복잡해 보일수 있다.
다른 컴포넌트는 로딩이 끝나면 새로운 state에 할당해주었는데 어짜피 네로잉은 해야되고
하위 컴포넌트로 값들을 넘겨주고나서도 하위 컴포넌트에서 네로잉을 또해야되서
새롭게 시도해보았는데 훨씬 좋은거같기도 하다
*/

/* 
실험해봐야할것
1. 다른 유저 아이디로 아무 취미랑 체크리스트가 없을때 나오는 데이터 형식을 찾아봐야함
2. 취미가 하나도 없을때 데이터 형식, 취미는 있는데 저번주의 체크리스트가 없을때의 데이터 형식 두가지 체크

지금현재는 저번주 취미의 갯수(사실상 다가져오면 끝임)와 저번주에 체크한 겟수를 확보함(아직 fillter전)
근데 문제는 그거야 뒤에 두게 비교해서 달성률을 만들수는 있는데 
어떤 취미를 체크했지?? 라고 했을때 한번더 쿼리를 보내고 싶진않아 그래서 두번째 쿼리에서 해결할수 없을까?
*/
