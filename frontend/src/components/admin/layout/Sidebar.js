// Sidebar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Sidebar extends Component {

  toggleSidebar = () => {
    document.getElementById("accordionSidebar").classList.toggle('toggled');
  }

  render() {
    return (
      <ul className="navbar-nav bg-gradient-info sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fa fa-smile-o"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Admin <sup></sup></div>
      </a>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to="/admin">
          <i className="fa fa-dashboard"></i>
          <span>Dashboard</span></Link>
      </li>
      <hr className="sidebar-divider" />
      <li className="nav-item">
        <Link className="nav-link" to="/admin/media/gallery">
          <i className="fa fa-picture-o"></i>
          <span>Media Gallery</span></Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to="/admin/static/pages">
          <i className="fa fa-files-o"></i>
          <span>Pages</span></Link>
      </li>
      <hr className="sidebar-divider" />
      <li className="nav-item">
        <Link className="nav-link" to="/admin/users">
          <i className="fa fa-user"></i>
          <span>Users</span></Link>
      </li>
      <hr className="sidebar-divider" />
      <li className="nav-item">
        <Link className="nav-link" to="/admin/categories">
          <i className="fa fa-align-left"></i>
          <span>Categories</span></Link>
      </li>
      <hr className="sidebar-divider" />
      <li className="nav-item">
        <Link className="nav-link" to="/admin/courses">
          <i className="fa fa-list"></i>
          <span>Courses</span></Link>
      </li>
      <hr className="sidebar-divider" />
      <li className="nav-item">
        <Link className="nav-link" to="/admin/courses/module">
          <i className="fa fa-list-alt"></i>
          <span>Modules</span></Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={this.toggleSidebar}></button>
      </div>
    </ul>
    );
  }
}

export default Sidebar;
