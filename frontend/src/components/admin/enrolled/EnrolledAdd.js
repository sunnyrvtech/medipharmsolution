// EnrolledAdd.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { addEnrolledUser, emptyReducer } from "../../../actions/admin/enrolled";
import { getCourses } from "../../../actions/admin/course";
import { getUsers } from "../../../actions/admin/user";
import Select from "react-select";
import DatePicker from "react-datepicker";
import classnames from "classnames";
let route_name;

class EnrolledAdd extends Component {
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
    this.setState({ [column]: selectedOption.value });
  }
  handleDateChange = (column,date) => {
    this.setState({ [column]: date });
  }
  componentWillMount() {
    this.props.getCourses();
    this.props.getUsers().then(response => {
      this.setState({ users: response });
    });
    this.props.emptyReducer();
  }
  handleSubmit(e) {
    e.preventDefault();
    const enrolled = {
      user_id: this.state.user_id,
      course_id: this.state.course_id,
      price: this.state.price,
      start_at: this.state.start_at,
      expired_at: this.state.expired_at
    };
   this.props.addEnrolledUser(enrolled, route_name, this.props.history);
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
                Add
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
EnrolledAdd.propTypes = {
  addEnrolledUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses.courses.length != undefined ? state.courses.courses : [],
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { addEnrolledUser, getCourses, getUsers, emptyReducer }
)(withRouter(EnrolledAdd));