// Profile.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { updateUserInfo } from "../../actions/user";
import classnames from "classnames";

let route_name;

class Profile extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      first_name: "",
      last_name: "",
      phone_number: "",
      user_image: "",
      alert_message: null,
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    window.scrollTo(0, 0);
    e.preventDefault();
    const user = new FormData();
    user.append("first_name", this.state.first_name);
    user.append("last_name", this.state.last_name);
    user.append("phone_number", this.state.phone_number);
    user.append("user_image", this.state.user_image);
    this.props.updateUserInfo(user, this.props.history)
        .then(response => {
          if(response){
          this.setState({ alert_message: {class:'success',message: 'Updated successfully!'}});
          setTimeout(function(){
              this.setState({alert_message:false});
          }.bind(this),5000);
        }
        });
  }
  onChange(e) {
    e.preventDefault();
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
      var output = document.getElementById("output");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      user_image: file
    });
  }

  componentWillMount() {
    this.setState({ first_name: this.props.auth.user.first_name,last_name: this.props.auth.user.last_name,phone_number: this.props.auth.user.phone_number,user_image: this.props.auth.user.user_image});
  }

  render() {
    const { errors } = this.props;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
            {this.state.alert_message  && (
              <div className={'text-center alert alert-'+this.state.alert_message.class}>
                 {this.state.alert_message.message}
              </div>
            )}
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Profile Update</h1>
                </div>
                <form className="user" onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="First Name"
                        className={classnames(
                          "form-control form-control-user",
                          {
                            "is-invalid": errors.first_name
                          }
                        )}
                        name="first_name"
                        onChange={this.handleInputChange}
                        value={this.state.first_name}
                      />
                      {errors.first_name && (
                        <div className="invalid-feedback">
                          {errors.first_name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="Last Name"
                        className={classnames(
                          "form-control form-control-user",
                          {
                            "is-invalid": errors.last_name
                          }
                        )}
                        name="last_name"
                        onChange={this.handleInputChange}
                        value={this.state.last_name}
                      />
                      {errors.last_name && (
                        <div className="invalid-feedback">
                          {errors.last_name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        className={classnames(
                          "form-control form-control-user",
                          {
                            "is-invalid": errors.phone_number
                          }
                        )}
                        name="phone_number"
                        onChange={this.handleInputChange}
                        value={this.state.phone_number}
                      />
                      {errors.phone_number && (
                        <div className="invalid-feedback">
                          {errors.phone_number}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input type="file" className="form-control form-control-user" name="user_image" onChange={this.onChange.bind(this)}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <img style={{ width: '200px',height: '200px'}} id="output" src={this.state.user_image}/>
                  </div>
                  <input
                    className="btn btn-user btn-block"
                    type="submit"
                    value="Profile update"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateUserInfo }
)(withRouter(Profile));
