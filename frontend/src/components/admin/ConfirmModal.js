// ConfirmModal.js

import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

let route_name;

export default class ConfirmModal extends Component {

  constructor() {
    super();
    this.closeModel = this.closeModel.bind(this);
    this.confirmModal = this.confirmModal.bind(this);
  }

  closeModel() {
    this.props.parentCloseMethod();
  }
  confirmModal() {
    this.props.parentConfirmMethod();
  }
  render() {
    return (
      <Modal isOpen className="">
        <div className="modal-header">
          <div className="text-center">
            <p className="modal-title">Are you sure,you want to delete this record ? </p>
          </div>
          <button type="button" className="close" onClick={this.closeModel}>
            &times;
          </button>
        </div>
        <ModalFooter>
        <a href="javascript:void(0);" onClick={this.confirmModal} className="btn btn-info">Yes</a>
        <a href="javascript:void(0);" className="btn btn-info" onClick={this.closeModel}>No</a>
        </ModalFooter>
      </Modal>
    );
  }
}
