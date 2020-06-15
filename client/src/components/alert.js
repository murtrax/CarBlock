import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./../actions/authActions";

import Fab from "./dashComponents/fab";
import SideNav from "./dashComponents/sideNav";
import Alert from "./dashComponents/alerts";
import styles from "./styles/form.module.css";

class AlertExample extends React.Component {
  state = {};
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };
  render() {
    return (
      <div className={styles.alertBack}>
        <MDBRow className="pt-5">
          <MDBCol sm="3">
            <SideNav />
            <Fab />
          </MDBCol>
          <MDBCol sm="8">
            <Alert />
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

AlertExample.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(AlertExample);
