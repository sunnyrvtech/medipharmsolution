// Course.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourses, courseDelete } from "../../../actions/admin/course";
import ConfirmModal from "../ConfirmModal";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

let route_name;

class Course extends Component {
  constructor(props) {
    super();
    this.state = {
      modal: false,
      alert_message: null
    };
    route_name = props.match.path;
    this.onDelete = this.onDelete.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  openModal(cell,index) {
    this.setState({
      delId:  cell,
      delIndex:  index,
      modal: !this.state.modal
    });
  }

  onDelete() {
    var index = this.state.delIndex;
    this.props.courseDelete(this.state.delId, this.props.history).then(response => {
      if (response) {
        window.scrollTo(0, 0);
        var courses = this.state.courses;
        delete courses[index];
        courses = courses.filter(function(obj) {
          if (obj.id > index) {
            return (obj.id = obj.id - 1);
          }
          return true;
        });
        this.setState({
          modal: false,
          courses: courses,
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
    this.props.getCourses();
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.courses) {
      this.setState({
        courses: nextProps.courses
      });
    }
  }
  ActionButton(cell, row) {
    return (
      <div>
        <Link
          to={`${route_name + "/" + cell + "/" + "module"}`}
          className="btn btn-info btn-circle"
          tooltip="view modules"
        >
          <i className="fa fa-low-vision" />
        </Link>{" "}
        <a
          href={`${route_name + "/" + cell}`}
          className="btn btn-info btn-circle"
          tooltip="update"
        >
          <i className="fa fa-pencil-square-o" />
        </a>{" "}
        <a
          onClick={() => this.openModal(cell,row.id-1)}
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
  rendertable(courses) {
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
          data={courses}
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
            Course
          </TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="category_name">
            Category
          </TableHeaderColumn>
          <TableHeaderColumn
            width="150"
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
        {this.state.modal &&
        <ConfirmModal parentConfirmMethod={this.onDelete} parentCloseMethod={this.openModal} />
        }
        {this.state.alert_message  && (
          <div className={'text-center alert alert-'+this.state.alert_message.class}>
             {this.state.alert_message.message}
          </div>
        )}
        {courses != undefined && this.rendertable(courses)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses: state.courses.courses
  };
}

export default connect(
  mapStateToProps,
  { getCourses, courseDelete }
)(withRouter(Course));
