// FooterSetting.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  updateSetting,
  getSettingBySlug
} from "../../../actions/admin/setting";
import PageNotFound from "../../PageNotFound";

let route_name;

class FooterSetting extends Component {
  constructor(props) {
    super();
    this.state = {
      footer_about_us_text: "",
      footer_contact_us_address: "",
      footer_contact_us_phone: "",
      footer_contact_us_email: "",
      footer_newsletter_text: "",
      footer_copyright_title: "",
      footer_copyright_text: "",
      page_not_found: false
    };
    route_name = props.match.url;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleCard(e) {
    //console.log(e.target.closest(".card-header").nextSibling);
    let nextElment = e.target.closest(".card-header").nextSibling;
    nextElment.classList.toggle("show");
  }
  handleSubmit(e) {
    e.preventDefault();
    const content = {
      footer_about_us: {
        text: this.state.footer_about_us_text
      },
      footer_contact_us: {
        address: this.state.footer_contact_us_address,
        phone: this.state.footer_contact_us_phone,
        email: this.state.footer_contact_us_email
      },
      footer_newsletter: {
        text: this.state.footer_newsletter_text
      },
      footer_copyright: {
        title: this.state.footer_copyright_title,
        text: this.state.footer_copyright_text
      }
    };
    const setting = {
      slug: "footer",
      content: content
    };
    this.props.updateSetting(setting, route_name, this.props.history);
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getSettingBySlug(slug, this.props.history).then(response => {
      if (response) {
        this.setState({
          footer_about_us_text: response.content.footer_about_us.text,
          footer_contact_us_address: response.content.footer_contact_us.address,
          footer_contact_us_phone: response.content.footer_contact_us.phone,
          footer_contact_us_email: response.content.footer_contact_us.email,
          footer_newsletter_text: response.content.footer_newsletter.text,
          footer_copyright_title: response.content.footer_copyright.title,
          footer_copyright_text: response.content.footer_copyright.text
        });
      } else {
        this.setState({ page_not_found: true });
      }
    });
  }

  render_html() {
    return (
      <div className="container setting">
        <form onSubmit={this.handleSubmit}>
          <div className="card mb-2">
            <div className="card-header" onClick={this.handleCard}>
              <h2 className="btn">Footer Section</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header" onClick={this.handleCard}>
                      <h2 className="btn">About Us</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="text">Text:</label>
                        <textarea
                          className="form-control"
                          name="footer_about_us_text"
                          onChange={this.handleInputChange}
                          value={this.state.footer_about_us_text}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header" onClick={this.handleCard}>
                      <h2 className="btn">Contact Us</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="footer_contact_us_address"
                          onChange={this.handleInputChange}
                          value={this.state.footer_contact_us_address}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="footer_contact_us_phone"
                          onChange={this.handleInputChange}
                          value={this.state.footer_contact_us_phone}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Email:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="footer_contact_us_email"
                          onChange={this.handleInputChange}
                          value={this.state.footer_contact_us_email}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header" onClick={this.handleCard}>
                      <h2 className="btn">Newsletter</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="text">Text:</label>
                        <textarea
                          className="form-control"
                          name="footer_newsletter_text"
                          onChange={this.handleInputChange}
                          value={this.state.footer_newsletter_text}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header" onClick={this.handleCard}>
                      <h2 className="btn">Copyright</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="text">Title:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="footer_copyright_title"
                          onChange={this.handleInputChange}
                          value={this.state.footer_copyright_title}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="text">Text:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="footer_copyright_text"
                          onChange={this.handleInputChange}
                          value={this.state.footer_copyright_text}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-info">
            Save
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { page_not_found } = this.state;
    return <div>{page_not_found ? <PageNotFound /> : this.render_html()}</div>;
  }
}

export default connect(
  null,
  { updateSetting, getSettingBySlug }
)(withRouter(FooterSetting));
