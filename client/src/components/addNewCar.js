import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Fab from "./dashComponents/fab";
import SideNav from "./dashComponents/sideNav";
import NewCarForm from "./dashComponents/addNewCarForm";
import styles from "./styles/form.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./../actions/authActions";

class CardExample extends React.Component {
  state = {};
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };
  render() {
    return (
      <div className={`${styles.formback}`}>
        <MDBRow className="pt-5">
          <MDBCol sm="3">
            <SideNav />
            <Fab />
          </MDBCol>
          <MDBCol sm="9">
            <NewCarForm />
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

CardExample.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(CardExample);
