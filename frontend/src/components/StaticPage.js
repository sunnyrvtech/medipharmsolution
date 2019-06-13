// StaticPage.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getPageContentBySlug } from "../actions/StaticPage";
import PageNotFound from "./PageNotFound";

let route_name;

// var static_page_slugs = ["home","about-us", "blog", "free-website-resources-to-be-added", "resume-writing","job-search","interview-preparation","phone-interview-preparation","in-person-interview-preparation","after-interview","collaborations"];
class StaticPage extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      static_page: {},
      loader: true
    };
  }

  componentWillMount() {
    var slug = this.props.location.pathname.split("/").pop();
    this.props.getPageContentBySlug(slug, this.props.history).then(response => {
      this.setState({ loader:false,static_page: response });
    });
  }

  componentWillReceiveProps(nextProps) {
    var slug = nextProps.location.pathname.split("/").pop();
    this.props.getPageContentBySlug(slug, this.props.history).then(response => {
      this.setState({ static_page: response });
    });
  }

  renderContent(static_page) {
    return (
      <main>
      {this.state.loader ?
      <div className="loader"></div>
      :
      <section className="content-gray-wpr pad-70-tb">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title">
                <h2>{static_page.name}</h2>
              </div>
              <div
                className="content_des"
                dangerouslySetInnerHTML={{ __html: static_page.content }}
              />
            </div>
          </div>
        </div>
      </section>
    }
      </main>
    );
  }

  render() {
    const { static_page } = this.state;
    return (
      <div>
        {static_page && this.renderContent(static_page)}
        {!static_page &&
                <PageNotFound />
        }
      </div>
    );
  }
}

export default connect(
  null,
  { getPageContentBySlug }
)(withRouter(StaticPage));
