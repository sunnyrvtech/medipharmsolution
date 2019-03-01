// Quiz.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getQuizByModuleId } from "../../actions/quiz";

let route_name;

class Quiz extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      quiz: null
    };
  }

  nextModule(){
    var index = this.state.current_count;
    var modules = this.state.modules;
    this.setState({ current_count: index+1,module: modules[index+1] });
  }

  componentWillMount() {
    const moduleId = this.props.match.params.moduleId;
    this.props
      .getQuizByModuleId(moduleId, this.props.history)
      .then(response => {
        this.setState({ current_count: 0,quiz_count: response.length,quizes: response,quiz: response[0] });
      });
  }

  renderContent() {
    const { quiz,quiz_count,current_count } = this.state;
    return (
      <div className="text-center module_content">
        <h2 className="h4 text-gray-900 mb-4">
          {quiz.name}
        </h2>
        <div className="quiz_wrap">
          <p>You will get 1 point for each correct answer. At the end of the Quiz, your total score will be displayed. Maximum score is 40 points.</p>
          <div className="w3-light-grey w3-padding w3-margin-top">
            <h2>Start the Quiz</h2>
            <p>Good luck!</p>
            <a href="#" className="btn btn-user btn-block btn_quiz">Start the HTML Quiz ❯</a>
          </div>
        </div>
        <div id="quizcontainer">
          <h3>Question 1 of 40:</h3>
          <p id="qtext">What does HTML stand for?</p>
          <form role="form" id="quizform" name="quizform" action="" method="post">
            <div>
              <div id="altcontainer">
                <div className="radio_box">
                    <input type="radio" name="radiog_lite" id="radio1" className="css-checkbox" />
                    <label for="radio1" className="css-label radGroup1"> Home Tool Markup Language</label>
                </div>
                <div className="radio_box">
                    <input type="radio" name="radiog_lite" id="radio2" className="css-checkbox" />
                    <label for="radio2" className="css-label radGroup1"> Home Tool Markup Language</label>
                </div>
                <div className="radio_box">
                    <input type="radio" name="radiog_lite" id="radio3" className="css-checkbox" />
                    <label for="radio3" className="css-label radGroup1"> Home Tool Markup Language</label>
                </div>    
              </div>
            </div>
            <div id="answerbuttoncontainer">
              <button className="btn btn-user btn_quiz" type="submit">Next ❯</button>
            </div>
          </form>
        </div> 
        <div className="quiz_result">
            <h2>Result</h2>
            <p>20 of 25</p>
            <strong>80%</strong>
            <p className="test_detail">Almost! Study a little more and take the test again!</p>
            <div className="time_span">
                <p><strong>Time Spent</strong></p>
                <p>4:38</p>
            </div>
        </div> 
      </div>
    );
  }


  render() {
  const { quiz } = this.state;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
            <div className="p-5">
            {quiz ?
              this.renderContent()
              :
              <span>No quiz found!</span>
            }
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
  { getQuizByModuleId }
)(withRouter(Quiz));
