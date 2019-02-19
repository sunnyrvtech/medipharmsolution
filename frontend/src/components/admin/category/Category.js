// Category.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCategories,deleteCategory } from "../../../actions/admin/category";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

let route_name;

class Category extends Component {

  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
  route_name= props.match.url
  }

  onDelete(cell) {
    this.props.deleteCategory(cell, this.props.history)
    .then(response => {
      if (response) {
        this.setState({ alert_message: {class:'success',message: 'Deleted successfully!'}});
        setTimeout(function(){
            this.setState({alert_message:false});
        }.bind(this),5000);
        this.props.getCategories()
        .then(response => {
          this.setState({ categories: response});
        });
      }
    });
}
  componentWillMount() {
      window.scrollTo(0, 0);
      this.props.getCategories()
      .then(response => {
        this.setState({ categories: response});
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
  createCustomInsertButton = (onClick) => {
    return (
      <div>
        <Link to={`${route_name}/add`} className="btn btn-info">Add New</Link>
      </div>
    );
  }
  rendertable(categories)
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
        <BootstrapTable data={categories} version='4' search={ true } options={ options } insertRow pagination>
        <TableHeaderColumn width='60' isKey dataSort dataField='id'>ID</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField='name'>Name</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='_id' dataFormat={ this.ActionButton.bind(this) }>Action</TableHeaderColumn>
        </BootstrapTable>
    </div>
    );
  }


  render() {
    const { categories }= this.state;
    return (
      <div className="container datatable">
      {this.state.alert_message  && (
        <div class={'alert alert-'+this.state.alert_message.class}>
           {this.state.alert_message.message}
        </div>
      )}
        {categories !=undefined  &&
         this.rendertable(categories)
        }
      </div>
    );
  }
}


export default connect(
  null,
  { getCategories,deleteCategory }
)(withRouter(Category));