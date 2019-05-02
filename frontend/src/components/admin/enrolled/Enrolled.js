// Enrolled.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getEnrolledUsers,deleteEnrolledUser } from "../../../actions/admin/enrolled";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
const moment = require('moment');

let route_name;

class Enrolled extends Component {
  constructor(props) {
    super();
    this.state = {
      modal: false,
      modal_value: null,
      alert_message: null
    };
    route_name = props.match.url;
    this.open_model = this.open_model.bind(this);
  }

  open_model(row) {
    this.setState({
      modal_value: row,
      modal: !this.state.modal
    });
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
    this.props
      .getEnrolledUsers(this.props.match.params.enrolledId)
      .then(response => {
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
        <a
          onClick={() => this.open_model(row)}
          className="btn btn-info btn-circle"
          tooltip="View Details"
        >
          <i className="fa fa-low-vision" />
        </a>{" "}
        <Link
          to={`${route_name + "/" + cell}`}
          className="btn btn-info btn-circle"
          tooltip="update"
        >
          <i className="fa fa-pencil-square-o" />
        </Link>{" "}
        <Link
          to={`${route_name + "/certificate/" + cell}`}
          className="btn btn-info btn-circle"
          tooltip="Send certificate"
        >
          <i className="fa fa-send" />
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
  rendertable(enrolled_users) {
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
          data={enrolled_users}
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
          <TableHeaderColumn dataSort dataField="email">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="start_at">
            Start At
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="expired_at">
            Expired At
          </TableHeaderColumn>
          <TableHeaderColumn
            width="200"
            dataField="_id"
            dataFormat={this.ActionButton.bind(this)}
          >
            Action
          </TableHeaderColumn>
        </BootstrapTable>
        {this.state.modal_value && (
          <Modal isOpen={this.state.modal} className="">
            <div className="modal-header">
              <div className="text-center">
                <h4 className="modal-title">Enrolled User Details</h4>
              </div>
              <button type="button" className="close" onClick={this.open_model}>
                &times;
              </button>
            </div>
            <ModalBody>
                  <div class="card">
                    <div class="card-body">
                      <div className="row border-bottom mb-2">
                        <div className="col-md-6 border-right">
                          <strong>Course Name</strong>
                        </div>
                        <div className="col-md-6">
                          <p class="card-text">
                            {this.state.modal_value.course_name}
                          </p>
                        </div>
                      </div>
                      <div className="row border-bottom mb-2">
                        <div className="col-md-6 border-right">
                          <strong>First Name</strong>
                        </div>
                        <div className="col-md-6">
                          <p class="card-text">
                            {this.state.modal_value.first_name}
                          </p>
                        </div>
                      </div>
                      <div className="row border-bottom mb-2">
                        <div className="col-md-6 border-right">
                          <strong>Last Name</strong>
                        </div>
                        <div className="col-md-6">
                          <p class="card-text">
                            {this.state.modal_value.last_name}
                          </p>
                        </div>
                      </div>
                      <div className="row border-bottom mb-2">
                        <div className="col-md-6 border-right">
                          <strong>Email</strong>
                        </div>
                        <div className="col-md-6">
                          <p class="card-text">
                            {this.state.modal_value.email}
                          </p>
                        </div>
                      </div>
                      <div className="row border-bottom mb-2">
                        <div className="col-md-6 border-right">
                          <strong>Price</strong>
                        </div>
                        <div className="col-md-6">
                          <p class="card-text">
                            $ {this.state.modal_value.price}
                          </p>
                        </div>
                      </div>
                      <div className="row border-bottom mb-2">
                        <div className="col-md-6 border-right">
                          <strong>Start At</strong>
                        </div>
                        <div className="col-md-6">
                          <p class="card-text">
                            {moment(this.state.modal_value.start_at).format('YYYY-MM-DD hh:mm A')}
                          </p>
                        </div>
                      </div>
                      <div className="row border-bottom mb-2">
                        <div className="col-md-6 border-right">
                          <strong>Expired At</strong>
                        </div>
                        <div className="col-md-6">
                          <p class="card-text">
                            {moment(this.state.modal_value.expired_at).format('YYYY-MM-DD hh:mm A')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
            </ModalBody>
            <ModalFooter />
          </Modal>
        )}
      </div>
    );
  }

  render() {
    const { enrolled_users } = this.state;
    return (
      <div className="container datatable">
        {this.state.alert_message && (
          <div className={"text-center alert alert-" + this.state.alert_message.class}>
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
