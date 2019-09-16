// Enrollment.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getEnrollmentRequest, deleteEnrollemntRequest } from "../../../actions/admin/enrollment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConfirmModal from "../ConfirmModal";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

let route_name;

class Enrollment extends Component {
  constructor(props) {
    super();
    this.state = {
      modal: false,
      confirmModal: false,
      modal_value: null,
      alert_message: null
    };
    route_name = props.match.path;
    this.open_model = this.open_model.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  open_model(row) {
    this.setState({
      modal_value: row,
      modal: !this.state.modal
    });
  }
  openModal(cell,index) {
    this.setState({
      delId:  cell,
      delIndex:  index,
      confirmModal: !this.state.confirmModal
    });
  }

  onDelete() {
    var index = this.state.delIndex;
    this.props.deleteEnrollemntRequest(this.state.delId, this.props.history).then(response => {
      if (response) {
        window.scrollTo(0, 0);
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
          confirmModal: false,
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
      <Link
        to={`${"/admin/enrolled/users/add/" + cell}`}
        className="btn btn-info btn-circle"
        tooltip="Enroll User"
      >
        <i className="fa fa-plus" />
      </Link>{" "}
      <a
        onClick={() => this.open_model(row)}
        className="btn btn-info btn-circle"
        tooltip="View Details"
      >
        <i className="fa fa-low-vision" />
      </a>{" "}
        <a
          onClick={() => this.openModal(cell, row.id - 1)}
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
          <TableHeaderColumn dataSort dataField="email">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="phone_number">
            Phone Number
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="created_at">
            Created At
          </TableHeaderColumn>
          <TableHeaderColumn
            width="150"
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
                <h4 className="modal-title">Enrollment Details</h4>
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
                          <strong>Phone Number</strong>
                        </div>
                        <div className="col-md-6">
                          <p class="card-text">
                            {this.state.modal_value.phone_number}
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
    const { enrollments } = this.state;
    return (
      <div className="container datatable">
        {this.state.confirmModal &&
        <ConfirmModal parentConfirmMethod={this.onDelete} parentCloseMethod={this.openModal} />
        }
        {this.state.alert_message && (
          <div className={"text-center alert alert-" + this.state.alert_message.class}>
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
