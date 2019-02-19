// Layout.js

import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";


const Layout = ({ children, ...rest }) => {
    return (
      <div id="wrapper">
        <Sidebar />
       <div id="content-wrapper" className="d-flex flex-column">
        <Header />
        {children}
        <Footer />
        </div>
      </div>
    )
  }
export default Layout;
