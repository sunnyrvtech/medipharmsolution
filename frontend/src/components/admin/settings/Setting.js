// Setting.js

import React, { Component } from "react";
import HomeSetting from "./HomeSetting";
import HeaderSetting from "./HeaderSetting";
import FooterSetting from "./FooterSetting";
import ContactusSetting from "./ContactusSetting";
export default class Setting extends Component {
  constructor(props) {
    super();
    this.state = {
      slug: props.match.params.slug
    };
  }

  render() {
    const { slug } = this.state;
    return <div>
    {slug == "home" && <HomeSetting />}
    {slug == "footer" && <FooterSetting />}
    {slug == "header" && <HeaderSetting />}
     {slug == "contactus" && <ContactusSetting />}
    </div>;
  }
}
