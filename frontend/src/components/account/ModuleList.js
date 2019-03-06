// ModuleList.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getModules } from "../../actions/module";
import Sidebar from "./Sidebar";
const moment = require('moment');
let route_name;

class ModuleList extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      modules: {}
    };
  }

  componentWillMount() {
    const courseId = this.props.match.params.courseId;

    this.props
      .getModules(courseId)
      .then(response => {
        this.setState({ modules: response });
      });
  }
  renderList(modules) {
    return (
      <tbody>
        {modules.map((module, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{module.name}</td>
              <td>{module.courses.name}</td>
              <td>{module.quiz_detail.score}%</td>
              <td>
                <Link to={"/account/modules/module/"+module._id} tooltip="View Detail"><i className="fa fa-low-vision"></i></Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    const { modules } = this.state;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Modules Listing</h1>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Module Name</th>
                      <th>Course Name</th>
                      <th>Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {modules && modules.length > 0 ?
                    this.renderList(modules)
                    :
                          <tbody>
                          <tr><td colSpan={5}>No module found!</td></tr>
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
export default connect(
  null,
  { getModules }
)(withRouter(ModuleList));
