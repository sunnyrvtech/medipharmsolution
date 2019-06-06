// CourseAdd.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { courseAdd } from "../../../actions/admin/course";
import { getCategories } from "../../../actions/admin/category";
import classnames from "classnames";
import Select from "react-select";
import CKEditor from "react-ckeditor-component";

class CourseAdd extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      description: "",
      banner: "",
      video: "",
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
  handleSelect2Change = (column,selectedOption) => {
    this.setState({ [column]: selectedOption.value });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    this.props.getCategories()
    .then(response => {
      this.setState({ categories: response});
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const course = new FormData();
    course.append("name", this.state.name);
    course.append("category", this.state.category);
    course.append("description", this.state.description);
    course.append("banner", this.state.banner);
    course.append("video", this.state.video);
    this.props.courseAdd(course,this.props.history);
  }
  render() {
    const { errors,categories } = this.state;
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
            <div className="form-group">
              <label htmlFor="course">Category:</label>
              <Select
                className={classnames("", {
                  "is-invalid": errors.category
                })}
                placeholder="Choose category..."
                onChange={(value) => this.handleSelect2Change("category", value)}
                options={categories}
              />
              {errors.category && (
                <div className="invalid-feedback out_side">{errors.category}</div>
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
              <div className="form-group"><span>Note:- File size should be less than 2 Mb and banner image dimention should be 1920*300.</span></div>
              <div className="form-group">
                <img id="output" />
              </div>
              <div className="form-group">
                <label htmlFor="video">Video:</label>
                <textarea
                  className="form-control"
                  placeholder="Iframe content"
                  name="video"
                  onChange={this.handleInputChange}
                  value={this.state.video}
                />
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
CourseAdd.propTypes = {
  courseAdd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { courseAdd,getCategories }
)(withRouter(CourseAdd));
