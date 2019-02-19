// Layout.js

import React from "react";

import Header from "./Header";
import Footer from "./Footer";


const Layout = ({ children, ...rest }) => {
    return (
      <div className="frontApp">
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
export default Layout;
