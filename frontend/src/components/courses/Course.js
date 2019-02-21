// Course.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseByCategory } from "../../actions/course";

let route_name;

class Course extends Component {
  constructor(props) {
    super();
    route_name = props.match.path;
  }

  componentWillMount() {
    var slug = this.props.match.params.slug;
    this.props.getCourseByCategory(slug,this.props.history)
    .then(response => {
      this.setState({ courses: response});
    });
  }

  render() {
    const { courses } = this.props;
    return (
      <div>
        <section class="hero-banner">
          <div class="container">
            <div class="modal-wrap">
              <div class="modal-table">
                <div class="modal-cell">
                  <div class="homebanner-info">
                    <h2>
                      Step into
                      <br />a world of
                      <br />
                      opportunities!
                    </h2>
                    <a href="#" class="btn">
                      Learn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="content-gray-wpr pad-70-tb">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="title">
                  <h2>
                    <span>Listen to </span> Your future{" "}
                  </h2>
                </div>
                <div class="content_des">
                  <p>
                    The Graduate Certificate in Clinical Trial Management is a
                    unique, hybrid program that provides and prepares students
                    for the entire spectrum of the clinical trials management
                    processes as applicable to the pharmaceutical and biotech
                    industries.
                  </p>
                  <p>
                    You will learn about the specialty areas of GCP and ICH
                    regulations of human research protection, and development of
                    complete regulatory activities involved in planning,
                    organising, monitoring, recording, analysis and reporting of
                    clinical trials in humans. The program provides additional
                    opportunities to learn about recent advancements as well as
                    specialisations in e-Clinical Technology.
                  </p>
                  <p>
                    With many clinical research training options available in
                    the market today, what distinguishes this program is the
                    unique, 20-week internship module, that will allow you to
                    gain experience through hands-on tools used by the industry
                    today, such as Clinical Trial Management System (CTMS),
                    Electronic Data Capture Management (EDC) System, and
                    Electronic Trial Master File Management (eTMF) System. In
                    real world, you will require to be proficient in using these
                    systems to successfully manage the myriad of functions in
                    clinical trial management.
                  </p>
                  <p>
                    You will use the CTM system to prioritise site management
                    activities, update site staff information, document site
                    visits, generate visit tasks/reports, regulatory approval
                    and investigation payment. The EDC systems are used to enter
                    and verify the Case Report Forms (CRF), raise/answer queries
                    and generate EDC reports. You will learn to use Trial Master
                    File (TMF) to upload/index documents, use naming conventions
                    and electronically sign the documents before submitting. You
                    will work with document place holders, signature work flows,
                    TMF metrics to successfully perform Site Master File/Trial
                    Master File reconciliation.
                  </p>
                  <p>
                    You will work on real time case scenarios, clinical tasks
                    and other site management activities under the guidance
                    industry experts to fully equip you with the hard skills
                    required for a career in clinical research. No other
                    training program prepares you in such a comprehensive way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="list_sec pad-70-tb">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="title">
                  <h2>
                    <span>Listen to </span> Your future{" "}
                  </h2>
                </div>
              </div>
            </div>
            <div class="list_cols">
              <div class="row">
                <div class="col-md-4">
                  <div class="list_inner">
                    <ul>
                      <div class="syllabus-heading">Module 1</div>
                      <li>Phases of the Clinical Trial</li>
                      <li>ICH-GCP Guidelines</li>
                      <li>Study Feasibility/Site Selection</li>
                      <li>Investigator Brochure</li>
                      <li>Informed Consent Process</li>
                      <li>
                        Monitoring- General introduction to all the types of
                        visits
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="list_inner">
                    <ul>
                      <div class="syllabus-heading">Module 1</div>
                      <li>Phases of the Clinical Trial</li>
                      <li>ICH-GCP Guidelines</li>
                      <li>Study Feasibility/Site Selection</li>
                      <li>Investigator Brochure</li>
                      <li>Informed Consent Process</li>
                      <li>
                        Monitoring- General introduction to all the types of
                        visits
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="list_inner">
                    <ul>
                      <div class="syllabus-heading">Module 1</div>
                      <li>Phases of the Clinical Trial</li>
                      <li>ICH-GCP Guidelines</li>
                      <li>Study Feasibility/Site Selection</li>
                      <li>Investigator Brochure</li>
                      <li>Informed Consent Process</li>
                      <li>
                        Monitoring- General introduction to all the types of
                        visits
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <a href="#" class="btn btn-ghost btn-black-bg">
                  About Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  { getCourseByCategory }
)(withRouter(Course));
