// Home.js

import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="not-found">
          <div className="text-center">
            <div className="error mx-auto" data-text="404">404</div>
            <p className="lead text-gray-800">OOPS! NOTHING WAS FOUND</p>
            <p className="text-gray-500 mb-0">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            {this.props.match
            ? <Link to={this.props.match.path}>&larr; Back to Main Page</Link>
            : <Link to='/'>&larr; Home Page</Link>
            }
          </div>
        </div>
    );
  }
}
