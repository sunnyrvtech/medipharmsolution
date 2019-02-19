// Header.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Footer extends Component {
  render() {
    return (
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2019</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
