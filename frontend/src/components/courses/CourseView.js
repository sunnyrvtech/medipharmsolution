// CourseView.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseByCourseSlug } from "../../actions/course";
import PageNotFound from "../PageNotFound";


let route_name;

class CourseView extends Component {
  constructor(props) {
    super();
    route_name = props.match.path;
    this.state = {
      course: null
    };
  }

  componentWillMount() {
    var courseSlug = this.props.match.params.courseSlug;
    this.props.getCourseByCourseSlug(courseSlug, this.props.history).then(response => {
      this.setState({ IMAGE_COURSE_URL:response.IMAGE_COURSE_URL,course: response.course });
    });
  }

  renderHomeContent(course){
      var course_banner = this.state.IMAGE_COURSE_URL+course[0].banner;
        return (
          <main>
            <section className="hero-banner" style={{ backgroundImage: "url("+course_banner+")"}}>
              <div className="container">
                <div className="modal-wrap">
                  <div className="modal-table">
                    <div className="modal-cell">
                      <div className="homebanner-info">
                        <h2>{course[0].name}</h2>
                        <a href="#" className="btn">
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="content-gray-wpr pad-70-tb">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="title">
                      <h2>
                        {course[0].name}
                      </h2>
                    </div>
                    <div className="content_des" dangerouslySetInnerHTML={{__html: course[0].description}} />
                  </div>
                </div>
              </div>
            </section>
            <section className="list_sec pad-70-tb">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="title">
                      <h2>
                        <span>Syllabus</span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="list_cols">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="list_inner">
                        <ul>
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
                    <div className="col-md-4">
                      <div className="list_inner">
                        <ul>
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
                    <div className="col-md-4">
                      <div className="list_inner">
                        <ul>
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
                <div className="row">
                  <div className="col-sm-12">
                    <a href="#" className="btn btn-ghost btn-black-bg">
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>
        );
  }

  render() {
    const { course } = this.state;
    return (
      <div>
      { course && course.length !=0
        ?  this.renderHomeContent(course)
        : <PageNotFound />
      }
      </div>
    );
  }
}

export default connect(
  null,
  { getCourseByCourseSlug }
)(withRouter(CourseView));
