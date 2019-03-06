// Module.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getModuleByModuleId } from "../../actions/module";

let route_name;

class Module extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      module: null
    };
  }
  componentWillMount() {
    const moduleId = this.props.match.params.moduleId;
    this.props
      .getModuleByModuleId(moduleId, this.props.history)
      .then(response => {
        this.setState({ module: response });
      });
  }

  renderContent() {
    const { module } = this.state;
    return (
      <div className="text-center module_content">
        <h2 className="h4 text-gray-900 mb-4">
          {module.name}
        </h2>
        <div className="content_des" dangerouslySetInnerHTML={{ __html: module.content }} />
        <div className="nxt_btn"><Link to={"/account/quiz/"+module._id} className="btn btn-primary">Play Quiz</Link></div>
      </div>
    );
  }

  render() {
    const { module } = this.state;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
              {module ?
                this.renderContent()
                :
                <span>No module found!</span>
              }
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getModuleByModuleId }
)(withRouter(Module));
