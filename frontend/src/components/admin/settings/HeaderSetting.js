// HeaderSetting.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  updateSetting,
  getSettingBySlug
} from "../../../actions/admin/setting";
import { getstaticPages } from "../../../actions/admin/StaticPage";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

let route_name;

class HeaderSetting extends Component {
  constructor(props) {
    super();
    this.state = {
      modal: false,
      header_social_links: [{ class: "", link: "" }],
      header_menu: [],
      name: "",
      slug: ""
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
  handleInputSelectChange(e) {
    var name = e.target.options[e.target.selectedIndex].text;
    this.setState({
      name: name,
      slug: e.target.value
    });
  }
  handleMenuSubmit() {
    var header_menu = this.state.header_menu;
    if(this.state.name == ""){
      this.setState({
          alert_message: {message: "Name is required"}
      });
      return false;
    }
    if(this.state.menu_type == "menu_with_sub"){
    header_menu.push({name: this.state.name,sub_menu:[]});
  }else if(this.state.menu_type == "sub_menu"){
      var menu_index = this.state.menu_index;
      header_menu[menu_index].sub_menu.push({name:this.state.name,slug:this.state.slug});
  }else{
    header_menu.push({name: this.state.name,slug: this.state.slug,sub_menu:null});
  }
    this.setState({
        header_menu: header_menu,
        modal: !this.state.modal
    });
  }
  handleCard(e) {
    let nextElment = e.target.closest(".card-header").nextSibling;
    nextElment.classList.toggle("show");
  }
  closeModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleAddMenuHolder = (menu_type,idx) => {
    this.setState({
      menu_type: menu_type,
      menu_index: idx,
      name: "",
      slug: "",
      alert_message: null,
      modal: !this.state.modal
    });
  };
  handleRemoveMenuHolder = (index) => {
    var header_menu = this.state.header_menu;
    header_menu.splice(index,1);
    this.setState({
        header_menu: header_menu
    });
  }
  handleRemoveSubMenuHolder = (menu_index,sub_menu_index) => {
    var header_menu = this.state.header_menu;
    header_menu[menu_index].sub_menu.splice(sub_menu_index,1);
    this.setState({
        header_menu: header_menu
    });
  }
  handleSocialHolderChange = idx => evt => {
    const new_social_links = this.state.header_social_links.map((socialLink, sidx) => {
      if (idx !== sidx) return socialLink;
      return { ...socialLink, [evt.target.name]: evt.target.value };
    });
    this.setState({ header_social_links: new_social_links });
  };
  handleAddMoreSocialHolder = () => {
    this.setState({
      header_social_links: this.state.header_social_links.concat([{ class: "", link: "" }])
    });
  };
  handleRemoveSocialHolder = idx => () => {
    this.setState({
      header_social_links: this.state.header_social_links.filter((s, sidx) => idx !== sidx)
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    const content = {
      header_menu: this.state.header_menu,
      header_social_links: this.state.header_social_links
    };
    const setting = {
      slug: "header",
      content: content
    };
    this.props.updateSetting(setting, route_name, this.props.history);
  }
  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.getSettingBySlug(slug, this.props.history).then(response => {
      if (response) {
        this.setState({
          header_menu: response.content.header_menu,
          header_social_links: response.content.header_social_links
        });
      }
    });
    this.props.getstaticPages().then(response => {
      this.setState({ pages: response });
    });
  }

  render_html() {
    const { pages,header_menu } = this.state;
    return (
      <div className="container setting">
        <form onSubmit={this.handleSubmit}>
        <div className="card mb-2">
          <div className="card-header" onClick={this.handleCard}>
            <h2 className="btn">Header Section</h2>
            <b className="close fa fa-caret-down" />
          </div>
          <div className="card-body">
          <div className="row">
          <div className="col-md-6">
          <div className="card">
            <div className="card-header" onClick={this.handleCard}>
              <h2 className="btn">Header Menu</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
                            <ul className="tree">
              {header_menu.length!= undefined && header_menu.map((menu, index) => (
                <li className="branch" key={index}>

                                  {menu.sub_menu != undefined ?
                                      <div>
                <span className="indicator fa fa-plus-circle" onClick={this.handleAddMenuHolder.bind(this,'sub_menu',index)}></span>
                {menu.name}
                <span className="indicator fa fa-times-circle" onClick={this.handleRemoveMenuHolder.bind(this,index)}></span>
                  {menu.sub_menu.length != undefined &&
                  <ul>
                    {menu.sub_menu.map((sub_menu, k) => (
                      <li key={k}>{sub_menu.name}<span className="indicator fa fa-times-circle" onClick={this.handleRemoveSubMenuHolder.bind(this,index,k)}></span></li>
                    ))}
                  </ul>
                }
                </div>
                :
                <div><span className="indicator fa fa-pagelines"></span>{menu.name}<span className="indicator fa fa-times-circle" onClick={this.handleRemoveMenuHolder.bind(this,index)}></span></div>
              }

                </li>
              ))}
              </ul>
              <div className="mt-5">
              <button
                type="button"
                onClick={this.handleAddMenuHolder.bind(this,'menu_with_sub')}
                className="btn btn-info mr-2"
              >
                Add Menu with sub menu
              </button>
              <button
                type="button"
                onClick={this.handleAddMenuHolder.bind(this,'menu')}
                className="btn btn-info"
              >
                Add Menu
              </button>
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-6">
          <div className="card">
            <div className="card-header" onClick={this.handleCard}>
              <h2 className="btn">Social Links</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
              <div className="fontawe text-center mb-2">
                <a href="https://fontawesome.com/v4.7.0/icons/" target="_blank">Get social Icon class here</a>
              </div>
              {this.state.header_social_links.map((socialLink, idx) => (
                <div className="" key={idx}>
                  <div className="input-group mb-2">
                  <div className="col-md-4">
                      <input
                        type="text"
                        name="class"
                        placeholder="Class"
                        className="form-control"
                        onChange={this.handleSocialHolderChange(idx)}
                        value={socialLink.class}
                      />
                      </div>
                    <div className="input-group-append">
                      <input
                        type="text"
                        name="link"
                        placeholder="Link"
                        className="form-control"
                        onChange={this.handleSocialHolderChange(idx)}
                        value={socialLink.link}
                      />
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={this.handleRemoveSocialHolder(idx)}
                        >
                          -
                        </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={this.handleAddMoreSocialHolder}
                className="btn btn-info"
              >
                +
              </button>
            </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          <button type="submit" className="btn btn-info">
            Save
          </button>
        </form>
        <Modal isOpen={this.state.modal} className="">
          <div className="modal-header">
            <div className="text-center">
            {this.state.menu_type == "sub_menu" ?
              <p className="modal-title">Add Sub Menu</p>
              :
              <p className="modal-title">Add Menu</p>
            }
            </div>
            <button type="button" className="close" onClick={this.closeModal}>
              &times;
            </button>
          </div>
          <ModalBody>
          {this.state.alert_message  && (
            <div className='text-center alert alert-danger'>
               {this.state.alert_message.message}
            </div>
          )}
          <div className="row">
            {this.state.menu_type != "menu_with_sub" ?
              <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="page">Page:</label>
                <select name="slug" className="form-control" onChange={this.handleInputSelectChange.bind(this)}>
                  <option value="">Select Page</option>
                  {pages != undefined && pages.map((page, i) => (
                    <option value={page.slug} key={i}>{page.name}</option>
                  ))}
                </select>
                </div>
              </div>
              :
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            }
              </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" onClick={this.handleMenuSubmit.bind(this)} className="btn btn-info">
              Submit
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  render() {
    return <div>{this.render_html()}</div>;
  }
}

export default connect(
  null,
  { updateSetting, getSettingBySlug, getstaticPages }
)(withRouter(HeaderSetting));
