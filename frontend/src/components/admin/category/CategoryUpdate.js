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

  handleSubmit(e) {
    e.preventDefault();
    const category = {
      name: this.state.name,
      categoryId: this.props.match.params.categoryId,
    };
    this.props.updateCategory(category,route_name, this.props.history);
  }

  componentDidMount() {
    this.props.emptyReducer();
    const categoryId = this.props.match.params.categoryId;
    this.props
      .getCategoryById(categoryId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ name: response.name });
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
