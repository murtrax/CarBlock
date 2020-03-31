import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import { useForm } from "react-hook-form";

const FormPage = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
<<<<<<< HEAD
                  <h4 classNameName = "text-center">Owner Transfer Form</h4>

                    <input placeholder="Vin Number of the Car" ref = {register} name="vinNumber" type="text" className="validate"/>
                    <label for="first_name">Enter Vin Number</label>

                    <input placeholder="Registration Number of the Car" ref = {register} name="regNumber" type="text" className="validate"/>
                    <label for="first_name">Enter Registration Number</label>

                    <input placeholder="Owner's Name" name="name" ref = {register} type="text" className="validate"/>
                    <label for="first_name">Full Name</label>

                    <input placeholder="CNIC" name="CNIC" type="text" ref = {register} className="validate"/>
                    <label for="first_name">CNIC</label>

                    <input placeholder="Contact Number" name="Contact" type="text" ref = {register} className="validate"/>
                    <label for="first_name">Contact Number</label>

                    <input placeholder="City" name="City" type="text" ref = {register} className="validate"/>
                    <label for="first_name">City</label>

                    <input placeholder="State" name="State" type="text" ref = {register} className="validate"/>
                    <label for="first_name">State</label>

                    <input placeholder="Millage" name="millage" ref = {register} type="text" className="validate"/>
                    <label for="first_name">Millage</label>

                    <input placeholder="Year" name="firstname" ref = {register} type="text" className="validate"/>
                    <label for="first_name">Year of transfer</label>
 
                    <button class="btn waves-effect waves-light" type="submit" name="action">Transfer
                        <i class="material-icons right">send</i>
                    </button>
=======
                <h4 classNameName="text-center">Owner Transfer Form</h4>

                <input
                  placeholder="Registration Number of the Car"
                  ref={register}
                  name="regNumber"
                  type="text"
                  className="validate"
                />
                <label for="first_name">Enter Registration Number</label>

                <input
                  placeholder="Owner's Name"
                  name="name"
                  ref={register}
                  type="text"
                  className="validate"
                />
                <label for="first_name">Full Name</label>

                <input
                  placeholder="CNIC"
                  name="CNIC"
                  type="text"
                  ref={register}
                  className="validate"
                />
                <label for="first_name">CNIC</label>

                <input
                  placeholder="Milage"
                  name="milage"
                  ref={register}
                  type="text"
                  className="validate"
                />
                <label for="first_name">Milage</label>

                <input
                  placeholder="Year"
                  name="firstname"
                  ref={register}
                  type="text"
                  className="validate"
                />
                <label for="first_name">Year of transfer</label>

                <button
                  class="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  Transfer
                  <i class="material-icons right">send</i>
                </button>
>>>>>>> Hassaan
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;
