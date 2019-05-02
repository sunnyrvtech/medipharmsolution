// ForgotPassword.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter,Link } from 'react-router-dom';
import { connect } from "react-redux";
import { forgotPassword,emptyReducer } from "../actions/authentication";
import classnames from "classnames";

class ForgotPassword extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        props.emptyReducer();
  }

  handleInputChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email
    };
    this.props.forgotPassword(user)
    .then(response => {
      if (response) {
        this.setState({ alert_message: {class:'success',message: response.message}});
        setTimeout(function(){
            this.setState({alert_message:false});
        }.bind(this),10000);
      }
    });
  }

componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0);
  }
  render() {
    const { errors } = this.props;
    return (
      <div>
        {this.state.alert_message  && (
          <div class={'text-center alert alert-'+this.state.alert_message.class}>
             {this.state.alert_message.message}
          </div>
        )}
        <div className="container auth">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-auth-image" />
                  <div className="col-lg-6 auth-a">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Forgot Your Password?</h1>
                        <p class="mb-4">We get it, stuff happens. Just enter your email address below and we{"'"}ll send you a link to reset your password!</p>
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
                        <input
                          className="btn btn-user btn-block"
                          type="submit"
                          value="Forgot Password"
                        />
                      </form>
                        <hr />
                      <div className="text-center">
                      <Link className="small" to="/register"> Create an Account!</Link>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="/login"> Already have an account? Login!</Link>
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

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { forgotPassword,emptyReducer }
)(withRouter(ForgotPassword));
