// Course.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourseByCategorySlug } from "../../actions/course";
import PageNotFound from "../PageNotFound";
import Slider from "react-slick";

let route_name;

class Course extends Component {
  constructor(props) {
    super();
    route_name = props.match.url;
    this.state = {
      courses: {},
      bannerSliders: [{ link: "",text: "" }],
      loader: true
    };
  }

  componentWillMount() {
    var categorySlug = this.props.match.params.categorySlug;
    this.props.getCourseByCategorySlug(categorySlug, this.props.history).then(response => {
      this.setState({ loader: false,IMAGE_COURSE_URL:response.IMAGE_COURSE_URL,category: response.category,bannerSliders: response.category.banner_slides,courses: response.courses });
    });
  }
    componentWillReceiveProps(nextProps) {
      var categorySlug = nextProps.location.pathname.split("/").pop();
      this.props.getCourseByCategorySlug(categorySlug, this.props.history).then(response => {
        this.setState({ IMAGE_COURSE_URL:response.IMAGE_COURSE_URL,category: response.category,bannerSliders: response.category.banner_slides,courses: response.courses });
      });
    }

  renderContent(courses) {
    const settingss = {
       autoplay: true,
       autoplaySpeed: 10000,
       fade: true,
       dots: true
     };
    return (
      <main>
      <section className="bannerslider">
        <div className="slider-container">
            <Slider {...settingss}>
            {this.state.bannerSliders.map((bannerSlider, idx) => (
              <div className="slick-item" key={idx}>
                <p><img alt="" src={bannerSlider.link} /></p>
                <div className="slidEr-content">
                  <p>{bannerSlider.text}</p>
                </div>
              </div>
            ))}
            </Slider>
        </div>
      </section>
      <section className="categorycontent pad-70-tb">
        <div className="container" dangerouslySetInnerHTML={{__html: this.state.category.description}} />
      </section>
        <section className="gray-box pad-70-tb categorycontent_nEW">
          <div className="container-fluid">
            <div className="row">
            {courses.map((course, i) => {
              var course_banner = this.state.IMAGE_COURSE_URL+"default.jpg";
              if(course.banner)
               course_banner = this.state.IMAGE_COURSE_URL+course.banner;
                return (
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12" key={i}>
                    <div className="plp-wrapper">
                      <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                      <div className="Flex_alignMent">
                      <div>
                        <h3>
                          <Link to={`${route_name +"/"+ course.slug}`}>
                            {course.name}
                          </Link>
                        </h3>
                        <div className="cta">
                          <span>
                            <Link to={`${route_name +"/"+ course.slug}`} className="btn btn-ghost btn-white">
                              Learn More
                            </Link>
                          </span>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                         <div className="Flex_alignMent-1">
                         <div>
                        <span dangerouslySetInnerHTML={{__html: course.description.length>500?course.description.substring(0,500)+" ....":course.description}} />
                        </div>
                        </div>
                        </div>
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
