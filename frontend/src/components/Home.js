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
      bannerSliders: [{ link: "",text: "" }],
      content: "",
      video: [],
      page_not_found: false
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.getSettingBySlug('home', this.props.history).then(response => {
      if (response) {
        this.setState({
          bannerSliders: response.content.bannerSliders,
          content: response.content.content,
          video: response.content.video
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
      fade: true,
      dots: true
    };
    return (
      <main>
      {this.state.alert_message && (
        <div className={"text-center alert alert-" + this.state.alert_message.class}>
          {this.state.alert_message.message}
        </div>
      )}
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
        <section className="homecontent pad-70-tb">
          <div className="container" dangerouslySetInnerHTML={{__html: this.state.content}} />
        </section>
          <section className="home-page-Video">
          <div className="container">
          <div className="row no-gutters">
          {this.state.video.map((video, idx) => (
            <div key={idx} className={(this.state.video.length==1 || (this.state.video.length-1 ==idx && idx % 2 == 0)) ?"col-md-12 pr-2":"col-md-6 pr-2"}>
            <div key={idx} dangerouslySetInnerHTML={{__html: video.content}} />
            </div>
          ))}
          </div>
          </div>
        </section>
      </main>
    );
  }
}

export default connect(
  null,
  { getSettingBySlug }
)(withRouter(Home));
