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
      <div class="col-md-4 col-lg-3">
        <div class="bg-light border-right" id="sidebar-wrapper">
          <div class="list-group list-group-flush">
            <Link to="/account/profile" class="list-group-item list-group-item-action active"><i class="fa fa-user-o" aria-hidden="true"></i>Profile</Link>
            <Link to="/account/password/change" class="list-group-item list-group-item-action"><i class="fa fa-key" aria-hidden="true"></i>Password Change</Link>
            <Link to="/account/courses" class="list-group-item list-group-item-action"><i class="fa fa-book" aria-hidden="true"></i>Courses</Link>
            <Link to="/account/quiz/summary" class="list-group-item list-group-item-action"><i class="fa fa-question-circle-o" aria-hidden="true"></i>Quiz Summary</Link>
            <Link to="/account/payment/history" class="list-group-item list-group-item-action"><i class="fa fa-money" aria-hidden="true"></i>Payment History</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
