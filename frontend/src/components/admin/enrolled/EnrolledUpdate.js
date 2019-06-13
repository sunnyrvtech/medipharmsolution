// EnrolledUpdate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  getEnrolledUserById,
  updateEnrolledUser,
  emptyReducer
} from "../../../actions/admin/enrolled";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import PageNotFound from "../../PageNotFound";
import "react-datepicker/dist/react-datepicker.css";
const moment = require('moment');
let route_name;

class EnrolledUpdate extends Component {
  constructor(props) {
    super();
    this.state = {
      price: "",
      start_at: null,
      expired_at: null,
      page_not_found: false,
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
  handleDateChange = (column, date) => {
    this.setState({ [column]: date });
  };
  componentWillMount() {
    this.props.emptyReducer();
    const enrolledId = this.props.match.params.enrolledId;
    this.props
      .getEnrolledUserById(enrolledId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({
            email: response.user_id.email,
            course_name: response.course_id.name,
            price: response.price,
            start_at: moment(response.created_at).toDate(),
            expired_at: moment(response.expired_at).toDate()
          });
        } else {
          this.setState({ page_not_found: true });
        }
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    const enrolled = {
      enrolledId: this.props.match.params.enrolledId,
      price: this.state.price,
      start_at: this.state.start_at,
      expired_at: this.state.expired_at
    };
    this.props.updateEnrolledUser(enrolled, route_name, this.props.history);
  }

  render_form() {
    const { errors } = this.props;
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
                <input
                  type="text"
                  readOnly="readOnly"
                  className="form-control"
                  placeholder="User Email"
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Course:</label>
                <input
                  type="text"
                  readOnly="readOnly"
                  className="form-control"
                  placeholder="Course"
                  value={this.state.course_name}
                />
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
                  onChange={value => this.handleDateChange("start_at", value)}
                  placeholderText="Start At"
                />
                {errors.start_at && (
                  <div className="invalid-feedback out_side">
                    {errors.start_at}
                  </div>
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
                  onChange={value => this.handleDateChange("expired_at", value)}
                  placeholderText="Expired At"
                />
                {errors.expired_at && (
                  <div className="invalid-feedback out_side">
                    {errors.expired_at}
                  </div>
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
  render() {
    const { email, course_name, page_not_found } = this.state;
    return (
      <div>
        {email != undefined && course_name != undefined && this.render_form()}
        {page_not_found && <PageNotFound />}
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
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { getEnrolledUserById, updateEnrolledUser, emptyReducer }
)(withRouter(EnrolledUpdate));
