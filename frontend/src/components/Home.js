// Home.js

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSettingBySlug } from "../actions/setting";
import Slider from "react-slick";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <a className="carousel-control-prev" href="#part" onClick={onClick}>
      <i className="fa fa-chevron-left" />
    </a>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <a className="carousel-control-next" href="#part" onClick={onClick}>
      <i className="fa fa-chevron-right" />
    </a>
  );
}

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      banner_title: "",
      banner_image: "",
      learn_more_title: "",
      learn_more_text: "",
      admission_title: "",
      admission_text: "",
      about_us_title: "",
      about_us_text: "",
      talk_us_title: "",
      talk_us_text: "",
      experience_title: "",
      experience_text: "",
      graduates_title: "",
      graduates_text: "",
      video: "",
      testisliders: [{ slide: "" }],
      page_not_found: false
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.getSettingBySlug('home', this.props.history).then(response => {
      if (response) {
        this.setState({
          banner_title: response.content.banner.title,
          banner_image: response.content.banner.image,
          learn_more_title: response.content.learn_more.title,
          learn_more_text: response.content.learn_more.text,
          admission_title: response.content.admission.title,
          admission_text: response.content.admission.text,
          about_us_title: response.content.about_us.title,
          about_us_text: response.content.about_us.text,
          talk_us_title: response.content.talk_us.title,
          talk_us_text: response.content.talk_us.text,
          experience_title: response.content.experience.title,
          experience_text: response.content.experience.text,
          graduates_title: response.content.graduates.title,
          graduates_text: response.content.graduates.text,
          video: response.content.video,
          testisliders: response.content.testisliders
        });
      }
    });
    if (this.props.location.state) {
      if (this.props.location.state.alert_message) {
        this.setState({
          alert_message: this.props.location.state.alert_message
        });
        setTimeout(
          function() {
            this.setState({ alert_message: false });
          }.bind(this),
          10000
        );
        this.props.history.replace({ state: null });
      }
    }
  }
  render() {
    var settings = {
      autoplay: true,
      autoplaySpeed: 10000,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    const settingss = {
      autoplay: true,
      autoplaySpeed: 10000,
      customPaging: function(i) {
        return <a />;
      },
      fade: true,
      dots: true,
      dotsClass: "carousel-indicators"
    };
    return (
      <main>
      {this.state.alert_message && (
        <div className={"text-center alert alert-" + this.state.alert_message.class}>
          {this.state.alert_message.message}
        </div>
      )}
        <section className="hero-banner" style={{ backgroundImage: "url("+this.state.banner_image+")"}}>
          <div className="container">
            <div className="modal-wrap">
              <div className="modal-table">
                <div className="modal-cell">
                  <div className="homebanner-info">
                    <h2>{this.state.banner_title}</h2>
                    <a href="#" className="btn">
                      Learn
                    </a>
                    <a href="#" className="btn">
                      Grow
                    </a>
                    <a href="#" className="btn">
                      Partner
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="start-explore-wpr pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 exp-left">
                <img src="/images/college-home-explore.png" />
              </div>
              <div className="col-lg-9 exp-right">
                <div className="title">
                  <h2>
                    <span>Start </span> Exploring Today
                  </h2>
                </div>
                <div className="row home-explore-info pad-40-t">
                  <div className="col-md-6">
                    <div className="home-explore-box">
                      <div className="icon-box">
                        <img src="/images/icon-1.png" />
                      </div>
                      <div className="info-box">
                        <h3>{this.state.learn_more_title}</h3>
                        <p>{this.state.learn_more_text}</p>
                        <a href="#">Learn More</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="home-explore-box">
                      <div className="icon-box">
                        <img src="/images/icon-2.png" />
                      </div>
                      <div className="info-box">
                        <h3>{this.state.admission_title}</h3>
                        <p>{this.state.admission_text}</p>
                        <a href="#">Admissions</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="home-explore-box">
                      <div className="icon-box">
                        <img src="/images/icon-3.png" />
                      </div>
                      <div className="info-box">
                        <h3>{this.state.about_us_title}</h3>
                        <p>{this.state.about_us_text}</p>
                        <a href="/about-us">About Us</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="home-explore-box">
                      <div className="icon-box">
                        <img src="/images/icon-4.png" />
                      </div>
                      <div className="info-box">
                        <h3>{this.state.talk_us_title}</h3>
                        <p>{this.state.talk_us_text}</p>
                        <a href="#">Talk to Us</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="learn-interest-wpr pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="learn-interest-inner-wpr">
                  <div className="learn-interest-inner-box">
                    <div className="learn-interest-info pad-70-all">
                      <div className="title">
                        <h2>
                          <span>A unique learning </span>{this.state.experience_title}
                        </h2>
                      </div>
                      <p>{this.state.experience_text}</p>
                      <a href="#" className="btn btn-ghost btn-black-bg">
                        About Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="where-do-wpr pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img src="/images/graduate-img.jpg" />
              </div>
              <div className="col-lg-6">
                <div className="graduate-wpr-rt">
                  <div className="title">
                    <h2>
                      <span>Where do </span> {this.state.graduates_title}
                    </h2>
                  </div>
                  <p>{this.state.graduates_text}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="future-wpr future-wpr-hm pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="testimonial_outer">
                  <div id="demo">
                    <div className="carousel-inner">
                      <Slider {...settingss}>
                      {this.state.testisliders.map((testislider, idx) => (
                        <div className="carousel-item" key={idx} dangerouslySetInnerHTML={{__html: testislider.slide}} />
                      ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {this.state.video &&
        <section className="home-page-Video">
          <div className="container" dangerouslySetInnerHTML={{__html: this.state.video}} />
        </section>
        }
      </main>
    );
  }
}

export default connect(
  null,
  { getSettingBySlug }
)(withRouter(Home));
