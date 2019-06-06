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
import CKEditor from "react-ckeditor-component";

let route_name;
class HomeSetting extends Component {
  constructor(props) {
    super();
    this.state = {
      bannerSliders: [{ link: "",text: "" }],
      content: "",
      video: [{content: ""}],
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
  onChangeEditor = column => evt => {
    this.setState({ [column]:  evt.editor.getData() });
  };
  handleBannerSliderNameChange = idx => evt => {
    const newbannerSliders = this.state.bannerSliders.map((bannerSlider, sidx) => {
      if (idx !== sidx) return bannerSlider;
      return { ...bannerSlider, [evt.target.name]: evt.target.value };
    });
    this.setState({ bannerSliders: newbannerSliders });
  };
  handleAddBannerSlider = () => {
    this.setState({
      bannerSliders: this.state.bannerSliders.concat([{ link: "",text: "" }])
    });
  };

  handleRemoveBannerSlider = idx => () => {
    this.setState({
      bannerSliders: this.state.bannerSliders.filter((s, sidx) => idx !== sidx)
    });
  };
  handleVideoNameChange = idx => evt => {
    const newVideo = this.state.video.map((video, sidx) => {
      if (idx !== sidx) return video;
      return { ...video, content: evt.target.value };
    });
    this.setState({ video: newVideo });
  };
  handleVideo = () => {
    this.setState({
      video: this.state.video.concat([{ content: "" }])
    });
  };

  handleRemoveVideo = idx => () => {
    this.setState({
      video: this.state.video.filter((s, sidx) => idx !== sidx)
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    const content = {
      content: this.state.content,
      video: this.state.video,
      bannerSliders: this.state.bannerSliders
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
          content: response.content.content,
          video: response.content.video,
          bannerSliders: response.content.bannerSliders
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
              <h2 className="btn">Banner Slider</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
              {this.state.bannerSliders.map((bannerSlider, idx) => (
                <div className="input-group mb-2" key={idx}>
                    <div className="col-md-6">
                      <input
                        type="text"
                        placeholder="Image Url"
                        className="form-control"
                        name="link"
                        onChange={this.handleBannerSliderNameChange(idx)}
                        value={bannerSlider.link}
                      />
                      </div>
                  <div className="input-group-append">
                  <input
                    className="form-control"
                    placeholder="text"
                    name="text"
                    onChange={this.handleBannerSliderNameChange(idx)}
                    value={bannerSlider.text}
                  />
                  <button className="btn btn-danger" type="button" onClick={this.handleRemoveBannerSlider(idx)}>-</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={this.handleAddBannerSlider} className="btn btn-info">+</button>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-header" onClick={this.handleCard}>
              <h2 className="btn">Content Section</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="title">Content:</label>
                <CKEditor
                  activeClass="p10"
                  config={{
                      allowedContent: true
                  }}
                  content={this.state.content}
                  events={{
                    change: this.onChangeEditor('content')
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-header" onClick={this.handleCard}>
              <h2 className="btn">Video Section</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="title">Content with Iframe:</label>
                {this.state.video.map((video, idx) => (
                  <div className="input-group-append mb-2" key={idx}>
                    <textarea
                      className="form-control"
                      placeholder="Iframe content"
                      name="video"
                      onChange={this.handleVideoNameChange(idx)}
                      value={video.content}
                    />
                    <button className="btn btn-danger" type="button" onClick={this.handleRemoveVideo(idx)}>-</button>
                </div>
              ))}
              <button type="button" onClick={this.handleVideo} className="btn btn-info">+</button>

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
  { updateSetting, getSettingBySlug }
)(withRouter(HomeSetting));
