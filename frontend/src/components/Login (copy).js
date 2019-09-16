// Login.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
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
      this.props.history.push("/admin");
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
      <div className="login-block">
        <div className="inner-auth">
          <div className="row">
            <div className="col-md-4 login-sec">
              <h2 className="text-center">Login Now</h2>
              <form className="login-form" onSubmit={this.handleSubmit}>
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
                <div className="form-check text-center">
                  <button type="submit" className="btn btn-login">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-8">
              <img
                className="img-fluid"
                src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg"
                alt="First slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <div className="">
                  <h2>This is Heaven</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  </p>
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
  { loginUser }
)(Login);
