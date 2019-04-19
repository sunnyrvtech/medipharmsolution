// SettingList.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getSettings } from "../../../actions/admin/setting";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

let route_name;

class SettingList extends Component {

  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
    route_name= props.match.url
  }

  componentWillMount() {
      window.scrollTo(0, 0);
      this.props.getSettings()
      .then(response => {
        this.setState({ settings: response});
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
  rendertable(settings)
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
        <BootstrapTable data={settings} version='4' search={ true } options={ options } pagination>
        <TableHeaderColumn width='60' isKey dataSort dataField='id'>ID</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField='name'>Name</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField='updated_at'>Updated At</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='name' dataFormat={ this.ActionButton.bind(this) }>Action</TableHeaderColumn>
        </BootstrapTable>
    </div>
    );
  }


  render() {
    const { settings }= this.state;
    return (
      <div className="container datatable">
      {this.state.alert_message  && (
        <div className={'alert alert-'+this.state.alert_message.class}>
           {this.state.alert_message.message}
        </div>
      )}
        {settings !=undefined  &&
         this.rendertable(settings)
        }
      </div>
    );
  }
}


export default connect(
  null,
  { getSettings }
)(withRouter(SettingList));
