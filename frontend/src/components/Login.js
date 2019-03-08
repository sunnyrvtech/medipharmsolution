// Login.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { loginUser,emptyReducer } from "../actions/authentication";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/account/profile");
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.emptyReducer();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if(this.props.location.state){
      if(this.props.location.state.alert_message){
          this.setState({
            alert_message: this.props.location.state.alert_message
          });
          setTimeout(function(){
              this.setState({alert_message:false});
          }.bind(this),10000);
          this.props.history.replace({ state: null });
        }
    }
  }
  render() {
    const { errors } = this.props;
    return (
      <div>
        {this.state.alert_message  && (
          <div class={'alert alert-'+this.state.alert_message.class}>
             {this.state.alert_message.message}
          </div>
        )}
        <div className="container auth">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6 auth-a">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
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
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <input
                          className="btn btn-user btn-block"
                          type="submit"
                          value="Login"
                        />
                      </form>
                        <hr />
                      <div className="text-center">
                        <Link className="small" to="/password/forgot"> Forgot Password?</Link>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="/register"> Create an Account!</Link>
                      </div>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser,emptyReducer }
)(Login);
