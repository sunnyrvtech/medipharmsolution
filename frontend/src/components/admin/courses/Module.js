// Module.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getModules,deleteModule } from "../../../actions/admin/module";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

let route_name;

class Module extends Component {

  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
   route_name= props.match.path
  }

  onDelete(cell) {
    this.props.deleteModule(cell, this.props.history)
    .then(response => {
      if (response) {
        this.setState({ alert_message: {class:'success',message: 'Deleted successfully!'}});
        setTimeout(function(){
            this.setState({alert_message:false});
        }.bind(this),5000);
        this.props.getModules()
        .then(response => {
          this.setState({ courses_modules: response});
        });
      }
    });
}
  componentWillMount() {
      window.scrollTo(0, 0);
    //if(this.props.courses.length == undefined)
      this.props.getModules()
      .then(response => {
        this.setState({ courses_modules: response});
      });
      if(this.props.location.state){
        if(this.props.location.state.alert_message){
            this.setState({
              alert_message: this.props.location.state.alert_message
            });
            setTimeout(function(){
                this.setState({alert_message:false});
            }.bind(this),5000);
            this.props.history.replace({ state: null });
          }
      }
  }
ActionButton(cell, row) {
    return (
      <div>
      <Link to={`${route_name+'/'+cell}`} className="btn btn-info btn-circle" title="update"><i className="fa fa-pencil-square-o"></i></Link>{' '}
      <a onClick={() => this.onDelete(cell)} className="btn btn-danger btn-circle" title="delete"><i className="fa fa-trash"></i></a>
      </div>
    );
  }
  QuizeButton(cell, row) {
      return (
        <Link to={`${route_name+'/'+cell+'/'+'quiz'}`} className="btn btn-info btn-circle" title="view quiz"><i className="fa fa fa-low-vision"></i></Link>

      );
    }
  createCustomInsertButton = (onClick) => {
    return (
      <div>
        <Link to={`${route_name}/add`} className="btn btn-info">Add New</Link>
      </div>
    );
  }
  rendertable(courses_modules)
  {


    const options = {
      clearSearch: true,
      defaultSortName: 'id',
      defaultSortOrder: 'asc',
      insertBtn: this.createCustomInsertButton,
      sizePerPage: 10,
      paginationSize: 6
    };
    return (
      <div>
        <BootstrapTable data={courses_modules} version='4' search={ true } options={ options } insertRow pagination>
        <TableHeaderColumn width='60' isKey dataSort dataField='id'>ID</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField='course_name'>Course</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField='name'>Module</TableHeaderColumn>
        <TableHeaderColumn dataField='_id' dataFormat={ this.QuizeButton.bind(this) }>View Quiz</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='_id' dataFormat={ this.ActionButton.bind(this) }>Action</TableHeaderColumn>
        </BootstrapTable>
    </div>
    );
  }


  render() {
    const { courses_modules }= this.state;
    return (
      <div className="container datatable">
      {this.state.alert_message  && (
        <div class={'alert alert-'+this.state.alert_message.class}>
           {this.state.alert_message.message}
        </div>
      )}
        {courses_modules !=undefined  &&
         this.rendertable(courses_modules)
        }
      </div>
    );
  }
}


export default connect(
  null,
  { getModules,deleteModule }
)(withRouter(Module));
