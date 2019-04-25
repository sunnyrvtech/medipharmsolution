// Password.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { passwordChange,emptyReducer } from "../../actions/user";
import classnames from "classnames";

let route_name;

class Password extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      current_password: "",
      passport: "",
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
    window.scrollTo(0, 0);
    e.preventDefault();
    const user = {
      current_password: this.state.current_password,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.passwordChange(user,this.props.history)
    .then(response => {
      if(response){
      this.props.emptyReducer();
      this.setState({ current_password:'',password:'',password_confirm:'',alert_message: {class:'success',message: 'Password changed successfully!'}});
      setTimeout(function(){
          this.setState({alert_message:false});
      }.bind(this),5000);
    }
    });
  }
  render() {
    const { errors } = this.props;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
            {this.state.alert_message  && (
              <div className={'text-center alert alert-'+this.state.alert_message.class}>
                 {this.state.alert_message.message}
              </div>
            )}
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
                    name="current_password"
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
  { passwordChange,emptyReducer }
)(withRouter(Password));
