import React, { useState } from "react";
import Nav from "./Nav";

const Layout = ({ children }: any) => {

  return (
    <>
      <div>
          <Nav />
          <div>{children}</div>
        </div>
    </>
  );
};

export default Layout;
