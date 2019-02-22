// Course.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseByCategory } from "../../actions/course";
import PageNotFound from "../PageNotFound";

let route_name;

class Course extends Component {
  constructor(props) {
    super();
    route_name = props.match.path;
    this.state = {
      courses: null
    };
  }

  componentWillMount() {
    var slug = this.props.match.params.slug;
    this.props.getCourseByCategory(slug, this.props.history).then(response => {
      console.log(response);
      this.setState({ courses: response });
    });
  }

  renderHomeContent() {
    return (
      <main>
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
        <section class="gray-box pad-70-tb">
          <div class="container">
            <div class="row">
              <div class="col-md-6 col-lg-4">
                <div class="plp-wrapper">
                  <div class="cta-holder">
                    <figure>
                      <img src="/images/bachelor-clinical-research-banner.jpg" />
                    </figure>
                    <div class="cta">
                      <span>
                        <a href="#" class="btn btn-ghost btn-white">
                          Learn More
                        </a>
                      </span>
                    </div>
                  </div>
                  <div class="content-holder">
                    <h3>
                      <a href="#">
                        Associate to Bachelor of Science in Clinical Research
                        (BSCR)
                      </a>
                    </h3>
                    <p>
                      This program- one of its only kinds in the market today -
                      is aimed at helping Associate Degree holders in certain
                      biological science areas to earn a Bachelor of Science
                      degree in a short span of 1-1/2 to 2 years. Students will
                      complete conceptual and theoretical understanding of
                      entire drug development process through extensive,
                      practical sessions on systems and tools, as well as a
                      semester-long internship.
                    </p>
                    <span class="period">Approximately 18-24 months</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="plp-wrapper">
                  <div class="cta-holder">
                    <figure>
                      <img src="/images/bachelor-clinical-research-banner.jpg" />
                    </figure>
                    <div class="cta">
                      <span>
                        <a href="#" class="btn btn-ghost btn-white">
                          Learn More
                        </a>
                      </span>
                    </div>
                  </div>
                  <div class="content-holder">
                    <h3>
                      <a href="#">
                        Associate to Bachelor of Science in Clinical Research
                        (BSCR)
                      </a>
                    </h3>
                    <p>
                      This program- one of its only kinds in the market today -
                      is aimed at helping Associate Degree holders in certain
                      biological science areas to earn a Bachelor of Science
                      degree in a short span of 1-1/2 to 2 years. Students will
                      complete conceptual and theoretical understanding of
                      entire drug development process through extensive,
                      practical sessions on systems and tools, as well as a
                      semester-long internship.
                    </p>
                    <span class="period">Approximately 18-24 months</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="plp-wrapper">
                  <div class="cta-holder">
                    <figure>
                      <img src="/images/bachelor-clinical-research-banner.jpg" />
                    </figure>
                    <div class="cta">
                      <span>
                        <a href="#" class="btn btn-ghost btn-white">
                          Learn More
                        </a>
                      </span>
                    </div>
                  </div>
                  <div class="content-holder">
                    <h3>
                      <a href="#">
                        Associate to Bachelor of Science in Clinical Research
                        (BSCR)
                      </a>
                    </h3>
                    <p>
                      This program- one of its only kinds in the market today -
                      is aimed at helping Associate Degree holders in certain
                      biological science areas to earn a Bachelor of Science
                      degree in a short span of 1-1/2 to 2 years. Students will
                      complete conceptual and theoretical understanding of
                      entire drug development process through extensive,
                      practical sessions on systems and tools, as well as a
                      semester-long internship.
                    </p>
                    <span class="period">Approximately 18-24 months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  render() {
    const { courses } = this.state;
    return (
      <div>
        {courses && courses.length != 0 ? (
          this.renderHomeContent()
        ) : (
          <PageNotFound />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { getCourseByCategory }
)(withRouter(Course));
