// Enrollment.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getEnrollmentRequest, deleteEnrollemntRequest } from "../../../actions/admin/enrollment";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

let route_name;

class Enrollment extends Component {
  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
    route_name = props.match.path;
  }

  onDelete(cell, index) {
    this.props.deleteEnrollemntRequest(cell, this.props.history).then(response => {
      if (response) {
        var enrollments = this.state.enrollments;
        delete enrollments[index]; // this is used to remove item from the list after delete
        //   used to filter array after remove
        enrollments = enrollments.filter(function(obj) {
          if (obj.id > index) {
            return (obj.id = obj.id - 1);
          }
          return true;
        });
        this.setState({
          enrollments: enrollments,
          alert_message: { class: "success", message: "Deleted successfully!" }
        });
        setTimeout(
          function() {
            this.setState({ alert_message: false });
          }.bind(this),
          5000
        );
      }
    });
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    //if(this.props.courses.length == undefined)
    this.props.getEnrollmentRequest().then(response => {
      this.setState({ enrollments: response });
    });
    if (this.props.location.state) {
      if (this.props.location.state.alert_message) {
        this.setState({
          alert_message: this.props.location.state.alert_message
        });
        setTimeout(
          function() {
            this.setState({ alert_message: false });
          }.bind(this),
          5000
        );
        this.props.history.replace({ state: null });
      }
    }
  }
  ActionButton(cell, row) {
    return (
      <div>
        <a
          onClick={() => this.onDelete(cell, row.id - 1)}
          className="btn btn-danger btn-circle"
          tooltip="delete"
        >
          <i className="fa fa-trash" />
        </a>
      </div>
    );
  }
  rendertable(enrollments) {
    const options = {
      clearSearch: true,
      defaultSortName: "id",
      defaultSortOrder: "asc",
      insertBtn: null,
      sizePerPage: 10,
      paginationSize: 6
    };
    return (
      <div>
        <BootstrapTable
          data={enrollments}
          version="4"
          search={true}
          options={options}
          pagination
        >
          <TableHeaderColumn width="60" isKey dataSort dataField="id">
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="course_name">
            Course Name
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="first_name">
            First Name
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="last_name">
            Last Name
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="email">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="phone_number">
            Phone Number
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="message">
            Message
          </TableHeaderColumn>
          <TableHeaderColumn
            width="100"
            dataField="_id"
            dataFormat={this.ActionButton.bind(this)}
          >
            Action
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

  render() {
    const { enrollments } = this.state;
    return (
      <div className="container datatable">
        {this.state.alert_message && (
          <div className={"alert alert-" + this.state.alert_message.class}>
            {this.state.alert_message.message}
          </div>
        )}
        {enrollments != undefined && this.rendertable(enrollments)}
      </div>
    );
  }
}

export default connect(
  null,
  { getEnrollmentRequest, deleteEnrollemntRequest }
)(withRouter(Enrollment));
