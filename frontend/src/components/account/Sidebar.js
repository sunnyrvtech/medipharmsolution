// Sidebar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Sidebar extends Component {
  constructor(props) {
    super();
    console.log(props);
  }



  render() {
    return (
      <div class="col-sm-2">
        <div class="bg-light border-right" id="sidebar-wrapper">
          <div class="list-group list-group-flush">
            <Link to="/account/profile" class="list-group-item list-group-item-action">Profile</Link>
            <Link to="/account/password/change" class="list-group-item list-group-item-action">Password Change</Link>
            <Link to="/account/courses" class="list-group-item list-group-item-action">Courses</Link>
            <Link to="/account/quiz/summary" class="list-group-item list-group-item-action">Quiz Summary</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
