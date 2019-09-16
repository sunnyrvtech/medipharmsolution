// Certificate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { getUserCertificate,sendCertificate } from "../../../actions/admin/enrolled";
import jsPDF from "jspdf";
const moment = require("moment");

let route_name;

class Certificate extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      certificate: null,
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
  sendEmail(quality = 2) {
    this.setState({ loader: true});
    html2canvas(document.querySelector("#certificate"), {
      scale: quality
    }).then(canvas => {
      let pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 150);
      var pdf_base_64 = pdf.output("datauristring");
      const certificate = {
        course_name: this.state.certificate.course_name,
        first_name: this.state.certificate.first_name,
        last_name: this.state.certificate.last_name,
        last_name: this.state.certificate.last_name,
        email: this.state.certificate.email,
        pdf: pdf_base_64
      };
      this.props.sendCertificate(certificate, route_name, this.props.history);
    });
  }

  componentWillMount() {
    this.props
      .getUserCertificate(
        this.props.match.params.enrolledId,
        this.props.history
      )
      .then(response => {
        this.setState({ loader: false,certificate: response });
      });
  }

  renderContent() {
    const { certificate } = this.state;
    return (
      <div>
        {this.state.loader &&
        <div className="loader"></div>
        }
        <h3 className="text-center">Score:- {certificate.score}%</h3>
        <a className="btn btn-info mb-2" onClick={this.props.history.goBack}>Back</a>
        <div className="nxt_btn print">
          <a href="javascript:void(0);" className="btn btn-info mr-2" onClick={() => this.print()}>
            Download
          </a>
          <a href="javascript:void(0);" className="btn btn-info" onClick={() => this.sendEmail()}>
            Send Email
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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
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
    );
  }
}
export default connect(
  null,
  { getUserCertificate,sendCertificate }
)(withRouter(Certificate));
