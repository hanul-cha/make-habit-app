import React, { useEffect, useState } from "react";
import axios from "axios";
import PleaseLogin from "../main/PleaseLogin";
import { useQuery, gql } from "@apollo/client";
import HobbiesByDay from "./HobbiesByDay";

const GET_WEEK_HABIT = gql`
  query MyQuery($userInfo: String!) {
    userByUserId(userId: $userInfo) {
      myhabitsByUserId {
        nodes {
          habitId
          habitWeek
        }
      }
      name
    }
  }
`;

const AddhabitMain = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    axios.get("/api/isLogin").then((res) => {
      if (res.status === 200 && res.data.id) {
        setUserInfo(res.data.id);
      }
    });
  });

  const { data, loading } = useQuery(GET_WEEK_HABIT, {
    variables: {
      userInfo,
    },
  });

  console.log(data?.userByUserId?.name);

  return <>
  {userInfo !== undefined ? 
  <div>
      <h2>{data?.userByUserId?.name}님의 취미</h2>
      <HobbiesByDay />
  </div> 
  : 
  <PleaseLogin />}</>;
};

export default AddhabitMain;
