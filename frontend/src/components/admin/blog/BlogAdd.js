// BlogAdd.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { createBlog,emptyReducer } from "../../../actions/admin/blog";
import classnames from "classnames";
import CKEditor from "react-ckeditor-component";
let route_name;
class BlogAdd extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      description: "",
      banner: "",
      errors: {}
    };
    route_name = props.match.url;
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

  handleSubmit(e) {
    e.preventDefault();
    const blog = new FormData();
    blog.append("name", this.state.name);
    blog.append("description", this.state.description);
    blog.append("banner", this.state.banner);
    var routeName = route_name.split('/add')[0];
    this.props.createBlog(blog,routeName,this.props.history);
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Add New Blog</h3>
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
BlogAdd.propTypes = {
  createBlog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createBlog,emptyReducer }
)(withRouter(BlogAdd));
