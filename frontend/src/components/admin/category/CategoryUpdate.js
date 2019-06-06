// CategoryUpdate.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { updateCategory,getCategoryById,emptyReducer } from "../../../actions/admin/category";
import classnames from "classnames";
import CKEditor from "react-ckeditor-component";
let route_name;
class CategoryUpdate extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      description: "",
      bannerSliders: [{ link: "",text: "" }],
      video: "",
      errors: { }
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
  onChange(e) {
    e.preventDefault();
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
      var output = document.getElementById("output");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      banner: file
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const category = {
      name: this.state.name,
      description: this.state.description,
      banner_slides: this.state.bannerSliders,
      video: this.state.video,
      categoryId: this.props.match.params.categoryId
    };
    var routeName = route_name.split('/'+this.props.match.params.categoryId)[0];
    this.props.updateCategory(category,routeName, this.props.history);
  }

  componentDidMount() {
    this.props.emptyReducer();
    const categoryId = this.props.match.params.categoryId;
    this.props
      .getCategoryById(categoryId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ name: response.name,description: response.description,bannerSliders: response.banner_slides!=undefined?response.banner_slides:[],video: response.video});
        }
      });
  }
  render() {
    const { errors } = this.props;

    // console.log(this.props);

    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Update Category</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.name
                  })}
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <CKEditor
                  activeClass="p10"
                  content={this.state.description}
                  events={{
                    change: this.onChangeEditor('description')
                  }}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="card mb-2">
                <div className="card-header" onClick={this.handleCard}>
                  <h2 className="btn">Banner Slider:</h2>
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
                <div className="form-group">
                  <label htmlFor="video">Video:</label>
                  <textarea
                    className="form-control"
                    placeholder="Iframe content"
                    name="video"
                    onChange={this.handleInputChange}
                    value={this.state.video}
                  />
                </div>
              <button type="submit" className="btn btn-info mr-2">
                Update
              </button>
              <a className="btn btn-info" onClick={this.props.history.goBack}>Back</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CategoryUpdate.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  getCategoryById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateCategory, getCategoryById,emptyReducer }
)(withRouter(CategoryUpdate));
