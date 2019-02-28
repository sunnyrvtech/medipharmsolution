// Sidebar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Sidebar extends Component {
  render() {
    return (
      <div className="col-md-4 col-lg-3">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            <Link to="/account/profile" className={this.props.route_name == "/account/profile" ? "list-group-item list-group-item-action active":"list-group-item list-group-item-action"}><i className="fa fa-user-o" aria-hidden="true"></i>Profile</Link>
            <Link to="/account/password/change" className={this.props.route_name == "/account/password/change" ? "list-group-item list-group-item-action active":"list-group-item list-group-item-action"}><i className="fa fa-key" aria-hidden="true"></i>Password Change</Link>
            <Link to="/account/courses" className={this.props.route_name == "/account/courses" ? "list-group-item list-group-item-action active":"list-group-item list-group-item-action"}><i className="fa fa-book" aria-hidden="true"></i>Courses</Link>
            <Link to="/account/quiz/summary" className={this.props.route_name == "/account/quiz/summary" ? "list-group-item list-group-item-action active":"list-group-item list-group-item-action"}><i className="fa fa-question-circle-o" aria-hidden="true"></i>Quiz Summary</Link>
            <Link to="/account/payment/history" className={this.props.route_name == "/account/payment/history" ? "list-group-item list-group-item-action active":"list-group-item list-group-item-action"}><i className="fa fa-money" aria-hidden="true"></i>Payment History</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
