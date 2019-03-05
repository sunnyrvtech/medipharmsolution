// QuizDetail.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getQuizHistoryByUserId } from "../../actions/quiz";
import Sidebar from "./Sidebar";
const moment = require('moment');
let route_name;

class QuizDetail extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      quiz_history: {}
    };
  }

  componentWillMount() {
    this.props
      .getQuizHistoryByUserId(this.props.auth.user.id, this.props.history)
      .then(response => {
        this.setState({ quiz_history: response });
      });
  }
  renderList(quiz_history) {
    return (
      <tbody>
        {quiz_history.map((quiz, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{quiz.module_id.name}</td>
              <td>{quiz.course_id.name}</td>
              <td>{quiz.score}%</td>
              <td>{moment(quiz.created_at).format('YYYY-MM-DD hh:mm A')}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }


  render() {
    const { quiz_history } = this.state;
    console.log(quiz_history);
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Quiz History</h1>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Module Name</th>
                      <th>Course Name</th>
                      <th>Score</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  {quiz_history && quiz_history.length > 0 ?
                    this.renderList(quiz_history)
                    :
                          <tbody>
                          <tr><td colSpan={5}>No quiz history found!</td></tr>
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
  { getQuizHistoryByUserId }
)(withRouter(QuizDetail));
