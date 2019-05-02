// UserCourse.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getUserCourses } from "../../../actions/admin/user";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

let route_name;

class UserCourse extends Component {
  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
    route_name = props.match.url;
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    const userId = this.props.match.params.userId;
    this.props.getUserCourses(userId).then(response => {
      this.setState({ courses: response });
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
        <Link
          to={"/admin/users/certificate/" + cell}
          className="btn btn-info btn-circle"
          tooltip="Send Certificate"
        >
          <i className="fa fa-low-vision" />
        </Link>{" "}
      </div>
    );
  }
  rendertable(quizes) {
    const options = {
      clearSearch: true,
      defaultSortName: "id",
      defaultSortOrder: "asc",
      sizePerPage: 10,
      paginationSize: 6
    };
    return (
      <div>
        <BootstrapTable
          data={quizes}
          version="4"
          search={true}
          options={options}
          insertRow
          pagination
        >
          <TableHeaderColumn width="60" isKey dataSort dataField="id">
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="email">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="course_name">
            Course Name
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
    const { courses } = this.state;
    return (
      <div className="container datatable">
        {this.rendertable(courses)}
      </div>
    );
  }
}

export default connect(
  null,
  { getUserCourses }
)(withRouter(UserCourse));
