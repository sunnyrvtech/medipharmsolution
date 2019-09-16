// Certificate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { getCertificateByCourseId } from "../../actions/course";
import jsPDF from "jspdf";
import Sidebar from "./Sidebar";
const moment = require("moment");

let route_name;

class Certificate extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      certificate: null
    };
  }

  print(quality = 2) {
    this.setState({ loader: true});
    const filename = "certificate.pdf";
    html2canvas(document.querySelector("#certificate"), {
      scale: quality
    }).then(canvas => {
      let pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 150);
      this.setState({ loader: false});
      pdf.save(filename);
    });
  }

  componentWillMount() {
    this.props
      .getCertificateByCourseId(
        this.props.match.params.courseId,
        this.props.history
      )
      .then(response => {
        this.setState({ certificate: response });
      });
  }

  renderContent() {
    const { certificate } = this.state;
    return (
      <div>
        <div className="nxt_btn print">
          <a href="javascript:void(0);" className="btn btn-primary" onClick={() => this.print()}>
            Download
          </a>
        </div>
        <div id="certificate">
          <div className="cert-content">
            <img src="/images/logo.png" className="logoimg" />
            <span className="cert-title">Certificate of Completion</span>
            <br />
            <br />
            <span className="cert-sm-txt subtext">
              <i>This is to certify that</i>
            </span>
            <br />
            <span className="cert-lg-txt">
              <b>
                {certificate.first_name +
                  " " +
                  certificate.last_name}
              </b>
              <br />
              <span className="cert-sm-txt"> has completed the course</span>
              <br />{" "}
              <span className="certificatename">
                {certificate.course_name}{" "}
              </span>
              <br />
              <span className="score_line">
                with score of <b>{certificate.score}%</b> from{" "}
                <span className="medipharm_color">Medipharm</span> Solutions
              </span>{" "}
              <br />
              <span>
                <i> On dated </i>
              </span>{" "}
              <span className="cert-sm-txt">
                {" "}
                {moment(certificate.created_at).format("YYYY-MM-DD")}
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { certificate } = this.state;
    return (
      <main className="profile_main">
        {this.state.loader &&
        <div className="loader"></div>
        }
        <div className="container">
          <div className="row">
            <Sidebar route_name={route_name} />
            <div className="col-md-8 col-lg-9">
              <div className="p-5">
                {certificate ? (
                  this.renderContent()
                ) : (
                        <div className="alert alert-info">
                          <strong>Note!</strong> No certificate available !
                        </div>
                )}
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
  { getCertificateByCourseId }
)(withRouter(Certificate));
