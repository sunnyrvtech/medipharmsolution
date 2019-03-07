// Header.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  toggleAccountDropDown = () => {
    document.getElementById("account_drop_down").classList.toggle('show');
  }
  onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    render() {
      const {isAuthenticated, user} = this.props.auth;
      const authLinks = (
          <ul>
            <li>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" onClick={this.toggleAccountDropDown} id="dropdownMenuButton">
                    <img src={user.user_image} />
                  </button>
                  <div className="dropdown-menu" id="account_drop_down" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="/account/profile" onClick={this.toggleAccountDropDown}><i className="fa fa-cog" aria-hidden="true"></i><span>My Account</span></a>
                    <a className="dropdown-item" href="#" onClick={this.onLogout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i><span>Logout</span></a>
                  </div>
                </div>
            </li>
          </ul>
      )
    const guestLinks = (
      <ul>
          <li><Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</Link></li>
          <li><Link to="/register"><i className="fa fa-sign-out" aria-hidden="true"></i> Register</Link></li>
      </ul>
    )
        return(
            <header className="new-header">
                <div className="header-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="social_icon">
                                    <ul>
                                        <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                        <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                        <li><a href="#"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6 text-center">
                                <ul id="course-menu" className="course-menu">
                                    <li>
                                    <h3><Link to="/clinical-research">Clinical Research</Link></h3>
                                    </li>
                                    <li>
                                    <h3><Link to="/drug-safety">Drug Safety</Link></h3>
                                    </li>
                                    <li>
                                    <h3><Link to="/data-management">Data Management</Link></h3>
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
                      <Link className="navbar-brand" to="/"><img src="/images/logo.png" /></Link>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/about-us">About Us</Link>
                          </li>
                          <li className="nav-item parent">
                            <a className="nav-link" href="#">Explore programs <i className="fa fa-chevron-down" aria-hidden="true"></i></a>
                              <ul className="submenu">
                                  <li><Link className="nav-link" to="/clinical-research">Clinical Research</Link></li>
                                  <li><Link className="nav-link" to="/drug-safety">Drug Safety</Link></li>
                                  <li><Link className="nav-link" to="/data-management">Data Science</Link></li>
                              </ul>
                          </li>
                          {/*<li className="nav-item">
                            <a className="nav-link" href="#">Testimonials </a>
                          </li>*/}
                          <li className="nav-item parent">
                            <a className="nav-link" href="#">E-learning <i className="fa fa-chevron-down" aria-hidden="true"></i></a>
                            <ul className="submenu">
                                <li><Link className="nav-link" to="/blog">Blog</Link></li>
                                <li><Link className="nav-link" to="/free-website-resources-to-be-added">Free website resources to be added </Link></li>
                            </ul>
                          </li>
                          <li className="nav-item parent">
                            <a className="nav-link" href="#">Careers <i className="fa fa-chevron-down" aria-hidden="true"></i></a>
                            <ul className="submenu">
                                <li><Link className="nav-link" to="/resume-writing">Resume writing</Link></li>
                                <li><Link className="nav-link" to="/job-search">Job search </Link></li>
                                <li><Link className="nav-link" to="/interview-preparation">Interview preparation </Link></li>
                                <li><Link className="nav-link" to="/phone-interview-preparation">Phone interview preparation </Link></li>
                                <li><Link className="nav-link" to="/in-person-interview-preparation">In-person interview preparation </Link></li>
                                <li><Link className="nav-link" to="/after-interview">After interview </Link></li>
                            </ul>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/collaborations">Collaborations </Link>
                          </li>
                          {/*<li className="nav-item">
                            <a className="nav-link" href="#">Student log in </a>
                          </li>*/}
                          <li className="nav-item">
                            <a className="nav-link" href="#">Contact us </a>
                          </li>
                        </ul>
                        <span className="desktop-cta"><a href="#" className="btn btn-header">Apply Now</a></span>
                      </div>
                    </div>
                </nav>
            </header>
        )
    }
}
Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));
