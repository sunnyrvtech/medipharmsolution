// User.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getUsers, deleteUser } from "../../../actions/admin/user";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

let route_name;

class User extends Component {
  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
    route_name = props.match.path;
  }

  onDelete(cell, index) {
    this.props.deleteUser(cell, this.props.history).then(response => {
      if (response) {
        var users = this.state.users;
        if (response.status) {
          users[index].status = true;
          users[index].account_status = "Active";
          var message = "Activate successfully!";
        } else {
          users[index].status = false;
          users[index].account_status = "Not active";
          var message = "Deactivate successfully!";
        }

        this.setState({
          alert_message: { class: "success", message: message }
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
    this.props.getUsers().then(response => {
      this.setState({ users: response });
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
          className={row.status?"btn btn-primary btn-circle":"btn btn-danger btn-circle"}
          tooltip={row.status?"Deactivate":"Activate"}
        >
          <i className={row.status?"fa fa-check":"fa fa-remove"} />
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
  rendertable(users) {
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
          data={users}
          version="4"
          search={true}
          options={options}
          insertRow
          pagination
        >
          <TableHeaderColumn width="60" isKey dataSort dataField="id">
            ID
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
          <TableHeaderColumn dataSort dataField="account_status">
            Status
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
    const { users } = this.state;
    return (
      <div className="container datatable">
        {this.state.alert_message && (
          <div className={"text-center alert alert-" + this.state.alert_message.class}>
            {this.state.alert_message.message}
          </div>
        )}
        {users != undefined && this.rendertable(users)}
      </div>
    );
  }
}

export default connect(
  null,
  { getUsers, deleteUser }
)(withRouter(User));
