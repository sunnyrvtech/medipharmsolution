// Media.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getGalleries,uploadImage } from "../../../actions/admin/media";
// https://dzone.com/articles/react-image-upload-how-its-done
// https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c
// https://stackoverflow.com/questions/51558271/getting-all-the-file-names-in-a-specific-directory-using-javascript
let route_name;

class Media extends Component {
  constructor(props) {
    super();
    this.state = {
      alert_message: null
    };
  route_name= props.match.url
  }
  componentWillMount() {
      window.scrollTo(0, 0);
      this.props.getGalleries()
      .then(response => {
        this.setState({ images: response});
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

  render() {

    return (
      <div className="container datatable">
      {this.state.alert_message  && (
        <div class={'alert alert-'+this.state.alert_message.class}>
           {this.state.alert_message.message}
        </div>
      )}
      </div>
    );
  }
}


export default connect(
  null,
  { getGalleries,uploadImage }
)(withRouter(Media));
