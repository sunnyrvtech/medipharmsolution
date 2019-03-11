// CourseUpdate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseById,courseUpdate,emptyReducer } from "../../../actions/admin/course";
import { getCategories } from "../../../actions/admin/category";
import classnames from "classnames";
import CKEditor from "react-ckeditor-component";

class CourseUpdate extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      description: "",
      banner: "",
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
  onChange(e) {
    e.preventDefault();
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
      var output = document.getElementById("output");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      banner: file
    });
  }
  componentDidMount() {
    this.props.emptyReducer();
    const courseId = this.props.match.params.courseId;
    this.props
      .getCourseById(courseId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ name: response.name,category: response.category_id,description: response.description,banner: response.banner });
        }
      });
      this.props.getCategories()
      .then(response => {
        this.setState({ categories: response});
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const course = new FormData();
    course.append("name", this.state.name);
    course.append("courseId", this.props.match.params.courseId);
    course.append("category", this.state.category);
    course.append("description", this.state.description);
    course.append("banner", this.state.banner);
    this.props.courseUpdate(course,this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors,categories } = this.state;
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
            <div className="form-group">
              <label htmlFor="course">Category:</label>
              <select
                className={classnames("form-control", {
                  "is-invalid": errors.category
                })}
                name="category"
                onChange={this.handleInputChange}
                value={this.state.category}
              >
                <option value="">Choose category...</option>
                {categories != undefined &&
                  categories.map(option => {
                    return (
                      <option value={option._id} key={option._id}>
                        {option.name}
                      </option>
                    );
                  })}
              </select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
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
              <div className="form-group">
                <label htmlFor="banner">Banner:</label>
                <input
                  type="file"
                  className={classnames("form-control", {
                    "is-invalid": errors.banner
                  })}
                  name="banner"
                  onChange={this.onChange.bind(this)}
                />
                {errors.banner && (
                  <div className="invalid-feedback">{errors.banner}</div>
                )}
              </div>
              <div className="form-group">
                <img src={this.state.banner} id="output" />
              </div>
              <button type="submit" className="btn btn-info mr-2">
                Update
              </button>
              <a className="btn btn-info" onClick={this.props.history.goBack}>Back</a>
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
  { getCourseById,courseUpdate,getCategories,emptyReducer }
)(withRouter(CourseUpdate));
