// CourseView.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseByCourseSlug, courseEnrolled } from "../../actions/course";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classnames from "classnames";
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
      modal: false,
      course: null,
      course_modules: null,
      page_not_found: false,
      errors: {}
    };
    this.apply_now = this.apply_now.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const enrollment = {
  //     course_id: this.state.course._id,
  //     course_name: this.state.course.name
  //   };
  //   this.props.courseEnrolled(enrollment, this.props.history);
  // }

  apply_now(e) {
    // this.setState({
    //   modal: !this.state.modal
    // });
    e.preventDefault();
    const enrollment = {
      course_id: this.state.course._id,
      course_name: this.state.course.name
    };
    this.props.courseEnrolled(enrollment, this.props.history);
  }

  componentWillMount() {
    var courseSlug = this.props.match.params.courseSlug;
    this.props
      .getCourseByCourseSlug(courseSlug, this.props.history)
      .then(response => {
        if (response.course.length) {
          var course_modules = chunk(response.course[0].course_modules, 3);
          this.setState({
            IMAGE_COURSE_URL: response.IMAGE_COURSE_URL,
            course: response.course[0],
            course_modules: course_modules
          });
        }else{
          this.setState({ page_not_found: true });
        }
      });
  }
  renderContent(course) {
    const { errors } = this.props;
    var course_modules = this.state.course_modules;
    var course_banner = this.state.IMAGE_COURSE_URL + "default.jpg";
    if (course.banner)
      course_banner = this.state.IMAGE_COURSE_URL + course.banner;
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
                    <h2>{course.name}</h2>
                    {this.props.auth.isAuthenticated ? (
                      <a
                        href="javascript:void(0);"
                        onClick={this.apply_now}
                        className="btn"
                      >
                        Apply Now
                      </a>
                    ) : (
                      <Link
                        to={{
                          pathname: "/login",
                          state: { route: route_name }
                        }}
                        className="btn"
                      >
                        Apply Now
                      </Link>
                    )}
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
                  <h2>{course.name}</h2>
                </div>
                <div
                  className="content_des"
                  dangerouslySetInnerHTML={{ __html: course.description }}
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
                {course_modules ? (
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
                ) : (
                  <span>No Syllabus found!</span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                {this.props.auth.isAuthenticated ? (
                  <a
                    href="javascript:void(0);"
                    onClick={this.apply_now}
                    className="btn btn-ghost btn-black-bg"
                  >
                    Apply Now
                  </a>
                ) : (
                  <Link
                    to={{ pathname: "/login", state: { route: route_name } }}
                    className="btn btn-ghost btn-black-bg"
                  >
                    Apply Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        {/*<Modal isOpen={this.state.modal} className="">
          <form onSubmit={this.handleSubmit}>
            <div className="modal-header">
              <div className="">
                <h5>Are you Sure ?</h5>
              </div>
              <button type="button" className="close" onClick={this.apply_now}>
                &times;
              </button>
            </div>
            <ModalBody>
            <div className="text-center">
              <span>
                we will confirm the receipt of your application immediately. We
                will confirm your place within 10 working days.If you have not
                heard from us within this time, please contact us at
                admin@medipharmsolutions.com
              </span>
            </div>
            </ModalBody>
            <ModalFooter>
              <input className="btn btn-primary" type="submit" value="Yes" />
              <button className="btn btn-primary" type="button" onClick={this.apply_now}>No</button>
            </ModalFooter>
          </form>
        </Modal>*/}
      </main>
    );
  }

  render() {
    const { course,page_not_found } = this.state;
    return (
      <div>
        {course && this.renderContent(course)}
        {page_not_found &&
          <PageNotFound />
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getCourseByCourseSlug, courseEnrolled }
)(withRouter(CourseView));
