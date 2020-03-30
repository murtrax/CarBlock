import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";

class SearchPage extends React.Component {
  render() {
    return (
      <MDBCol md="11">
        <form className="form-inline mt-4 mb-4">
          <MDBIcon icon="search" />
          <input
            className="form-control form-control-sm ml-3 w-100"
            type="text"
            name="number"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </MDBCol>
    );
  }
}

export default SearchPage;
