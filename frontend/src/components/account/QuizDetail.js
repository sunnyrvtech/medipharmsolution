// QuizDetail.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageNotFound from "../PageNotFound";
import classnames from "classnames";

let route_name;

class QuizDetail extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      courses: {},
      errors: {}
    };
  }

  componentWillMount() {

  }


  render() {
    const { errors } = this.state;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
            Quiz Summary
            </div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {  }
)(withRouter(QuizDetail));
