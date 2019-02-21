// Upload.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { uploadImage } from "../../../actions/admin/media";
let route_name;

class Upload extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
  }

  onChange(e) {
    e.preventDefault();
    var file = e.target.files[0];
    this.props.uploadImage(file, route_name, this.props.history);
  }
  triggerInputFile = () => this.fileInput.click();

  render() {
    const { errors } = this.props;
    return (
      <div className="container datatable">
        {errors.message != undefined && (
          <div className="alert alert-danger">{errors.message}</div>
        )}
        <input
          className="upload_image_file"
          ref={fileInput => (this.fileInput = fileInput)}
          type="file"
          onChange={this.onChange.bind(this)}
        />
        <div onClick={this.triggerInputFile} className="upload-img-galley text-center">
          <h3> Click Here to Upload Image </h3>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { uploadImage }
)(withRouter(Upload));
