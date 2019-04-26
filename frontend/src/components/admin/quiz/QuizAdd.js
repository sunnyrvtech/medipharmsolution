// QuizAdd.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { createQuiz,emptyReducer } from "../../../actions/admin/quiz";
import { getModuleById } from "../../../actions/admin/module";
import classnames from "classnames";
let route_name;
class QuizAdd extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      errors: {}
    };
    route_name = props.match.url;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  componentDidMount() {
    this.props.emptyReducer();
    const moduleId = this.props.match.params.moduleId;
    this.props
      .getModuleById(moduleId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ module_name: response.name});
        }
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    const quiz = {
      name: this.state.name,
      moduleId: this.props.match.params.moduleId,
      option1: this.state.option1,
      option2: this.state.option2,
      option3: this.state.option3,
      option4: this.state.option4,
      answer: this.state.answer
    };
    this.props.createQuiz(quiz, route_name, this.props.history);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Add New Quiz ({this.state.module_name})</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.name
                  })}
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Option1:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        name="answer"
                        value={1}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="option1"
                    className={classnames("form-control", {
                      "is-invalid": errors.option1
                    })}
                    onChange={this.handleInputChange}
                    value={this.state.option1}
                  />
                  {errors.option1 && (
                    <div className="invalid-feedback">{errors.option1}</div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Option2:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        name="answer"
                        value={2}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.option2
                    })}
                    name="option2"
                    onChange={this.handleInputChange}
                    value={this.state.option2}
                  />
                  {errors.option2 && (
                    <div className="invalid-feedback">{errors.option2}</div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Option3:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        name="answer"
                        value={3}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.option3
                    })}
                    name="option3"
                    onChange={this.handleInputChange}
                    value={this.state.option3}
                  />
                  {errors.option3 && (
                    <div className="invalid-feedback">{errors.option3}</div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Option4:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        name="answer"
                        value={4}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.option4
                    })}
                    name="option4"
                    onChange={this.handleInputChange}
                    value={this.state.option4}
                  />
                  {errors.option4 && (
                    <div className="invalid-feedback">{errors.option4}</div>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-info mr-2">
                Add
              </button>
              <a className="btn btn-info" onClick={this.props.history.goBack}>Back</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
QuizAdd.propTypes = {
  createQuiz: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createQuiz,getModuleById,emptyReducer }
)(withRouter(QuizAdd));
