// ContactUs.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendMessageByContactUs } from "../actions/user";
import PhoneInput from "react-phone-number-input";
import classnames from "classnames";

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
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
    this.setState({
      errors: {}
    });
    const message = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      message: this.state.message
    };
    this.props
      .sendMessageByContactUs(message, this.props.history);

  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center contact-us">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-contact-image" />
                  <div className="col-lg-6 auth-a">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          Send Us A Message!
                        </h1>
                      </div>
                      <form className="user" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className={classnames(
                              "form-control form-control-user",
                              {
                                "is-invalid": errors.first_name
                              }
                            )}
                            name="first_name"
                            placeholder="First Name"
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
                          <input
                            type="text"
                            className={classnames(
                              "form-control form-control-user",
                              {
                                "is-invalid": errors.last_name
                              }
                            )}
                            name="last_name"
                            placeholder="Last Name"
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
                          <input
                            type="email"
                            className={classnames(
                              "form-control form-control-user",
                              {
                                "is-invalid": errors.email
                              }
                            )}
                            name="email"
                            placeholder="Email Address"
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
                            <div className="invalid-feedback">
                              {errors.phone_number}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <textarea
                            name="message"
                            value={this.state.message}
                            placeholder="Write a message"
                            rows={6}
                            maxLength={500}
                            onChange={this.handleInputChange}
                            className={classnames("form-control", {
                              "is-invalid": errors.message
                            })}
                          />
                          {errors.message && (
                            <div className="invalid-feedback">
                              {errors.message}
                            </div>
                          )}
                        </div>
                        <input
                          className="btn btn-user btn-block"
                          type="submit"
                          value="Submit"
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

ContactUs.propTypes = {
  sendMessageByContactUs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { sendMessageByContactUs }
)(ContactUs);
