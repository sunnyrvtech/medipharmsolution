// CourseList.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getCourseByUserId } from "../../actions/course";
const moment = require('moment');

let route_name;

class CourseList extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      courses: {}
    };
  }

  componentWillMount() {
    this.props
      .getCourseByUserId(this.props.auth.user.id, this.props.history)
      .then(response => {
        this.setState({ courses: response });
      });
  }

  renderList(courses) {
    return (
      <tbody>
        {courses.map((course, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{course.name}</td>
              <td>{moment(course.created_at).format('YYYY-MM-DD hh:mm A')}</td>
              <td>{moment(course.created_at).format('YYYY-MM-DD hh:mm A')}</td>
              <td>
                <Link to={"/account/modules/"+course._id} tooltip="View Module"><i className="fa fa-low-vision"></i></Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    const { courses } = this.state;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Course Details</h1>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Start At</th>
                      <th>Expired At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {courses && courses.length != undefined ?
                    this.renderList(courses)
                    :
                          <tbody>
                          <tr><td colSpan={5}>No course found!</td></tr>
                          </tbody>
                  }
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
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCourseByUserId }
)(withRouter(CourseList));
