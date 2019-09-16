// Layout.js

import React from "react";

import Header from "./Header";
import Footer from "./Footer";


const Layout = ({ children, ...rest }) => {
    return (
      <div className="frontApp">
        <Header route={children.props.match.url}/>
        {children}
        <Footer />
      </div>
    )
  }
export default Layout;
