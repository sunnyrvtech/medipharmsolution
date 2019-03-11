// BlogView.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getBlogBySlug } from "../../actions/blog";
import PageNotFound from "../PageNotFound";

let route_name;

class BlogView extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      blog: null
    };
  }

  componentWillMount() {
    var blogSlug = this.props.match.params.blogSlug;
    this.props
      .getBlogBySlug(blogSlug, this.props.history)
      .then(response => {
        this.setState({
          blog: response
        });
      });
  }
  renderContent(blog) {
    return (
      <main>
        <section
          className="hero-banner"
          style={{ backgroundImage: "url(" + blog.banner + ")" }}
        >
          <div className="container">
            <div className="modal-wrap">
              <div className="modal-table">
                <div className="modal-cell">
                  <div className="homebanner-info">
                    <h2>{blog.name}</h2>
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
                  <h2>{blog.name}</h2>
                </div>
                <div
                  className="content_des"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  render() {
    const { blog } = this.state;
    return (
      <div>
        {blog ?
          this.renderContent(blog)
        : <PageNotFound />}
      </div>
    );
  }
}

export default connect(
  null,
  { getBlogBySlug }
)(withRouter(BlogView));
