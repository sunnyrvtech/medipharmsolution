// Media.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getGalleries, deleteImage } from "../../../actions/admin/media";
// https://dzone.com/articles/react-image-upload-how-its-done
// https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c
// https://stackoverflow.com/questions/51558271/getting-all-the-file-names-in-a-specific-directory-using-javascript
let route_name;
class Media extends Component {
  constructor(props) {
    super();
    this.state = {
      images: {}
    };
    route_name = props.match.url;
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.getGalleries().then(response => {
      this.setState({ images: response });
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
          5000
        );
        this.props.history.replace({ state: null });
      }
    }
  }
  CopyImageUrl(imageUrl) {
    window.scrollTo(0, 0);
    var inp = document.createElement("input");
    document.body.appendChild(inp);
    inp.value = imageUrl;
    inp.select();
    document.execCommand("copy");
    inp.remove();
    this.setState({
      alert_message: {
        class: "success",
        message: "Copied! "+imageUrl
      }
    });
    setTimeout(
      function() {
        this.setState({ alert_message: false });
      }.bind(this),
      3000
    );
  }
  onDelete(imageName, index) {
    window.scrollTo(0, 0);
    const images = {
      imageName: imageName
    };
    this.props
      .deleteImage(images, this.props.history)
      .then(response => {
        if (response) {
          var images = this.state.images;
          delete images[index]; //////    this is used to remove image from the list
          this.setState({
            images: images,
            alert_message: {
              class: "success",
              message: "Deleted successfully!"
            }
          });
          setTimeout(
            function() {
              this.setState({ alert_message: false });
            }.bind(this),
            5000
          );
        }
      })
      .catch(error => {
        this.setState({
          alert_message: { class: "danger", message: error.message }
        });
        setTimeout(
          function() {
            this.setState({ alert_message: false });
          }.bind(this),
          5000
        );
      });
  }

  render() {
    const { images } = this.state;
    return (
      <div className="container datatable">
        {this.state.alert_message && (
          <div className={"alert alert-" + this.state.alert_message.class}>
            {this.state.alert_message.message}
          </div>
        )}
        <div className="row mb-5">
          <Link className="btn btn-info" to={`${route_name + "/upload"}`}>
            Upload Image
          </Link>
        </div>
        <div className="row">
          {images.length != undefined &&
            images.map((image, i) => {
              return (
                <div className="col-md-4 mb-2" key={i}>
                  <div className="img-thumbnail">
                    <img className="rounded" src={image.imageUrl} />
                    <div className="caption text-center mt-2 mb-2">
                      <a
                        onClick={() => this.CopyImageUrl(image.imageUrl)}
                        className="btn btn-info btn-circle"
                        tooltip="Copy image url"
                      >
                        <i className="fa fa-copy" />
                      </a>
                      <a
                        onClick={() => this.onDelete(image.imageName, i)}
                        className="btn btn-danger btn-circle ml-2"
                        tooltip="delete"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getGalleries, deleteImage }
)(withRouter(Media));
