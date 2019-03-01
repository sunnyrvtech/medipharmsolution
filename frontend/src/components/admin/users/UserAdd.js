// UserAdd.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { createUser,emptyReducer } from "../../../actions/admin/user";
import classnames from "classnames";

class UserAdd extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.emptyReducer();
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.createUser(user,this.props.history);
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Add New User</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="first_name">First Name:</label>
                <input
                  type="text"
                  className={classnames(
                    "form-control",
                    {
                      "is-invalid": errors.first_name
                    }
                  )}
                  name="first_name"
                  onChange={this.handleInputChange}
                  value={this.state.first_name}
                />
                {errors.first_name && (
                  <div className="invalid-feedback">
                    {errors.first_name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  className={classnames(
                    "form-control",
                    {
                      "is-invalid": errors.last_name
                    }
                  )}
                  name="last_name"
                  onChange={this.handleInputChange}
                  value={this.state.last_name}
                />
                {errors.last_name && (
                  <div className="invalid-feedback">
                    {errors.last_name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className={classnames(
                    "form-control",
                    {
                      "is-invalid": errors.email
                    }
                  )}
                  name="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className={classnames(
                    "form-control",
                    {
                      "is-invalid": errors.password
                    }
                  )}
                  name="password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password:</label>
                <input
                  type="password"
                  className={classnames(
                    "form-control",
                    {
                      "is-invalid": errors.password_confirm
                    }
                  )}
                  name="password_confirm"
                  onChange={this.handleInputChange}
                  value={this.state.password_confirm}
                />
                {errors.password_confirm && (
                  <div className="invalid-feedback">
                    {errors.password_confirm}
                  </div>
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
UserAdd.propTypes = {
  createUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createUser,emptyReducer }
)(withRouter(UserAdd));
