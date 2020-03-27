import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";

const SearchPage = () => {
  return (
    <MDBCol md="11">
      <form className="form-inline mt-4 mb-4">
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ml-3 w-100" type="text" placeholder="Search" aria-label="Search" />
      </form>
    </MDBCol>
  );
}

export default SearchPage;