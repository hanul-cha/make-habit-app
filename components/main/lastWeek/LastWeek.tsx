import React from "react";
import { useQuery, gql } from "@apollo/client";

interface LastWeekTypeProps {
  userId: string | undefined;
}

const LastWeek = ({ userId }: LastWeekTypeProps) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = Number(year+month+day)

  const GET_WEEK_HABIT = gql`
    query MyQuery($userId: String!) {
      userByUserId(userId: $userId) {
        myhabitsByUserId {
          nodes {
            habitText
          }
        }
      }
    }
  `;
  //현재 유저가 가진 모든 habit을 가져올것임
  const GET_CHECK_HABIT = gql`
    query MyQuery($userId: String!) {
      userByUserId(userId: $userId) {
        myhabitsByUserId {
          nodes {
            habitText
          }
        }
      }
    }
  `;
  //현재 유저가 가진 모든 체크 리스트를 가져올것임




  console.log(userId);
  return <div></div>;
};

export default LastWeek;


/* 
실험해봐야할것
1. 다른 유저 아이디로 아무 취미랑 체크리스트가 없을때 나오는 데이터 형식을 찾아봐야함
2. 취미가 하나도 없을때 데이터 형식, 취미는 있는데 저번주의 체크리스트가 없을때의 데이터 형식 두가지 체크

*/
