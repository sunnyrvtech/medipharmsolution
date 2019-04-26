// ModuleAdd.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { updateModule,getModuleById,emptyReducer } from "../../../actions/admin/module";
import classnames from "classnames";
import CKEditor from "react-ckeditor-component";
let route_name;
class ModuleUpdate extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      course_id: "",
      content: "",
      errors: { }
    };
    route_name = props.match.url;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeEditor(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const module = {
      name: this.state.name,
      content: this.state.content,
      moduleId: this.props.match.params.moduleId
    };
    this.props.updateModule(module,route_name,this.props.history);
  }

  componentDidMount() {
    this.props.emptyReducer();
    const moduleId = this.props.match.params.moduleId;
    this.props
      .getModuleById(moduleId, this.props.history)
      .then(response => {
        if (response) {
          this.setState({ name: response.name,content: response.content,course_id: response.course_id._id,course_name: response.course_id.name});
        }
      });
  }
  render() {
    const { errors, courses } = this.props;

    // console.log(this.props);

    return (
      <div className="container datatable">
        <div className="row form-group">
          <div className="col-lg-12">
            <h3>Update Module ({this.state.course_name})</h3>
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
              <div className={classnames("form-group", {
                "ck_text": errors.content
              })}>
                <label htmlFor="content">Content:</label>
                <CKEditor
                  activeClass="p10"
                  content={this.state.content}
                  events={{
                    change: this.onChangeEditor.bind(this)
                  }}
                />
                {errors.content && (
                  <div className="invalid-feedback">{errors.content}</div>
                )}
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
ModuleUpdate.propTypes = {
  updateModule: PropTypes.func.isRequired,
  getModuleById: PropTypes.func.isRequired,
  emptyReducer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateModule,getModuleById,emptyReducer }
)(withRouter(ModuleUpdate));
