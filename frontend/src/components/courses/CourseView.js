// CourseView.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseByCourseSlug } from "../../actions/course";
import PageNotFound from "../PageNotFound";

let route_name;

const chunk = (target, size) => {
  var out = [],
    i = 0,
    n = Math.ceil(target.length / size);
  while (i < n) {
    out.push(
      target.splice(
        0,
        i == n - 1 && size < target.length ? target.length : size
      )
    );
    i++;
  }
  return out;
};

class CourseView extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      course: {}
    };
  }

  componentWillMount() {
    var courseSlug = this.props.match.params.courseSlug;
    this.props
      .getCourseByCourseSlug(courseSlug, this.props.history)
      .then(response => {
        this.setState({
          IMAGE_COURSE_URL: response.IMAGE_COURSE_URL,
          course: response.course
        });
      });
  }
  renderContent(course) {
    var course_modules = chunk(course[0].course_modules, 3);
    var course_banner = this.state.IMAGE_COURSE_URL + course[0].banner;
    return (
      <main>
        <section
          className="hero-banner"
          style={{ backgroundImage: "url(" + course_banner + ")" }}
        >
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
                  <h2>{course[0].name}</h2>
                </div>
                <div
                  className="content_des"
                  dangerouslySetInnerHTML={{ __html: course[0].description }}
                />
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
                {course_modules.length != 0 ?
                  course_modules.map((module, i) => {
                    return (
                      <div className="col-md-4" key={i}>
                        <div className="list_inner">
                          <ul>
                            {module.map((value, k) => {
                              return <li key={k}>{value.name}</li>;
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  })
                  :
                  <span>No Syllabus found!</span>
                }
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <a href="#" className="btn btn-ghost btn-black-bg">
                  Get Syllabus
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
        {course &&
          course.length != 0 &&
          course.length != undefined &&
          this.renderContent(course)}
        {course.length == 0 && <PageNotFound />}
      </div>
    );
  }
}

export default connect(
  null,
  { getCourseByCourseSlug }
)(withRouter(CourseView));
