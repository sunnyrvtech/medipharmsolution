// Register.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { registerUser,emptyReducer } from "../actions/authentication";
import PhoneInput from 'react-phone-number-input';
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
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
      phone_number: this.state.phone_number,
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
    this.props.emptyReducer();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container auth">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" />
              <div className="col-lg-7 auth-a">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form className="user" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          placeholder="First Name"
                          className={classnames(
                            "form-control form-control-user",
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
                      <div className="col-sm-6">
                        <input
                          type="text"
                          placeholder="Last Name"
                          className={classnames(
                            "form-control form-control-user",
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
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className={classnames(
                          "form-control form-control-user",
                          {
                            "is-invalid": errors.email
                          }
                        )}
                        name="email"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <PhoneInput
                        placeholder="Phone number"
                        className={classnames(
                          "form-control form-control-user",
                          {
                            "is-invalid": errors.phone_number
                          }
                        )}
                        value={ this.state.phone_number }
                        onChange={ phone_number => this.setState({ phone_number }) } />
                        {this.state.phone_number &&
                        <label>Phone Number:-{ this.state.phone_number }</label>
                        }
                      {errors.phone_number && (
                        <div className="invalid-feedback">{errors.phone_number}</div>
                      )}
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          placeholder="Password"
                          className={classnames(
                            "form-control form-control-user",
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
                      <div className="col-sm-6">
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          className={classnames(
                            "form-control form-control-user",
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
                    </div>
                    <input
                      className="btn btn-user btn-block"
                      type="submit"
                      value="Register Account"
                    />
                  </form>
                  <hr />
                  <div className="text-center">
                  <Link className="small" to="/password/forgot"> Forgot Password?</Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to="/login">
                      {" "}
                      Already have an account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  { registerUser,emptyReducer }
)(withRouter(Register));
