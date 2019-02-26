// Profile.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageNotFound from "../PageNotFound";
import classnames from "classnames";

let route_name;

class Profile extends Component {
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
      <main>
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-sm-8">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">
                    Profile Update
                  </h1>
                </div>
                <form className="user" onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-sm-6">
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
                  <input
                    className="btn btn-user btn-block"
                    type="submit"
                    value="Profile update"
                  />
                </form>
                <hr />
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
)(withRouter(Profile));
