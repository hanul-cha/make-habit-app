import React, { useEffect, useState } from "react";
import axios from "axios";
import PleaseLogin from "../main/PleaseLogin";
import { useQuery, gql } from "@apollo/client";
import HobbiesByDay from "./HobbiesByDay";
import MutationHabit from "./mutationHabit/MutationHabit";
import { Alert, AlertTitle } from "@mui/material";
import { setMainLoadding } from "../../src/store/apply";

const GET_WEEK_HABIT = gql`
  query MyQuery($userInfo: String!) {
    userByUserId(userId: $userInfo) {
      myhabitsByUserId {
        nodes {
          habitId
          habitWeek
          habitTitle
        }
      }
      name
    }
  }
`;

const AddhabitMain = () => {
  const [userInfo, setUserInfo] = useState();
  const [failAlert, setFailAlert] = useState(false);

  useEffect(() => {
    setTimeout(() => {
        setFailAlert(false);
    }, 5000);
  }, [failAlert]); //failAlert 상태가 변할때마다 실행함

  const { data, loading } = useQuery(GET_WEEK_HABIT, {
    variables: {
      userInfo,
    },
  });

  useEffect(() => {
    axios.get("/api/isLogin").then((res) => {
      if (res.status === 200 && res.data.id) {
        setUserInfo(res.data.id);
      }
    });

    if(!loading){
      setMainLoadding(true)
    }
  });

  useEffect(() => {
    return () => {
      setFailAlert(false)
      setMainLoadding(false)
    };
  }, []);//클린업

  
  

  return (
    <>
    {failAlert && (
        <Alert severity="error">
          <AlertTitle>추가 실패</AlertTitle>
          <strong>빈칸이 있는지 확인해 주세요!!</strong>
        </Alert>
      )}

      {userInfo !== undefined ? (
        <div className="addHabit">
          <h2><span>{data?.userByUserId?.name}</span>님의 취미</h2>
          <MutationHabit userName={userInfo} setFailAlert={setFailAlert} />
          <HobbiesByDay node={data?.userByUserId?.myhabitsByUserId?.nodes} />
        </div>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
};

export default AddhabitMain;
