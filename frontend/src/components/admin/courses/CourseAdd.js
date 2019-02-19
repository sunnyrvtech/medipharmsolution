// CourseAdd.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { courseAdd } from "../../../actions/admin/course";
import classnames from "classnames";
import CKEditor from "react-ckeditor-component";

class CourseAdd extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChangeEditor(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      description: newContent
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const course = {
      name: this.state.name,
      description: this.state.description
    };
    this.props.courseAdd(course,this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Add New Course</h3>
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
                  className={classnames(
                    "form-control",
                    {
                      "is-invalid": errors.name
                    }
                  )}
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className={classnames("form-group", {
                "ck_text": errors.description
              })}>
                <label htmlFor="content">Content:</label>
                <CKEditor
                  activeClass="p10"
                  content={this.state.description}
                  events={{
                    change: this.onChangeEditor.bind(this)
                  }}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <button type="submit" className="btn btn-info">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CourseAdd.propTypes = {
  courseAdd: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { courseAdd }
)(withRouter(CourseAdd));
