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
/*    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener("keydown", function(event){
      if(event.code == "F12"){
        event.preventDefault();
      }
    });*/
  }
  componentWillMount() {
    const moduleId = this.props.match.params.moduleId;
    this.props
      .getModuleByModuleId(moduleId, this.props.history)
      .then(response => {
        console.log(response);
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

         <div className="row no-gutters">
          {module.video && module.video.map((video, idx) => (
            <div key={idx} className={(module.video.length==1 || (module.video.length-1 ==idx && idx % 2 == 0)) ?"col-md-12 pr-2":"col-md-6 pr-2"}>
            <div key={idx} dangerouslySetInnerHTML={{__html: video.content}} />
            </div>
          ))}
         </div>

        <div className="nxt_btn"><Link to={"/account/modules/"+module.course_id} className="btn btn-primary">Back Module Listing</Link>{" "}<Link to={"/account/quiz/"+module._id} className="btn btn-primary">Play Quiz</Link></div>
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
