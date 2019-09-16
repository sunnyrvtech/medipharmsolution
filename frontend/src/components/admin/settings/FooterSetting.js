// FooterSetting.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  updateSetting,
  getSettingBySlug
} from "../../../actions/admin/setting";
import { getCategories } from "../../../actions/admin/category";
import PageNotFound from "../../PageNotFound";

let route_name;

class FooterSetting extends Component {
  constructor(props) {
    super();
    this.state = {
      footer_social_links: [{ name: "", link: "" }],
      footer_programs: [],
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
  handleSocialHolderChange = idx => evt => {
    const new_social_links = this.state.footer_social_links.map((socialLink, sidx) => {
      if (idx !== sidx) return socialLink;
      return { ...socialLink, [evt.target.name]: evt.target.value };
    });
    this.setState({ footer_social_links: new_social_links });
  };
  handleSocialHolder = () => {
    this.setState({
      footer_social_links: this.state.footer_social_links.concat([{ name: "", link: "" }])
    });
  };

  handleRemoveSocialHolder = idx => () => {
    this.setState({
      footer_social_links: this.state.footer_social_links.filter((s, sidx) => idx !== sidx)
    });
  };
  handleProgramHolderChange = idx => evt => {
    var name = evt.target.options[evt.target.selectedIndex].text;
    const new_footer_programs = this.state.footer_programs.map((program, sidx) => {
      if (idx !== sidx) return program;
      return { ...program,name:name, slug: evt.target.value};
    });
    this.setState({ footer_programs: new_footer_programs });
  };
  handleProgramHolder = () => {
    this.setState({
      footer_programs: this.state.footer_programs.concat([{ slug: "" }])
    });
  };

  handleRemoveProgramHolder = idx => () => {
    this.setState({
      footer_programs: this.state.footer_programs.filter((s, sidx) => idx !== sidx)
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    const content = {
      footer_social_links: this.state.footer_social_links,
      footer_programs: this.state.footer_programs,
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
    this.props.getCategories().then(response => {
      this.setState({ categories: response});
    });
    this.props.getSettingBySlug(slug, this.props.history).then(response => {
      if (response) {
        this.setState({
          footer_social_links: response.content.footer_social_links,
          footer_programs: response.content.footer_programs != undefined ?response.content.footer_programs:[],
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
    const { categories,footer_programs } = this.state;
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
                      <h2 className="btn">Social Links</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      {this.state.footer_social_links.map((socialLink, idx) => (
                        <div className="" key={idx}>
                          <div className="input-group mb-2">
                          <div className="col-md-4">
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="form-control"
                                onChange={this.handleSocialHolderChange(idx)}
                                value={socialLink.name}
                              />
                              </div>
                            <div className="input-group-append">
                              <input
                                type="text"
                                name="link"
                                placeholder="Link"
                                className="form-control"
                                onChange={this.handleSocialHolderChange(idx)}
                                value={socialLink.link}
                              />
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={this.handleRemoveSocialHolder(idx)}
                                >
                                  -
                                </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={this.handleSocialHolder}
                        className="btn btn-info"
                      >
                        +
                      </button>
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
              <div className="row mb-3">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header" onClick={this.handleCard}>
                    <h2 className="btn">Explore Programs</h2>
                    <b className="close fa fa-caret-down" />
                  </div>
                  <div className="card-body">
                    {footer_programs!=undefined && footer_programs.map((program, idx) => (
                      <div className="" key={idx}>
                          <div className="input-group-append mb-2">
                          <select name="slug" className="form-control" value={program.slug} onChange={this.handleProgramHolderChange(idx)}>
                            <option value="">Select Page</option>
                            {categories != undefined && categories.map((category, i) => (
                              <option value={category.slug} key={i}>{category.name}</option>
                            ))}
                          </select>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={this.handleRemoveProgramHolder(idx)}
                              >
                                -
                              </button>
                          </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={this.handleProgramHolder}
                      className="btn btn-info"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-info mr-2">
            Save
          </button>
          <a className="btn btn-info" onClick={this.props.history.goBack}>Back</a>
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
  { updateSetting, getSettingBySlug,getCategories }
)(withRouter(FooterSetting));
