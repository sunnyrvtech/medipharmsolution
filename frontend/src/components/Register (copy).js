// Register.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions/authentication";
import classnames from "classnames";

class Register extends Component {
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
    this.props.registerUser(user, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container register-block">
          <h2 className="text-center">Registration Now</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name" className="text-uppercase">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.first_name
                })}
                name="first_name"
                onChange={this.handleInputChange}
                value={this.state.first_name}
              />
              {errors.first_name && (
                <div className="invalid-feedback">{errors.first_name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="last_name" className="text-uppercase">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.last_name
                })}
                name="last_name"
                onChange={this.handleInputChange}
                value={this.state.last_name}
              />
              {errors.last_name && (
                <div className="invalid-feedback">{errors.last_name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-uppercase">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })}
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-uppercase">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password_confirm" className="text-uppercase">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password_confirm
                })}
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
            <div className="form-group">
              <button type="submit" className="btn btn-register">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
