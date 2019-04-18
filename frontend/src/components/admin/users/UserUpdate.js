// UserUpdate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getUserById,updateUser,emptyReducer } from "../../../actions/admin/user";
import classnames from "classnames";

class UserUpdate extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
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
  componentDidMount() {
    this.props.emptyReducer();
    const userId = this.props.match.params.userId;
    this.props
      .getUserById(userId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ first_name: response.first_name,last_name: response.last_name,email: response.email,phone_number: response.phone_number,status: response.status });
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      userId: this.props.match.params.userId,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      status: this.state.status
    };
     this.props.updateUser(user,this.props.history);
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
    console.log(this.state);
    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Update User</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                className={classnames(
                  "form-control",
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
            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                className={classnames(
                  "form-control",
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
            <div className="form-group">
              <label htmlFor="last_name">Phone Number:</label>
              <input
                type="phone_number"
                placeholder="Phone Number"
                className={classnames(
                  "form-control form-control-user",
                  {
                    "is-invalid": errors.phone_number
                  }
                )}
                name="phone_number"
                onChange={this.handleInputChange}
                value={this.state.phone_number}
              />
              {errors.phone_number && (
                <div className="invalid-feedback">{errors.phone_number}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className={classnames(
                  "form-control",
                  {
                    "is-invalid": errors.email
                  }
                )}
                name="email"
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
              <label htmlFor="status">Status:</label>
              <select
                className="form-control"
                name="status"
                onChange={this.handleInputChange}
                value={this.state.status}
              >
                <option value={true}>Active</option>
                <option value={false}>Not Active</option>
              </select>
            </div>
              <button type="submit" className="btn btn-info mr-2">
                Update
              </button>
                <a className="btn btn-info" onClick={this.props.history.goBack}>Back</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UserUpdate.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  emptyReducer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { getUserById,updateUser,emptyReducer }
)(withRouter(UserUpdate));
