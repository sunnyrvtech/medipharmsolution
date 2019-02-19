// ResetPassword.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter,Link } from 'react-router-dom';
import { connect } from "react-redux";
import { resetPassword,emptyReducer } from "../actions/authentication";
import classnames from "classnames";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
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
      reset_token: this.props.match.params.code,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.resetPassword(user,this.props.history);
  }
  componentDidMount() {
    this.props.emptyReducer();
  }
  render() {
    const { errors } = this.props;
    return (
      <div>
        <div className="container auth">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6 auth-a">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Reset Password</h1>
                      </div>
                      <form className="user" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            className={classnames(
                              "form-control form-control-user",
                              {
                                "is-invalid": errors.email
                              }
                            )}
                            name="email"
                            placeholder="Enter Email Address..."
                            onChange={this.handleInputChange}
                            value={this.state.email}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className={classnames(
                              "form-control form-control-user",
                              {
                                "is-invalid": errors.password
                              }
                            )}
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                          />
                          {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className={classnames(
                              "form-control form-control-user",
                              {
                                "is-invalid": errors.password_confirm
                              }
                            )}
                            name="password_confirm"
                            placeholder="Confirm Password"
                            onChange={this.handleInputChange}
                            value={this.state.password_confirm}
                          />
                          {errors.password_confirm && (
                            <div className="invalid-feedback">{errors.password_confirm}</div>
                          )}
                        </div>
                        <input
                          className="btn btn-user btn-block"
                          type="submit"
                          value="Reset Password"
                        />
                      </form>
                    </div>
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

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword,emptyReducer }
)(withRouter(ForgotPassword));
