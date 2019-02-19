// Verification.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { verifyAccount } from "../../actions/authentication";
import { withRouter } from 'react-router-dom';

class Verification extends Component {
  constructor(props) {
    super();
   props.verifyAccount(props.match.params.code, props.history);
  }

  render() {
    return (<div></div>);
  }

}
Verification.propTypes = {
    verifyAccount: PropTypes.func.isRequired
}

export default connect(null, { verifyAccount })(withRouter(Verification));
