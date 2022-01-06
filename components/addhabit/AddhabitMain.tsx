import React, { useEffect, useState } from "react";
import axios from "axios";
import PleaseLogin from "../main/PleaseLogin";
import { useQuery, gql } from "@apollo/client";
import HobbiesByDay from "./HobbiesByDay";
import MutationHabit from "./mutationHabit/MutationHabit";

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

  return (
    <>
      {userInfo !== undefined ? (
        <div className="addHabit">
          <h2><span>{data?.userByUserId?.name}</span>님의 취미</h2>
          <MutationHabit userName={userInfo} />
          <HobbiesByDay node={data?.userByUserId?.myhabitsByUserId?.nodes} />
        </div>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
};

export default AddhabitMain;
