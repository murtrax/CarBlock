import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBRow, MDBCol } from "mdbreact";
import M from 'materialize-css/dist/js/materialize'

class TabsDefault extends Component {

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems, {});
    });
  }



  state = {
    activeItem: "1"
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
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
                  <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                    Service
                </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                    Accident
                </MDBNavLink>
                </MDBNavItem>
              </MDBNav>
              <MDBTabContent className="mt-5" activeItem={this.state.activeItem} >
                <MDBTabPane tabId="1" role="tabpanel">
                  <div className="row mt-3">
                    <form className="col s12">
                      <div className="row">
                        <div class="input-field col s6">
                          <i class="material-icons prefix">motorcycle</i>
                          <input id="icon_prefix" type="text" class="validate" />
                          <label for="icon_prefix">Milage</label>
                        </div>
                        <div class="input-field col s6">
                          <i class="material-icons prefix">date_range</i>
                          <input type="text" class="datepicker" />
                          <label for="icon_telephone">Date</label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6">
                          <i class="material-icons prefix">mode_edit</i>
                          <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                          <label for="icon_prefix2">Comments</label>
                        </div>
                      </div>
                      <div className="row text-center">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                          <i class="material-icons right">send</i>
                        </button>
                      </div>
                    </form>
                  </div>
                </MDBTabPane>
                <MDBTabPane tabId="2" role="tabpanel">
                  <div className="row mt-3">
                    <form className="col s12">
                      <div className="row">
                        <div class="input-field col s6">
                          <i class="material-icons prefix">motorcycle</i>
                          <input id="icon_prefix" type="text" class="validate" />
                          <label for="icon_prefix">Milage</label>
                        </div>
                        <div class="input-field col s6">
                          <i class="material-icons prefix">date_range</i>
                          <input type="text" class="datepicker" />
                          <label for="icon_telephone">Date</label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6">
                          <i class="material-icons prefix">mode_edit</i>
                          <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                          <label for="icon_prefix2">First Name</label>
                        </div>
                      </div>
                      <div className="row text-center">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Submit
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