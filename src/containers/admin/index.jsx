import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Admin extends Component {
  render() {
    if (!this.props.isLogin) return <Redirect to="/login" />;
    return <div>admin page</div>;
  }
}
export default connect((state) => ({ isLogin: state.userInfo.isLogin }))(Admin);
