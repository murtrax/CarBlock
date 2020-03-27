import React, { Component } from "react";
//import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import 'materialize-css/dist/css/materialize.min.css';
import "./index.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";



class App extends Component {
  render() {
    return (
      <div>
      <Navbar/>
      <Footer/>
      </div>
    );
  }
}

export default App;
