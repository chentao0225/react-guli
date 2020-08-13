import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
export default function (ReciveComponent) {
  class TargetComponent extends Component {
    render() {
      const { isLogin } = this.props;
      const { pathname } = this.props.location;
      if (!isLogin && pathname !== "/login") return <Redirect to="/login" />;
      if (isLogin && pathname === "/login") return <Redirect to="/admin" />;
      return <ReciveComponent {...this.props} />;
    }
  }
  return connect(
    (state) => ({ isLogin: state.userInfo.isLogin }),
    {}
  )(TargetComponent);
}
