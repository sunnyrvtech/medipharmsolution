// Blog.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getBlogs } from "../../actions/blog";
import PageNotFound from "../PageNotFound";

let route_name;

class Blog extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      blogs: {}
    };
  }

  componentWillMount() {
    var blogSlug = this.props.match.params.blogSlug;
    this.props.getBlogs(blogSlug, this.props.history).then(response => {
      this.setState({ BLOG_IMAGE_URL:response.BLOG_IMAGE_URL,blogs: response.blogs });
    });
  }


    componentWillReceiveProps(nextProps) {
      var blogSlug = nextProps.location.pathname.split("/").pop();
      this.props.getBlogs(blogSlug, this.props.history).then(response => {
        this.setState({ BLOG_IMAGE_URL:response.BLOG_IMAGE_URL,blogs: response.blogs });
      });
    }

  renderContent(blogs) {
    return (
      <main>
        <section className="gray-box pad-70-tb">
          <div className="container">
            <div className="row">
            {blogs.map((blog, i) => {
              if(blog.banner)
                var blog_image = this.state.BLOG_IMAGE_URL+blog.banner;
                else
                    var blog_image = this.state.BLOG_IMAGE_URL+"default.jpg";
                return (
                  <div className="col-md-6 col-lg-4" key={i}>
                    <div className="plp-wrapper">
                      <div className="cta-holder">
                        <figure>
                          <img src={blog_image} />
                        </figure>
                        <div className="cta">
                          <span>
                            <Link to={`${route_name +"/"+ blog.slug}`} className="btn btn-ghost btn-white">
                              Read More
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="content-holder">
                        <h3>
                          <Link to={`${route_name +"/"+ blog.slug}`}>
                            {blog.name}
                          </Link>
                        </h3>
                        <span dangerouslySetInnerHTML={{__html: blog.description}} />
                      </div>
                    </div>
                  </div>
                );
            })}
            </div>
          </div>
        </section>
      </main>
    );
  }

  render() {
    const { blogs } = this.state;

    return (
      <div>
        {blogs.length > 0 &&
          this.renderContent(blogs)
        }
        {blogs.length == 0 &&
                <PageNotFound />
        }
      </div>
    );
  }
}

export default connect(
  null,
  { getBlogs }
)(withRouter(Blog));
