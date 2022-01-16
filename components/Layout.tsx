import React, { useState } from "react";
import Nav from "./Nav";
import { gql, useQuery } from "@apollo/client";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const Layout = ({ children }: any) => {
  const GET_LOADING = gql`
    query {
      getLoading @client
    }
  `;

  const { data, loading } = useQuery(GET_LOADING);
  //아폴로스토에서 첫 정의한 상태를 가져옴
  console.log(data.getLoading.mainLoading);

  return (
    <>
      <div className="layout">
        <Nav />
        <div>{children}</div>
        {data.getLoading.mainLoading ? (
          <></>
        ) : (
          <div className="mainLoading">
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;

/* 
현재는 habit의 드로잉에만 로딩을 구현해 놓았지만 모든 메인컴포넌트에서 언마운트 될때
아폴로 캐시값을 false로 초기화 해주고 최하단 쿼리가 끝나면 true로 바뀌게 작업해야함
*/
