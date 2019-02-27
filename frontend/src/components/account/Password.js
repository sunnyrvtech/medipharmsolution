// Password.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageNotFound from "../PageNotFound";
import classnames from "classnames";

let route_name;

class Password extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      courses: {},
      errors: {}
    };
  }

  componentWillMount() {

  }


  render() {
    const { errors } = this.state;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">
                    Password Change
                  </h1>
                </div>
                <form className="user" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames(
                      "form-control form-control-user",
                      {
                        "is-invalid": errors.current_password
                      }
                    )}
                    name="password"
                    placeholder="Current Password"
                    onChange={this.handleInputChange}
                    value={this.state.current_password}
                  />
                  {errors.current_password && (
                    <div className="invalid-feedback">{errors.current_password}</div>
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
                    placeholder="New Password"
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
                    value="Password update"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {  }
)(withRouter(Password));
