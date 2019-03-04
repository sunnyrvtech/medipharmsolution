// Quiz.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getQuizByModuleId,addQuizResult } from "../../actions/quiz";

let route_name;

class Quiz extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      start_quiz: false,
      result_quiz_content: false,
      quiz_result: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  startQuiz() {
    this.setState({
      start_quiz: true,
      current_count: 0,
      quiz: this.state.quizes[0]
    });
  }

  nextQuiz() {
    var answer = this.state.answer;
    var quiz_result = this.state.quiz_result;
    var radList = document.getElementsByName('answer');
    this.setState({ answer: undefined });
    for (var i = 0; i < radList.length; i++) {
      if(radList[i].checked) document.getElementById(radList[i].id).checked = false;
    }
    if (answer == undefined) {
      window.scrollTo(0, 0);
      this.setState({
        alert_message: { class: "danger", message: "Please select your answer" }
      });
      setTimeout(
        function() {
          this.setState({ alert_message: false });
        }.bind(this),
        5000
      );
    } else {
      var index = this.state.current_count;
      var quizes = this.state.quizes;
      //enter id in the quiz result array if answer is correct
      if (answer == quizes[index].answer) {
        quiz_result.push(quizes[index]._id);
      }
      /// this is used to check if all question answer is completed.if all completed then we have render result content
      if (index + 1 < this.state.quiz_count) {
        this.setState({ current_count: index + 1, quiz: quizes[index + 1] });
      } else {
        const quiz_array = {
          user_id: this.props.auth.user.id,
          module_id: quizes[index].module_id,
          score: (quiz_result.length*100)/this.state.quiz_count
        }
        this.props.addQuizResult(quiz_array,this.props.history)
        .then(response => {
            this.setState({ result_quiz_content: true });
        });
      }
    }
  }

  componentWillMount() {
    const moduleId = this.props.match.params.moduleId;
    this.props
      .getQuizByModuleId(moduleId, this.props.history)
      .then(response => {
        this.setState({ quiz_count: response.length, quizes: response });
      });
  }

  renderQuizWrap() {
    return (
      <div className="quiz_wrap">
        <h2 className="h4 text-gray-900 mb-4">Count Your score</h2>
        <p>
          You will get 1 point for each correct answer. At the end of the Quiz,
          your total score will be displayed. Maximum score is 40 points.
        </p>
        <div className="w3-light-grey w3-padding w3-margin-top">
          <h2>Start the Quiz</h2>
          <p>Good luck!</p>
          <a
            href="javascript:void(0);"
            className="btn btn-user btn-block btn_quiz"
            onClick={() => this.startQuiz()}
          >
            Start the HTML Quiz ❯
          </a>
        </div>
      </div>
    );
  }
  renderQuizContainer() {
    const { current_count, quiz, quiz_count } = this.state;
    return (
      <div id="quizcontainer">
        {this.state.alert_message && (
          <div className={"alert alert-" + this.state.alert_message.class}>
            {this.state.alert_message.message}
          </div>
        )}
        <h3>
          Question {current_count + 1} of {quiz_count}:
        </h3>
        <p id="qtext">{quiz.name}</p>
        <div>
          <div id="altcontainer">
            <div className="radio_box">
              <input
                type="radio"
                name="answer"
                onChange={this.handleInputChange}
                id="answer1"
                value={1}
                className="css-checkbox"
              />
              <label htmlFor="answer1" className="css-label radGroup1">
                {quiz.options.option1}
              </label>
            </div>
            <div className="radio_box">
              <input
                type="radio"
                name="answer"
                onChange={this.handleInputChange}
                id="answer2"
                value={2}
                className="css-checkbox"
              />
              <label htmlFor="answer2" className="css-label radGroup1">
                {quiz.options.option2}
              </label>
            </div>
            <div className="radio_box">
              <input
                type="radio"
                name="answer"
                onChange={this.handleInputChange}
                id="answer3"
                value={3}
                className="css-checkbox"
              />
              <label htmlFor="answer3" className="css-label radGroup1">
                {quiz.options.option3}
              </label>
            </div>
            <div className="radio_box">
              <input
                type="radio"
                name="answer"
                onChange={this.handleInputChange}
                id="answer4"
                value={4}
                className="css-checkbox"
              />
              <label htmlFor="answer4" className="css-label radGroup1">
                {quiz.options.option4}
              </label>
            </div>
          </div>
        </div>
        <div id="answerbuttoncontainer">
          <button
            className="btn btn-user btn_quiz"
            onClick={() => this.nextQuiz()}
            type="button"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }
  renderQuizResult() {
    const { quiz_result,quiz_count } = this.state;
    var percentage = (quiz_result.length*100)/quiz_count;
    if(percentage <= 80){
      var result_text = "Almost! Study a little more and take the test again!";
    }else{
      var result_text = "You can be proud of yourself!";
    }
    return (
      <div className="quiz_result">
        <h2>Result</h2>
        <p>{quiz_result.length} of {quiz_count}</p>
        <strong>{percentage}%</strong>
        <p className="test_detail">
          {result_text}
        </p>
        {/*<div className="time_span">
          <p>
            <strong>Time Spent</strong>
          </p>
          <p>4:38</p>
        </div>*/}
      </div>
    );
  }

  renderContent() {
    const {
      quiz,
      quiz_count,
      current_count,
      start_quiz,
      result_quiz_content
    } = this.state;
    return (
      <div className="text-center module_content">
        {!start_quiz && !result_quiz_content && this.renderQuizWrap()}
        {start_quiz && !result_quiz_content && this.renderQuizContainer()}
        {result_quiz_content && this.renderQuizResult()}
      </div>
    );
  }

  render() {
    const { quiz_count } = this.state;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
                {quiz_count > 0 ? (
                  this.renderContent()
                ) : (
                  <span>No quiz found!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getQuizByModuleId,addQuizResult }
)(withRouter(Quiz));
