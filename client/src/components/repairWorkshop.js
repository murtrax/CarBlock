import React, { Component } from "react";
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBRow,
  MDBCol,
} from "mdbreact";
import M from "materialize-css/dist/js/materialize";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./../actions/authActions";
import styles from "./styles/form.module.css";
import workshopIllustration from "../images/illustrations/workshop.svg";

class TabsDefault extends Component {
  state = {
    activeItem: "1",
    millage: "",
    comments: "",
    reg: "",
    errors: [],
    errorBool: "",
  };

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".datepicker");
      var instances = M.Datepicker.init(elems, {});
    });
  }

  logout = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  clearFields = () => {
    this.setState({
      millage: "",
      comments: "",
      reg: "",
    });
  };

  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
      this.setState({
        millage: "",
        comments: "",
        reg: "",
      });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const payload = {
      millage: this.state.millage,
      comments: this.state.comments,
      reg: this.state.reg,
      activeItem: this.state.activeItem,
    };
    axios({
      url: "/AccidentAndService",
      method: "post",
      data: payload,
    })
      .then((response) => {
        console.log(response.data);
        this.clearFields();
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState(
          {
            errors: err.response.data.errors,
          },
          () => {
            this.setState({
              errorBool: "true",
            });
          }
        );
      });
  };

  displayError = (message, errorType) => {
    let labels = [];
    let condition = "false";

    if (this.state.errorBool == "true") {
      for (var x = 0; x < errorType.length; x++) {
        if (this.state.errors[errorType[x]]) {
          condition = "true";
          labels[x] = (
            <React.Fragment>
              <label style={{ color: "red" }}>
                {this.state.errors[errorType[x]]}
              </label>
            </React.Fragment>
          );
        }
      }
      if (condition === "false") {
        return message;
      } else {
        return labels;
      }
    } else {
      return message;
    }
  };

  render() {
    return (
      <div>
        <MDBRow>
          <MDBCol className={styles.color1} md="1" lg="1">
            &ensp;
          </MDBCol>
          <MDBCol className={styles.color2} md="11" lg="11">
            &ensp;
          </MDBCol>
        </MDBRow>
        <MDBRow className={styles.color4}>
          <MDBCol className={styles.color3} md="1" lg="1">
            &ensp;
          </MDBCol>
          <MDBCol
            className={`justify-content-center mx-auto text-right`}
            md="5"
            lg="5"
          >
            <img
              alt="illustrations"
              className={`mt-3 img-fluid ${styles.illustrationHeight2}`}
              src={workshopIllustration}
            />
          </MDBCol>
          <MDBCol className={`pb-4`} md="6" lg="6">
            <MDBContainer className={`nav-tabs mt-5 mb-5 ${styles.repairCard}`}>
              <MDBRow>
                <MDBCol>
                  <MDBNav className="nav-tabs mt-5 text-center">
                    <MDBNavItem>
                      <MDBNavLink
                        link
                        to="#"
                        active={this.state.activeItem === "1"}
                        onClick={this.toggle("1")}
                        role="tab"
                      >
                        Service
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        link
                        to="#"
                        active={this.state.activeItem === "2"}
                        onClick={this.toggle("2")}
                        role="tab"
                      >
                        Accident
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                  <MDBTabContent
                    className="mt-5"
                    activeItem={this.state.activeItem}
                  >
                    <MDBTabPane tabId="1" role="tabpanel">
                      <div className="row mt-3">
                        <form className="col s12" onSubmit={this.submitForm}>
                          <div className="row">
                            <div className="input-field col s6">
                              <i className="material-icons prefix">
                                motorcycle
                              </i>
                              <input
                                id="icon_prefix"
                                type="number"
                                name="millage"
                                value={this.state.millage}
                                onChange={this.handleChange}
                              />
                              <label htmlFor="icon_prefix">
                                {this.displayError("Millage", ["millageEmpty"])}
                              </label>
                            </div>

                            <div className="input-field col s6">
                              <i className="material-icons prefix">
                                motorcycle
                              </i>
                              <input
                                id="icon_prefix"
                                type="text"
                                name="reg"
                                value={this.state.reg}
                                onChange={this.handleChange}
                              />
                              <label htmlFor="icon_prefix">
                                {this.displayError("Reg #", ["regEmpty"])}
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s6">
                              <i className="material-icons prefix">mode_edit</i>
                              <textarea
                                id="icon_prefix2"
                                className="materialize-textarea"
                                name="comments"
                                value={this.state.comments}
                                onChange={this.handleChange}
                              ></textarea>
                              <label htmlFor="icon_prefix2">
                                {this.displayError("Comments", [
                                  "commentsEmpty",
                                ])}
                              </label>
                            </div>
                          </div>
                          <div className="row text-center">
                            <button
                              className="btn waves-effect waves-light"
                              type="submit"
                              name="action"
                            >
                              Submit
                              <i className="material-icons right">send</i>
                            </button>
                            <button
                              class="btn waves-effect waves-light"
                              type="button"
                              onClick={this.logout}
                            >
                              Logout
                            </button>
                          </div>
                        </form>
                      </div>
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                      <div className="row mt-3">
                        <form className="col s12" onSubmit={this.submitForm}>
                          <div className="row">
                            <div className="input-field col s6">
                              <i className="material-icons prefix">
                                motorcycle
                              </i>
                              <input
                                id="icon_prefix"
                                type="text"
                                name="millage"
                                value={this.state.millage}
                                onChange={this.handleChange}
                              />
                              <label htmlFor="icon_prefix">
                                {this.displayError("Millage", ["millageEmpty"])}
                              </label>
                            </div>
                            <div className="input-field col s6">
                              <i className="material-icons prefix">
                                motorcycle
                              </i>
                              <input
                                id="icon_prefix"
                                type="text"
                                name="reg"
                                value={this.state.reg}
                                onChange={this.handleChange}
                              />
                              <label htmlFor="icon_prefix">
                                {this.displayError("Reg #", ["regEmpty"])}
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s6">
                              <i className="material-icons prefix">mode_edit</i>
                              <textarea
                                id="icon_prefix2"
                                className="materialize-textarea"
                                name="comments"
                                value={this.state.comments}
                                onChange={this.handleChange}
                              ></textarea>
                              <label htmlFor="icon_prefix2">
                                {this.displayError("Comments", [
                                  "commentsEmpty",
                                ])}
                              </label>
                            </div>
                          </div>
                          <div className="text-center py-2 mt-3 justify-content-center mx-auto">
                            <div className="row text-center">
                              <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                              >
                                Submit
                                <i className="material-icons right">send</i>
                              </button>
                              <button
                                class="btn waves-effect waves-light"
                                type="button"
                                onClick={this.logout}
                              >
                                Logout
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </MDBTabPane>
                  </MDBTabContent>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

TabsDefault.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(TabsDefault);
