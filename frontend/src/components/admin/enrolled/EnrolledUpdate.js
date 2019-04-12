// EnrolledUpdate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getEnrolledUserById,updateEnrolledUser, emptyReducer } from "../../../actions/admin/enrolled";
import { getCourses } from "../../../actions/admin/course";
import { getUsers } from "../../../actions/admin/user";
import Select from "react-select";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import "react-datepicker/dist/react-datepicker.css";
let route_name;

class EnrolledUpdate extends Component {
  constructor(props) {
    super();
    this.state = {
      user_id: "",
      course_id: "",
      price: "",
      start_at: null,
      expired_at: null,
      errors: {}
    };
    route_name = props.match.url;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSelect2Change = (column,selectedOption) => {
    console.log(selectedOption)
    this.setState({ [column]: { value:selectedOption.value,label: selectedOption.label} });
  }
  handleDateChange = (column,date) => {
    this.setState({ [column]: date });
  }
  componentWillMount() {
    this.props.getCourses();
    this.props.getUsers().then(response => {
      this.setState({ users: response });
    });
    const enrolledId = this.props.match.params.enrolledId;
    this.props
      .getEnrolledUserById(enrolledId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ user_id: { value:response.user_id._id,label: response.user_id.email},course_id: { value:response.course_id._id,label: response.course_id.name},price: response.price,start_at: response.created_at,expired_at: response.expired_at});
        }
      });

    this.props.emptyReducer();
  }
  handleSubmit(e) {
    e.preventDefault();
    const enrolled = {
      enrolledId: this.props.match.params.enrolledId,
      user_id: this.state.user_id.value,
      course_id: this.state.course_id.value,
      price: this.state.price,
      start_at: this.state.start_at,
      expired_at: this.state.expired_at
    };
   this.props.updateEnrolledUser(enrolled, route_name, this.props.history);
  }

  render() {
    const { errors, courses } = this.props;
    const { users } = this.state;
    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Enroll User</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form className="enrollForm" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">User:</label>
                <Select
                  className={classnames("", {
                    "is-invalid": errors.user_id
                  })}
                  placeholder="Select User"
                  value={this.state.user_id}
                  onChange={(value) => this.handleSelect2Change("user_id", value)}
                  options={users}
                />
                {errors.user_id && (
                  <div className="invalid-feedback out_side">{errors.user_id}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Course:</label>
                <Select
                  className={classnames("", {
                    "is-invalid": errors.course_id
                  })}
                  placeholder="Select Course"
                  value={this.state.course_id}
                  onChange={(value) => this.handleSelect2Change("course_id", value)}
                  options={courses}
                />
                {errors.course_id && (
                  <div className="invalid-feedback out_side">{errors.course_id}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Price:</label>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.price
                  })}
                  name="price"
                  placeholder="Price"
                  onChange={this.handleInputChange}
                  value={this.state.price}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Start At:</label>
                <DatePicker
                className={classnames("form-control", {
                  "is-invalid": errors.start_at
                })}
                selected={this.state.start_at}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MM/d/y, h:mm aa"
                onChange={(value) => this.handleDateChange("start_at", value)}
                placeholderText="Start At"
                />
                {errors.start_at && (
                  <div className="invalid-feedback out_side">{errors.start_at}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Expired At:</label>
                <DatePicker
                className={classnames("form-control", {
                  "is-invalid": errors.expired_at
                })}
                selected={this.state.expired_at}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MM/d/y, h:mm aa"
                onChange={(value) => this.handleDateChange("expired_at", value)}
                placeholderText="Expired At"
                />
                {errors.expired_at && (
                  <div className="invalid-feedback out_side">{errors.expired_at}</div>
                )}
              </div>
              <button type="submit" className="btn btn-info mr-2">
                Update
              </button>
              <a className="btn btn-info" onClick={this.props.history.goBack}>
                Back
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
EnrolledUpdate.propTypes = {
  updateEnrolledUser: PropTypes.func.isRequired,
  getEnrolledUserById: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses.courses.length != undefined ? state.courses.courses : [],
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { getEnrolledUserById,updateEnrolledUser, getCourses, getUsers, emptyReducer }
)(withRouter(EnrolledUpdate));
