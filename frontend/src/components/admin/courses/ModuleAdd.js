// ModuleAdd.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { createModule } from "../../../actions/admin/module";
import { getCourses,emptyReducer } from "../../../actions/admin/course";
import classnames from "classnames";
import CKEditor from "react-ckeditor-component";

class ModuleAdd extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      course_id: "",
      content: "",
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeEditor(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const module = {
      name: this.state.name,
      course_id: this.state.course_id,
      content: this.state.content
    };
    this.props.createModule(module, this.props.history);
  }

  componentDidMount() {
    this.props.emptyReducer();
    this.props.getCourses();
  }
  render() {
    const { errors, courses } = this.props;

    // console.log(this.props);

    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Add New Module</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
                <label htmlFor="course">Course:</label>
                <select
                  className={classnames("form-control", {
                    "is-invalid": errors.course_id
                  })}
                  name="course_id"
                  onChange={this.handleInputChange}
                  value={this.state.value}
                >
                  <option value="">Choose course...</option>
                  {courses.length != undefined &&
                    courses.map(option => {
                      return (
                        <option value={option._id} key={option._id}>
                          {option.name}
                        </option>
                      );
                    })}
                </select>
                {errors.course_id && (
                  <div className="invalid-feedback">{errors.course_id}</div>
                )}
              </div>
              <div className={classnames("form-group", {
                "ck_text": errors.content
              })}>
                <label htmlFor="content">Content:</label>
                <CKEditor
                  activeClass="p10"
                  content={this.state.content}
                  events={{
                    change: this.onChangeEditor.bind(this)
                  }}
                />
                {errors.content && (
                  <div className="invalid-feedback">{errors.content}</div>
                )}
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
ModuleAdd.propTypes = {
  createModule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  courses: state.courses.courses,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createModule, getCourses,emptyReducer }
)(withRouter(ModuleAdd));
