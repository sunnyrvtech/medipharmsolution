// Header.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Footer extends Component {
    render() {
        return(
            <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 foo_sec">
                <h5>About us</h5>
                <p>tronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.</p>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 foo_sec">
                <h5>INFO</h5>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Tyres</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 foo_sec">
                <h5>Contact</h5>
                <p>Sollers College, Unit 1850, 55 Parsonage Road, Edison, New Jersey 08837</p>
                <p><a href="tel:18772906907">1-877-290-6907</a></p>
                <p><a href="emailto:info@test1234.com">info@test1234.com</a></p>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 foo_sec">
                <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
                <p>Sign up for our weekly newsletter to learn more about how to break into or level up your career in the pharmaceutical or clinical research fields.</p>
                <div className="newsletter newsletter-widget">
                  <form>
                    <input id="signup" placeholder="Your email" className="newsletter-email form-control" type="email" />
                    <input className="btn btn-solid btn-nomin newsletter-submit" type="submit" value="Subscribe" />
                  </form>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 foo_sec">
                <div className="copyright text-center">
                  <p>&copy;   2019 SollersCollege. All rights reserved.</p>
                  <div className="ft-disclaimber center">All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</div>
                </div>
              </div>
            </div>
          </div>

        </footer>
        )
    }
}


export default Footer;
