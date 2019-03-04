// Module.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getModuleByCourseId } from "../../actions/course";

let route_name;

class Module extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      module: null
    };
  }

  nextModule(){
    var index = this.state.current_count;
    var modules = this.state.modules;
    this.setState({ current_count: index+1,module: modules[index+1] });
  }
  backModule(){
    var index = this.state.current_count;
    var modules = this.state.modules;
    this.setState({ current_count: index-1,module: modules[index-1] });
  }

  componentWillMount() {
    const courseId = this.props.match.params.courseId;
    this.props
      .getModuleByCourseId(courseId, this.props.history)
      .then(response => {
        this.setState({ current_count: 0,module_count: response.length,modules: response,module: response[0] });
      });
  }

  renderContent() {
    const { module,module_count,current_count } = this.state;
    return (
      <div className="text-center module_content">
        <h2 className="h4 text-gray-900 mb-4">
          {module.name}
        </h2>
        <div className="content_des" dangerouslySetInnerHTML={{ __html: module.content }} />
        <div className="nxt_btn"><Link to={"/account/quiz/"+module._id} className="btn btn-primary">Play Quiz</Link></div>
        <div className="btn_profile">
            {current_count != 0 && current_count < module_count &&
              <a onClick={() => this.backModule()} href="#" className="btn btn-primary">❮ Back</a>
            }
            {current_count+1 < module_count &&
            <a href="#" className="btn btn-primary pull-right" onClick={() => this.nextModule()}>Next ❯</a>
            }
        </div>
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
  { getModuleByCourseId }
)(withRouter(Module));
