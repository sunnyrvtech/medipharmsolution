// CourseUpdate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseById,courseUpdate,emptyReducer } from "../../../actions/admin/course";
import classnames from "classnames";
import CKEditor from "react-ckeditor-component";

class CourseUpdate extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      errors: { }
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
  componentDidMount() {
    this.props.emptyReducer();
    const courseId = this.props.match.params.courseId;
    this.props
      .getCourseById(courseId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ name: response.name,description: response.description });
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const course = {
      name: this.state.name,
      courseId: this.props.match.params.courseId,
      description: this.state.description
    };
     this.props.courseUpdate(course,this.props.history);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Update Course</h3>
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
                {errors.name  && (
                  <div className="invalid-feedback">{errors.name}</div>
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CourseUpdate.propTypes = {
  courseUpdate: PropTypes.func.isRequired,
  getCourseById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { getCourseById,courseUpdate,emptyReducer }
)(withRouter(CourseUpdate));
