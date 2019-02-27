// Module.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageNotFound from "../PageNotFound";
import classnames from "classnames";

let route_name;

class Module extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      courses: {},
      errors: {}
    };
  }

  componentWillMount() {

  }


  render() {
    const { errors } = this.state;
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
                <div className="text-center module_content">
                  <h2 className="h4 text-gray-900 mb-4">
                    Module Deatils
                  </h2>
                  <div className="content_des">
                      <p>The Graduate Certificate in Clinical Trial Management is a unique, hybrid program that provides and prepares students for the entire spectrum of the clinical trials management processes as applicable to the pharmaceutical and biotech industries.</p>
                      <p>You will learn about  the specialty areas of GCP and ICH regulations of human research protection, and development of complete regulatory activities involved in planning, organising, monitoring, recording, analysis and reporting of clinical trials in humans. The program provides additional opportunities to learn about recent advancements as well as specialisations in e-Clinical Technology.</p>
                      <p>With many clinical research training options available in the market today, what distinguishes this program is the unique, 20-week internship module, that will allow you to gain experience through hands-on tools used by the industry today, such as Clinical Trial Management System (CTMS), Electronic Data Capture Management (EDC) System, and Electronic Trial Master File Management  (eTMF) System. In real world, you will require to be proficient in using these systems to successfully manage the myriad of functions in clinical trial management.</p>
                      <p>You will use the CTM system to prioritise site management activities, update site staff information, document site visits, generate visit tasks/reports, regulatory approval and investigation payment. The EDC systems are used to enter and verify the Case Report Forms (CRF), raise/answer queries and generate EDC reports. You will learn to use Trial Master File (TMF) to upload/index documents, use naming conventions and electronically sign the documents before submitting. You will work with document place holders, signature work flows, TMF metrics to successfully perform Site Master File/Trial Master File reconciliation.</p>
                      <p>You will work on real time case scenarios, clinical tasks and other site management activities under the guidance industry experts to fully equip you with the hard skills required for a career in clinical research. No other training program prepares you in such a comprehensive way.</p>
                  </div>
                  <div className="nxt_btn"><a href="#" class="btn btn-primary">Next</a></div>
                  <div className="btn_profile">
                      <a href="#" className="btn btn-primary">Quiz</a>
                      <a href="#" className="btn btn-primary pull-right">Next</a>
                  </div>
                </div>

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
  {  }
)(withRouter(Module));
