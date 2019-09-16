// Header.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import setAuthToken from '../../../setAuthToken';
import { connect } from "react-redux";
class Header extends Component {
  toggleAdminSettingDropDown = () => {
    document.getElementById("adminSetting").classList.toggle('show');
  }
  onLogout(e) {
        e.preventDefault();
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        window.location.href = '/';
    }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3"><i className="fa fa-bars"/></button>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
            <span onClick={this.toggleAdminSettingDropDown} className="mr-2 text-gray-600 small">
                <i className="fa fa-user"></i> Admin<b className="fa fa-caret-down"></b>
            </span>
            </a>
            <div id="adminSetting" className="dropdown-menu dropdown-menu-right shadow animated--grow-in text-center">
              <span onClick={this.onLogout} className="text-center">
                <i className="fa fa-sign-out"></i>
                Logout
              </span>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
