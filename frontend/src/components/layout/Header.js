// Header.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentication";
import { getCategories } from "../../actions/category";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      categories: null
    };
  }
  toggleAccountDropDown = () => {
    document.getElementById("account_drop_down").classList.toggle("show");
  };
  toggleMenuDropDown = () => {
    document.getElementById("navbarText").classList.toggle("show");
  };
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  componentDidMount() {
    this.props.getCategories().then(response => {
      this.setState({ categories: response });
    });
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { categories } = this.state;
    const authLinks = (
      <ul>
        <li>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              onClick={this.toggleAccountDropDown}
              id="dropdownMenuButton"
            >
              <img src={user.user_image} />
            </button>
            <div
              className="dropdown-menu"
              id="account_drop_down"
              aria-labelledby="dropdownMenuButton"
            >
              <Link
                className="dropdown-item"
                to="/account/profile"
                onClick={this.toggleAccountDropDown}
              >
                <i className="fa fa-cog" aria-hidden="true" />
                <span>My Account</span>
              </Link>
              <a
                className="dropdown-item"
                href="#"
                onClick={this.onLogout.bind(this)}
              >
                <i className="fa fa-sign-out" aria-hidden="true" />
                <span>Logout</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul>
        <li>
          <Link to="/login">
            <i className="fa fa-sign-in" aria-hidden="true" /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <i className="fa fa-sign-out" aria-hidden="true" /> Register
          </Link>
        </li>
      </ul>
    );
    return (
      <header className="new-header">
        <div className="header-wrap">
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="social_icon">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-youtube-play" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 text-center">
                <ul id="course-menu" className="course-menu">
                  <li>
                    <h3>
                      <Link to="/clinical-research">Clinical Research</Link>
                    </h3>
                  </li>
                  <li>
                    <h3>
                      <Link to="/drug-safety">Drug Safety</Link>
                    </h3>
                  </li>
                  <li>
                    <h3>
                      <Link to="/data-management">Data Management</Link>
                    </h3>
                  </li>
                </ul>
              </div>
              <div className="col-sm-3 text-right">
                <div className="login_icon">
                  {isAuthenticated ? authLinks : guestLinks}
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src="/images/logo.png" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={this.toggleMenuDropDown}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-us">
                    About Us
                  </Link>
                </li>
                <li className="nav-item parent">
                  <a className="nav-link" href="#">
                    Explore programs{" "}
                    <i className="fa fa-chevron-down" aria-hidden="true" />
                  </a>
                  <ul className="submenu">
                    {categories &&
                      categories.map(value => {
                        return (
                          <li key={value._id}>
                            <Link className="nav-link" to={"/"+value.slug}>
                              {value.name}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </li>
                {/*<li className="nav-item">
                            <a className="nav-link" href="#">Testimonials </a>
                          </li>*/}
                <li className="nav-item parent">
                  <a className="nav-link" href="#">
                    E-learning{" "}
                    <i className="fa fa-chevron-down" aria-hidden="true" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <Link className="nav-link" to="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav-link"
                        to="/free-website-resources-to-be-added"
                      >
                        Free website resources to be added{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item parent">
                  <a className="nav-link" href="#">
                    Careers{" "}
                    <i className="fa fa-chevron-down" aria-hidden="true" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <Link className="nav-link" to="/resume-writing">
                        Resume writing
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/job-search">
                        Job search{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/interview-preparation">
                        Interview preparation{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav-link"
                        to="/phone-interview-preparation"
                      >
                        Phone interview preparation{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav-link"
                        to="/in-person-interview-preparation"
                      >
                        In-person interview preparation{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/after-interview">
                        After interview{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/collaborations">
                    Collaborations{" "}
                  </Link>
                </li>
                {/*<li className="nav-item">
                            <a className="nav-link" href="#">Student log in </a>
                          </li>*/}
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact us{" "}
                  </a>
                </li>
              </ul>
              {/*<span className="desktop-cta">
                <a href="#" className="btn btn-header">
                  Apply Now
                </a>
              </span>*/}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, getCategories }
)(withRouter(Header));
