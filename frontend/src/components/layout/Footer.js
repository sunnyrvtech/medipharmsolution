// Header.js

import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter,Link } from "react-router-dom";
import { getSettingBySlug } from "../../actions/setting";
import PropTypes from 'prop-types';

class Footer extends Component {
  constructor(props) {
    super();
    this.state = {
      footer_social_links: [{ name: "", link: "" }],
      footer_contact_us_address: "",
      footer_contact_us_phone: "",
      footer_contact_us_email: "",
      footer_newsletter_text: "",
      footer_copyright_title: "",
      footer_copyright_text: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getSettingBySlug('footer', this.props.history).then(response => {
      if (response) {
        this.setState({
          footer_social_links: response.content.footer_social_links,
          footer_contact_us_address: response.content.footer_contact_us.address,
          footer_contact_us_phone: response.content.footer_contact_us.phone,
          footer_contact_us_email: response.content.footer_contact_us.email,
          footer_newsletter_text: response.content.footer_newsletter.text,
          footer_copyright_title: response.content.footer_copyright.title,
          footer_copyright_text: response.content.footer_copyright.text
        });
      }
    });
  }
    render() {
        return(
            <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 foo_sec">
                <h5>Social Links</h5>
                <ul>
                  {this.state.footer_social_links.map((socialLink, idx) => (
                    <li key={idx}><a target="_blank" href={socialLink.link}>{socialLink.name}</a></li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 foo_sec">
                <h5>INFO</h5>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/tyres">Tyres</Link></li>
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/contact-us">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 foo_sec">
                <h5>Contact</h5>
                <p>{this.state.footer_contact_us_address}</p>
                <p><a href={"tel:"+this.state.footer_contact_us_phone}>{this.state.footer_contact_us_phone}</a></p>
                <p><a href={"emailto:"+this.state.footer_contact_us_email}>{this.state.footer_contact_us_email}</a></p>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 foo_sec">
                <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
                <p>{this.state.footer_newsletter_text}</p>
                <div className="newsletter newsletter-widget">
                  <form>
                    <input id="signup" placeholder="Your email" className="newsletter-email form-control" type="email" />
                    <input className="btn btn-solid btn-nomin newsletter-submit" type="button" value="Subscribe" />
                  </form>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 foo_sec">
                <div className="copyright text-center">
                  <p>&copy;   {this.state.footer_copyright_title}</p>
                  <div className="ft-disclaimber center">{this.state.footer_copyright_text}</div>
                </div>
              </div>
            </div>
          </div>

        </footer>
        )
    }
}


export default connect(
  null,
  { getSettingBySlug }
)(withRouter(Footer));
