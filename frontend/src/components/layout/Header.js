// Header.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentication";
import { getCategories } from "../../actions/category";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      categories: null,
      route_name: props.route
    };
  }
  toggleAccountDropDown = () => {
    document.getElementById("account_drop_down").classList.toggle("show");
  };
  toggleHamBurgerMenu = () => {
    document.getElementById("navbarText").classList.toggle("show");
  };
  toggleMenuDropDown = (e) => {
    let elment = e.target.closest(".parent").querySelector('.submenu');
    elment.classList.toggle("show");
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
  componentWillReceiveProps(nextProps) {
    document.querySelectorAll('.show').forEach(el => el.classList.remove('show'));
    this.setState({ route_name: nextProps.route });
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
            >
              <Link
                className="dropdown-item"
                to="/account/profile"
                onClick={this.toggleAccountDropDown}
              >
                <i className="fa fa-cog" />
                <span>My Account</span>
              </Link>
              <a
                className="dropdown-item"
                href="#"
                onClick={this.onLogout.bind(this)}
              >
                <i className="fa fa-sign-out" />
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
            <i className="fa fa-sign-in" /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <i className="fa fa-sign-out" /> Register
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
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-youtube-play" />
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
              onClick={this.toggleHamBurgerMenu}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ml-auto">
                <li className={this.state.route_name == "/" ? "nav-item active":"nav-item"}>
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className={this.state.route_name == "/about-us" ? "nav-item active":"nav-item"}>
                  <Link className="nav-link" to="/about-us">
                    About Us
                  </Link>
                </li>
                <li className="nav-item parent">
                  <a className="nav-link" href="javascript:void(0);" onClick={this.toggleMenuDropDown}>
                    Explore programs{" "}
                    <i className="fa fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    {categories &&
                      categories.map(value => {
                        return (
                          <li key={value._id}>
                            <Link className={this.state.route_name == "/"+value.slug ? "nav-link active":"nav-link"} to={"/"+value.slug}>
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
                  <a className="nav-link" href="javascript:void(0);" onClick={this.toggleMenuDropDown}>
                    E-learning{" "}
                    <i className="fa fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <Link className={this.state.route_name == "/blog"? "nav-link active":"nav-link"} to="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={this.state.route_name == "/free-website-resources-to-be-added"? "nav-link active":"nav-link"}
                        to="/free-website-resources-to-be-added"
                      >
                        Free website resources to be added{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item parent">
                  <a className="nav-link" href="javascript:void(0);" onClick={this.toggleMenuDropDown}>
                    Careers{" "}
                    <i className="fa fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <Link className={this.state.route_name == "/resume-writing"? "nav-link active":"nav-link"}
                       to="/resume-writing">
                        Resume writing
                      </Link>
                    </li>
                    <li>
                      <Link className={this.state.route_name == "/job-search"? "nav-link active":"nav-link"}
                       to="/job-search">
                        Job search{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className={this.state.route_name == "/interview-preparation"? "nav-link active":"nav-link"}
                       to="/interview-preparation">
                        Interview preparation{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                      className={this.state.route_name == "/phone-interview-preparation"? "nav-link active":"nav-link"}
                      to="/phone-interview-preparation"
                      >
                        Phone interview preparation{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                      className={this.state.route_name == "/in-person-interview-preparation"? "nav-link active":"nav-link"}
                        to="/in-person-interview-preparation"
                      >
                        In-person interview preparation{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className={this.state.route_name == "/after-interview"? "nav-link active":"nav-link"}
                       to="/after-interview">
                        After interview{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={this.state.route_name == "/collaborations" ? "nav-item active":"nav-item"}>
                  <Link className="nav-link" to="/collaborations">
                    Collaborations{" "}
                  </Link>
                </li>
                {/*<li className="nav-item">
                            <a className="nav-link" href="#">Student log in </a>
                          </li>*/}
                <li className={this.state.route_name == "/contact-us" ? "nav-item active":"nav-item"}>
                  <Link className="nav-link" to="/contact-us">
                    Contact us{" "}
                  </Link>
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
