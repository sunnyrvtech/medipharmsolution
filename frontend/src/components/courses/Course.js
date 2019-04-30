// Course.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseByCategorySlug } from "../../actions/course";
import PageNotFound from "../PageNotFound";

let route_name;

class Course extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      courses: {},
      loader: true
    };
  }

  componentWillMount() {
    var categorySlug = this.props.match.params.categorySlug;
    this.props.getCourseByCategorySlug(categorySlug, this.props.history).then(response => {
      this.setState({ loader: false,IMAGE_CATEGORY_URL:response.IMAGE_CATEGORY_URL,IMAGE_COURSE_URL:response.IMAGE_COURSE_URL,category: response.category,courses: response.courses });
    });
  }
    componentWillReceiveProps(nextProps) {
      var categorySlug = nextProps.location.pathname.split("/").pop();
      this.props.getCourseByCategorySlug(categorySlug, this.props.history).then(response => {
        this.setState({ IMAGE_CATEGORY_URL:response.IMAGE_CATEGORY_URL,IMAGE_COURSE_URL:response.IMAGE_COURSE_URL,category: response.category,courses: response.courses });
      });
    }

  renderContent(courses) {
    var category_banner = this.state.IMAGE_CATEGORY_URL+"default.jpg";
    if(this.state.category.banner)
     category_banner = this.state.IMAGE_CATEGORY_URL+this.state.category.banner;

    return (
      <main>
        <section className="hero-banner" style={{ backgroundImage: "url("+category_banner+")"}}>
          <div className="container">
            <div className="modal-wrap">
              <div className="modal-table">
                <div className="modal-cell">
                  <div className="homebanner-info">
                    <h2>{this.state.category.name}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="gray-box pad-70-tb">
          <div className="container">
            <div className="row">
            {courses.map((course, i) => {
              var course_banner = this.state.IMAGE_COURSE_URL+"default.jpg";
              if(course.banner)
               course_banner = this.state.IMAGE_COURSE_URL+course.banner;
                return (
                  <div className="col-md-6 col-lg-4" key={i}>
                    <div className="plp-wrapper">
                      <div className="cta-holder">
                        <figure>
                          <img src={course_banner} />
                        </figure>
                        <div className="cta">
                          <span>
                            <Link to={`${route_name +"/"+ course.slug}`} className="btn btn-ghost btn-white">
                              Learn More
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="content-holder">
                        <h3>
                          <Link to={`${route_name +"/"+ course.slug}`}>
                            {course.name}
                          </Link>
                        </h3>
                        <span dangerouslySetInnerHTML={{__html: course.description.length>200?course.description.substring(0,200)+" ....":course.description}} />
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
    const { courses } = this.state;
    return (
      <div>
        {this.state.loader &&
        <div className="loader"></div>
        }
        {courses && courses.length != undefined &&
          this.renderContent(courses)
        }
        {courses == undefined &&
                <PageNotFound />
        }
      </div>
    );
  }
}

export default connect(
  null,
  { getCourseByCategorySlug }
)(withRouter(Course));
