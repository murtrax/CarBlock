import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./../actions/authActions";

import Fab from "./dashComponents/fab";
import SideNav from "./dashComponents/sideNav";
import Workshop from "./dashComponents/workshopDetails";
import Profile from "./dashComponents/profile";

class Dashboard extends React.Component {
  state = {};
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };
  render() {
    return (
      <div class="mt-5">
        <MDBRow>
          <MDBCol sm="3">
            <Profile user={this.props.auth.user.name} />
            <SideNav logout={this.onLogoutClick} />
          </MDBCol>
          <MDBCol sm="9">
            <Workshop />
          </MDBCol>
        </MDBRow>
        <Fab />
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
