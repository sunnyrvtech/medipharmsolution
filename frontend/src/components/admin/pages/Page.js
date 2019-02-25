// Page.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getstaticPages } from "../../../actions/admin/StaticPage";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

let route_name;

class Page extends Component {

  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
  route_name= props.match.url
  }

  componentWillMount() {
      window.scrollTo(0, 0);
      this.props.getstaticPages()
      .then(response => {
        this.setState({ pages: response});
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
      <Link to={`${route_name+'/'+cell}`} className="btn btn-info btn-circle" tooltip="update"><i className="fa fa-pencil-square-o"></i></Link>
      </div>
    );
  }
  rendertable(pages)
  {
    const options = {
      clearSearch: true,
      defaultSortName: 'id',
      defaultSortOrder: 'asc',
      sizePerPage: 10,
      paginationSize: 6
    };
    return (
      <div>
        <BootstrapTable data={pages} version='4' search={ true } options={ options } pagination>
        <TableHeaderColumn width='60' isKey dataSort dataField='id'>ID</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField='name'>Name</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='_id' dataFormat={ this.ActionButton.bind(this) }>Action</TableHeaderColumn>
        </BootstrapTable>
    </div>
    );
  }


  render() {
    const { pages }= this.state;
    return (
      <div className="container datatable">
      {this.state.alert_message  && (
        <div className={'alert alert-'+this.state.alert_message.class}>
           {this.state.alert_message.message}
        </div>
      )}
        {pages !=undefined  &&
         this.rendertable(pages)
        }
      </div>
    );
  }
}


export default connect(
  null,
  { getstaticPages }
)(withRouter(Page));
