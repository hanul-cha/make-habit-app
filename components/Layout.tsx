import React, { useState } from "react";
import Nav from "./Nav";
import { gql, useQuery } from "@apollo/client"

const Layout = ({ children }: any) => {

  const GET_LOADING = gql`
    query {
      getLoading@client
    }
  `;

  const {data, loading} = useQuery(GET_LOADING)
  //아폴로스토에서 첫 정의한 상태를 가져옴
  console.log(data)

  return (
    <>
      <div className="layout">
          <Nav />
          <div>{children}</div>
        </div>
    </>
  );
};

export default Layout;
