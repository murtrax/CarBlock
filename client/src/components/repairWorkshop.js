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

class TabsDefault extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".datepicker");
      var instances = M.Datepicker.init(elems, {});
    });
  }

  state = {
    activeItem: "1",
    millage: "",
    comments: "",
    reg: "",
    errors: [],
    errorBool: ""
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
        console.log("HERE")
        console.log(err.response.data);
        this.setState({
          errors: err.response.data.errors
        },()=>{
          this.setState({
            errorBool: "true"
          })
        })
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
      <MDBContainer className="nav-tabs mt-5">
        <MDBRow>
          <MDBCol>
            <MDBContainer>
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
                        <div class="input-field col s6">
                          <i class="material-icons prefix">motorcycle</i>
                          <input
                            id="icon_prefix"
                            type="number"
                            name="millage"
                            value={this.state.millage}
                            onChange={this.handleChange}
                          />
                          <label for="icon_prefix">{this.displayError("Millage", ["millageEmpty"])}</label>
                        </div>
                        

                        <div class="input-field col s6">
                          <i class="material-icons prefix">motorcycle</i>
                          <input
                            id="icon_prefix"
                            type="text"
                            name="reg"
                            value={this.state.reg}
                            onChange={this.handleChange}
                          />
                          <label for="icon_prefix">{this.displayError("Reg #", ["regEmpty"])}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6">
                          <i class="material-icons prefix">mode_edit</i>
                          <textarea
                            id="icon_prefix2"
                            class="materialize-textarea"
                            name="comments"
                            value={this.state.comments}
                            onChange={this.handleChange}
                          ></textarea>
                          <label for="icon_prefix2">{this.displayError("Comments", ["commentsEmpty"])}</label>
                        </div>
                      </div>
                      <div className="row text-center">
                        <button
                          class="btn waves-effect waves-light"
                          type="submit"
                          name="action"
                        >
                          Submit
                          <i class="material-icons right">send</i>
                        </button>
                      </div>
                    </form>
                  </div>
                </MDBTabPane>
                <MDBTabPane tabId="2" role="tabpanel">
                  <div className="row mt-3">
                    <form className="col s12" onSubmit={this.submitForm}>
                      <div className="row">
                        <div class="input-field col s6">
                          <i class="material-icons prefix">motorcycle</i>
                          <input
                            id="icon_prefix"
                            type="text"
                            name="millage"
                            value={this.state.millage}
                            onChange={this.handleChange}
                          />
                          <label for="icon_prefix">{this.displayError("Millage", ["millageEmpty"])}</label>
                        </div>
                        <div class="input-field col s6">
                          <i class="material-icons prefix">motorcycle</i>
                          <input
                            id="icon_prefix"
                            type="text"
                            name="reg"
                            value={this.state.reg}
                            onChange={this.handleChange}
                          />
                          <label for="icon_prefix">{this.displayError("Reg #", ["regEmpty"])}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6">
                          <i class="material-icons prefix">mode_edit</i>
                          <textarea
                            id="icon_prefix2"
                            class="materialize-textarea"
                            name="comments"
                            value={this.state.comments}
                            onChange={this.handleChange}
                          ></textarea>
                          <label for="icon_prefix2">{this.displayError("Comments", ["commentsEmpty"])}</label>
                        </div>
                      </div>
                      <div className="row text-center">
                        <button
                          class="btn waves-effect waves-light"
                          type="submit"
                          name="action"
                        >
                          Submit
                          <i class="material-icons right">send</i>
                        </button>
                      </div>
                    </form>
                  </div>
                </MDBTabPane>
              </MDBTabContent>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default TabsDefault;
