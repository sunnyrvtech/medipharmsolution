// Certificate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { getCertificateByCourseId } from "../../actions/course";
import jsPDF from "jspdf";
import Sidebar from "./Sidebar";

let route_name;

class Certificate extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      course: null
    };
  }

  print(quality = 1) {
    const filename = "certificate.pdf";
    html2canvas(document.querySelector("#certificate"), {
      scale: quality
    }).then(canvas => {
      let pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 200, 250);
      pdf.save(filename);
    });
  }

  componentWillMount() {
    this.props
      .getCertificateByCourseId(this.props.match.params.courseId, this.props.history)
      .then(response => {
        this.setState({ courses: response });
      });
  }

  renderContent() {
    return (
      <div>
        <a href="javascript:void(0);" onClick={() => this.print()}>
          Print
        </a>
        <div id="certificate">
          <div className="cert-content">
            <span className="cert-title">Certificate of Completion</span>
            <br />
            <br />
            <span className="cert-sm-txt">
              <i>This is to certify that</i>
            </span>
            <br />
            <br />
            <span className="cert-lg-txt">
              <b>$student.getFullName()</b>
            </span>
            <br />
            <br />
            <span className="cert-sm-txt">
              <i>has completed the course</i>
            </span>{" "}
            <br />
            <br />
            <span className="cert-lg-txt">$course.getName()</span> <br />
            <br />
            <span>
              with score of <b>100%</b>
            </span>{" "}
            <br />
            <br />
            <span className="cert-lg-txt">
              <i>dated</i>
            </span>
            <br />
            <span className="cert-sm-txt">January 22,2013</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { course } = this.state;
    var link = 'sunny';
    return (
      <main className="profile_main">
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
                {course
                  ? this.renderContent()
                  : <span>Ceritificate will be available if you have scored above 80% in all modules.Please check <Link to="/account/quiz/summary">here</Link> your all module score.</span>
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default connect(
  null,
  {getCertificateByCourseId}
)(withRouter(Certificate));
