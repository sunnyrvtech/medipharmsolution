// CategoryUpdate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { updateCategory,getCategoryById,emptyReducer } from "../../../actions/admin/category";
import classnames from "classnames";
let route_name;
class CategoryUpdate extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      banner: "",
      errors: { }
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
    const category = new FormData();
    category.append("name", this.state.name);
    category.append("banner", this.state.banner);
    category.append("categoryId", this.props.match.params.categoryId);
    var routeName = route_name.split('/'+this.props.match.params.categoryId)[0];
    this.props.updateCategory(category,routeName, this.props.history);
  }

  componentDidMount() {
    this.props.emptyReducer();
    const categoryId = this.props.match.params.categoryId;
    this.props
      .getCategoryById(categoryId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ name: response.name,banner: response.banner});
        }
      });
  }
  render() {
    const { errors } = this.props;

    // console.log(this.props);

    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Update Category</h3>
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
CategoryUpdate.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  getCategoryById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateCategory, getCategoryById,emptyReducer }
)(withRouter(CategoryUpdate));
