// Enrolled.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getEnrolledUsers, deleteEnrolledUser } from "../../../actions/admin/enrolled";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

let route_name;

class Enrolled extends Component {
  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
    route_name = props.match.url;
  }

  onDelete(cell, index) {
    this.props.deleteEnrolledUser(cell, this.props.history).then(response => {
      if (response) {
        var enrolled_users = this.state.enrolled_users;
        delete enrolled_users[index]; // this is used to remove item from the list after delete
        enrolled_users = enrolled_users.filter(function(obj) {
          if (obj.id > index) {
            return (obj.id = obj.id - 1);
          }
          return true;
        });
        this.setState({
          enrolled_users: enrolled_users,
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
    this.props.getEnrolledUsers(this.props.match.params.enrolledId).then(response => {
      this.setState({ enrolled_users: response });
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
          to={`${route_name + "/" + cell}`}
          className="btn btn-info btn-circle"
          tooltip="update"
        >
          <i className="fa fa-pencil-square-o" />
        </Link>{" "}
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
  createCustomInsertButton = onClick => {
    return (
      <div>
        <Link to={`${route_name}/add`} className="btn btn-info">
          Add New
        </Link>
      </div>
    );
  };
  rendertable(enrolled_users) {
    const options = {
      clearSearch: true,
      defaultSortName: "id",
      defaultSortOrder: "asc",
      insertBtn: this.createCustomInsertButton,
      sizePerPage: 10,
      paginationSize: 6
    };
    return (
      <div>
        <BootstrapTable
          data={enrolled_users}
          version="4"
          search={true}
          options={options}
          insertRow
          pagination
        >
          <TableHeaderColumn width="60" isKey dataSort dataField="id">
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="name">
            Quiz
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="module_name">
            Module
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
    const { enrolled_users } = this.state;
    return (
      <div className="container datatable">
        {this.state.alert_message && (
          <div className={"alert alert-" + this.state.alert_message.class}>
            {this.state.alert_message.message}
          </div>
        )}
        {this.rendertable(enrolled_users)}
      </div>
    );
  }
}

export default connect(
  null,
  { getEnrolledUsers, deleteEnrolledUser }
)(withRouter(Enrolled));
