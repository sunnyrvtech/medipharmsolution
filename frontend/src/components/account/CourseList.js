// CourseList.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageNotFound from "../PageNotFound";
import classnames from "classnames";

let route_name;

class CourseList extends Component {
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
      <main>
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-sm-8">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">
                    Course Details
                  </h1>
                </div>
                <table class="table table-hover table-fixed">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">4</th>
                    <td>Jerry</td>
                    <td>Horwitz</td>
                    <td>Editor-in-chief</td>
                    <td><Link to="/account/module">View Course</Link></td>
                  </tr>
                  <tr>
                  <th scope="row">4</th>
                  <td>Jerry</td>
                  <td>Horwitz</td>
                  <td>Editor-in-chief</td>
                  <td><Link to="/account/module">View Course</Link></td>
                  </tr>
                  <tr>
                  <th scope="row">4</th>
                  <td>Jerry</td>
                  <td>Horwitz</td>
                  <td>Editor-in-chief</td>
              <td><Link to="/account/module">View Course</Link></td>
                  </tr>
                  <tr>
                  <th scope="row">4</th>
                  <td>Jerry</td>
                  <td>Horwitz</td>
                  <td>Editor-in-chief</td>
                <td><Link to="/account/module">View Course</Link></td>
                  </tr>
                  <tr>
                  <th scope="row">4</th>
                  <td>Jerry</td>
                  <td>Horwitz</td>
                  <td>Editor-in-chief</td>
            <td><Link to="/account/module">View Course</Link></td>
                  </tr>
                  <tr>
                  <th scope="row">4</th>
                  <td>Jerry</td>
                  <td>Horwitz</td>
                  <td>Editor-in-chief</td>
                  <td><Link to="/account/module">View Course</Link></td>
                  </tr>
                </tbody>
                </table>
              </div>
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
)(withRouter(CourseList));
