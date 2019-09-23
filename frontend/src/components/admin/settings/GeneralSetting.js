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

      content: "",
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
    const newImage = this.state.Image.map((bannerSlider, sidx) => {
      if (idx !== sidx) return bannerSlider;
      return { ...bannerSlider, [evt.target.name]: evt.target.value };
    });
    this.setState({ Image: newImage });
  };
  handleSubmit(e) {
    e.preventDefault();
    const content = {
      content: this.state.content,
    };
    const setting = {
      slug: "Settings",
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
           
          </div>

          <div className="card mb-2">
            <div className="card-header" onClick={this.handleCard}>
              <h2 className="btn">Alert Messages Section</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="title">Apply Now Message:</label>
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
