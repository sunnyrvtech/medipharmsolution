// ModuleList.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getModules } from "../../actions/module";
import Sidebar from "./Sidebar";
const moment = require("moment");
let route_name;
let total_question;
let total_answer;
let quiz_count;

class ModuleList extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      modules: {}
    };
    total_question = 0;
    total_answer = 0;
    quiz_count = 0;
  }

  componentWillMount() {
    const courseId = this.props.match.params.courseId;

    this.props.getModules(courseId).then(response => {
      this.setState({ percentage: 0, modules: response });
    });
  }
  reanderPercentage(module_count) {
    if (total_question != 0) {
      var percentage = (total_answer * 100) / total_question;
    } else {
      var percentage = 0;
    }

    return (
      <tr>
        <td colSpan={3}>
          <div class="alert alert-info">
            {percentage >= 80 && module_count == quiz_count ? (
              <span>
                <strong>Congratulation!</strong> You have scored above 80% .Get your certificate <b>  <Link to={"/account/cert/"+this.props.match.params.courseId} tooltip="Get Certificate">here</Link>
                </b>
              </span>
            ) : (
              <span>
                <strong>Note!</strong> Certificate will be available if your
                overall percentage above 80%
              </span>
            )}
          </div>
        </td>
        <td colSpan={3}>
          {module_count == quiz_count &&
            <div>
          <p>
            <b>Percentage</b>
          </p>
          <span>{percentage}%</span>
          </div>
        }
        </td>
      </tr>
    );
  }
  renderList(modules) {
    return (
      <tbody>
        {modules.map((module, i) => {
          if (module.quiz_detail) {
            total_question += module.quiz_detail.total_question;
            total_answer += module.quiz_detail.total_answer;
            quiz_count++;
          }
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{module.name}</td>
              <td>{module.courses.name}</td>
              <td>
                {module.quiz_detail != undefined
                  ? module.quiz_detail.score + "%"
                  : "......."}
              </td>
              <td>
                <Link
                  to={"/account/modules/module/" + module._id}
                  tooltip="View Detail"
                >
                  <i className="fa fa-low-vision" />
                </Link>{" "}
                <Link
                  to={"/account/quiz/" + module._id}
                  tooltip="Play Quiz"
                >
                  <i className="fa fa-question-circle" />
                </Link>
              </td>
            </tr>
          );
        })}
        {this.reanderPercentage(modules.length)}
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
                <div className="text-center module_content">
                  <h1 className="h4 text-gray-900 mb-4">Modules Listing</h1>
                  <div className="nxt_btn"><Link to={"/account/courses"} className="btn btn-primary">Back Course Listing</Link></div>

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
                  {modules && modules.length > 0 ? (
                    this.renderList(modules)
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={5}>No module found!</td>
                      </tr>
                    </tbody>
                  )}
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
