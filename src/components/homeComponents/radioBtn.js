import React from "react";
import { MDBInput, MDBFormInline } from "mdbreact";

const InputPage = () => {
  return (
    <div className="text-center">
      <MDBFormInline className="text-center">
        <p className="text-center">
          <label>
            <input name="group1" type="radio" checked />
            <span>Vin Number</span>
          </label>
        </p>
        <p className="ml-3">
          <label>
            <input name="group1" type="radio" />
            <span>Registration Number</span>
          </label>
        </p>
      </MDBFormInline>
    </div>
  );
};

export default InputPage;
