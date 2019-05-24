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
import PageNotFound from "../../PageNotFound";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

let route_name;

class HeaderSetting extends Component {
  constructor(props) {
    super();
    this.state = {
      modal: false,
      header_menu: [],
      menu: "",
      sub_menu: "",
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
  handleMenuSubmit() {
    var header_menu = this.state.header_menu;
    header_menu.push({name: this.state.menu,sub_menu:[]});
    this.setState({
        header_menu: header_menu,
        modal: !this.state.modal
    });
  }
  handleSubMenuSubmit(e) {
    var header_menu = this.state.header_menu;
    var menu_index = this.state.menu_index;

    header_menu[menu_index].sub_menu.push({name:this.state.menu,slug:this.state.sub_menu});
        console.log(header_menu);
    // header_menu.push({name: this.state.menu});
    // this.setState({
    //     header_menu: header_menu,
    //     modal: !this.state.modal
    // });
  }
  handleCard(e) {
    //console.log(e.target.closest(".card-header").nextSibling);
    let nextElment = e.target.closest(".card-header").nextSibling;
    nextElment.classList.toggle("show");
  }
  closeModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleAddMenuHolder = () => {
    this.setState({
      menu_type: false,
      modal: !this.state.modal
    });
  };
  handleAddSubMenuHolder = (idx) => {
    this.setState({
      menu_type: true,
      menu_index: idx,
      modal: !this.state.modal
    });
  };
  handleAddMoreHolder = () => {
    this.setState({
      footer_social_links: this.state.footer_social_links.concat([
        { name: "", link: "" }
      ])
    });
  };

  handleRemoveAddMoreHolder = idx => () => {
    this.setState({
      footer_social_links: this.state.footer_social_links.filter(
        (s, sidx) => idx !== sidx
      )
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    const content = {
      header_menu: this.state.header_menu
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
        // this.setState({
        //   header_menu: response.content.header_menu
        // });
      } else {
        this.setState({ page_not_found: true });
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
          <div className="card">
            <div className="card-header" onClick={this.handleCard}>
              <h2 className="btn">Header Menu</h2>
              <b className="close fa fa-caret-down" />
            </div>
            <div className="card-body">
                            <ul className="tree">
              {header_menu.length!= undefined && header_menu.map((menu, index) => (
                <li className="branch" key={index}><a href="javascript:void(0);" key={index} onClick={this.handleAddSubMenuHolder.bind(this,index)}><i className="indicator fa fa-plus-circle"></i></a>{menu.name}

                </li>
              ))}
              </ul>
              <button
                type="button"
                onClick={this.handleAddMenuHolder}
                className="btn btn-info mr-2"
              >
                Add Menu
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-info">
            Save
          </button>
        </form>
        <Modal isOpen={this.state.modal} className="">
          <div className="modal-header">
            <div className="text-center">
            {this.state.menu_type ?
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
          <div className="row">
            {this.state.menu_type ?
              <div className="col-md-12">
                <div className="form-group">
                <label htmlFor="page">Page:</label>
                <select name="sub_menu" className="form-control" onChange={this.handleInputChange}>
                  <option value="">Select Page</option>
                  {pages.map((page, i) => (
                    <option value={page.slug}>{page.name}</option>
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
                    name="menu"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            }
              </div>
          </ModalBody>
          <ModalFooter>
            {this.state.menu_type ?
            <button type="button" onClick={this.handleSubMenuSubmit.bind(this)} className="btn btn-info">
              Submit
            </button>
            :
            <button type="button" onClick={this.handleMenuSubmit.bind(this)} className="btn btn-info">
              Submit
            </button>
            }
          </ModalFooter>
        </Modal>
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
  { updateSetting, getSettingBySlug, getstaticPages }
)(withRouter(HeaderSetting));
