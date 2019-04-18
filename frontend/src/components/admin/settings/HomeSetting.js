// HomeSetting.js

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

class HomeSetting extends Component {
  constructor(props) {
    super();
    this.state = {
      learn_more_title: "",
      admission_title: "",
      about_us_title: "",
      talk_us_title: "",
      page_not_found: false,
      alert_message: null
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
    console.log(e.target.closest(".card-header").nextSibling);
    let nextElment = e.target.closest(".card-header").nextSibling;
    nextElment.classList.toggle("show");
  }
  handleSubmit(e) {
    e.preventDefault();
    const content = {
      learn_more: {
        title: this.state.learn_more_title,
        text: this.state.learn_more_text
      },
      admission: {
        title: this.state.admission_title,
        text: this.state.admission_text
      },
      about_us: {
        title: this.state.about_us_title,
        text: this.state.about_us_text
      },
      talk_us: {
        title: this.state.talk_us_title,
        text: this.state.talk_us_text
      }
    };
    const setting = {
      slug: "home",
      content: content
    };
    this.props.updateSetting(setting, route_name, this.props.history);
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getSettingBySlug(slug, this.props.history).then(response => {
      if (response) {
        this.setState({
          learn_more_title: response.content.learn_more.title,
          learn_more_text: response.content.learn_more.text,
          admission_title: response.content.admission.title,
          admission_text: response.content.admission.text,
          about_us_title: response.content.about_us.title,
          about_us_text: response.content.about_us.text,
          talk_us_title: response.content.talk_us.title,
          talk_us_text: response.content.talk_us.text
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
              <h2 className="btn">Exploring Today</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header" onClick={this.handleCard}>
                      <h2 className="btn">Learn More</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="learn_more_title"
                          onChange={this.handleInputChange}
                          value={this.state.learn_more_title}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Text:</label>
                        <textarea
                          className="form-control"
                          name="learn_more_text"
                          onChange={this.handleInputChange}
                          value={this.state.learn_more_text}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header" onClick={this.handleCard}>
                      <h2 className="btn">Admission</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="admission_title"
                          onChange={this.handleInputChange}
                          value={this.state.admission_title}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Text:</label>
                        <textarea
                          className="form-control"
                          name="admission_text"
                          onChange={this.handleInputChange}
                          value={this.state.admission_text}
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
                      <h2 className="btn">About Us</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="about_us_title"
                          onChange={this.handleInputChange}
                          value={this.state.about_us_title}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Text:</label>
                        <textarea
                          className="form-control"
                          name="about_us_text"
                          onChange={this.handleInputChange}
                          value={this.state.about_us_text}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header" onClick={this.handleCard}>
                      <h2 className="btn">Talk to Us</h2>
                      <b className="close fa fa-caret-down" />
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="talk_us_title"
                          onChange={this.handleInputChange}
                          value={this.state.talk_us_title}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Text:</label>
                        <textarea
                          className="form-control"
                          name="talk_us_text"
                          onChange={this.handleInputChange}
                          value={this.state.talk_us_text}
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
)(withRouter(HomeSetting));
