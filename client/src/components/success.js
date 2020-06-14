import React from "react";
import { MDBRow, MDBCol,MDBContainer } from "mdbreact";
import styles from './styles/prompts.module.css';
import successIllustration from '../images/illustrations/success.svg';

class SuccessMessage extends React.Component {
  state = {};
  render() {
    const msg = this.props.history.location.state.message;
    //console.log(this.props.history.location.state.message);
    const hi = 'hello wassup'
    return (
      <div className={`mx-auto justify-content-center ${styles.back}`}>
      <MDBContainer className = {styles.contain}>
      <MDBRow className={`justify-content-center ${styles.success}`}>
        <MDBCol md="6" lg="5">
          <h5 className = "" style={{ textAlign: "center" }}>{msg}</h5>
          {
            //}<h5 style={{ textAlign: "center" }}>{typeMismatch}</h5>
          }
          <img alt = "Illustration" className={`mt-5 img-fluid ${styles.illustration}`} src={successIllustration} />

        </MDBCol>
      </MDBRow>
      </MDBContainer>
      </div>
    );
  }
}

export default SuccessMessage;
