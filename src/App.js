import React, { Component } from "react";
//import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import 'materialize-css/dist/css/materialize.min.css';
import "./index.css";

// Importing React Redux and Redux Store. (DANIAL)
import { Provider } from "react-redux";
import store from "./store";


import Navbar from "./components/navbar";
import Footer from "./components/footer";



class App extends Component {
  render() {
    return (
      // Wrapping EVERYTHING in the Provider tag as each state in the website will be stored in Redux Store. (DANIAL)
        <div>
          <Navbar/>
          <Footer/>
        </div>
    );
  }
}

export default App;
