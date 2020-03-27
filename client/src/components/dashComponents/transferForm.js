import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {useForm} from 'react-hook-form';

const FormPage = () => {

const {register, handleSubmit, errors} = useForm();

const onSubmit = (data) => {
console.log(data);
}

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <h4 classNameName = "text-center">Owner Transfer Form</h4>
              
                    <input placeholder="Registration Number of the Car" ref = {register} name="regNumber" type="text" className="validate"/>
                    <label for="first_name">Enter Registration Number</label>

                    <input placeholder="Owner's Name" name="name" ref = {register} type="text" className="validate"/>
                    <label for="first_name">Full Name</label>

                    <input placeholder="CNIC" name="CNIC" type="text" ref = {register} className="validate"/>
                    <label for="first_name">CNIC</label>

                    <input placeholder="Milage" name="milage" ref = {register} type="text" className="validate"/>
                    <label for="first_name">Milage</label>

                    <input placeholder="Year" name="firstname" ref = {register} type="text" className="validate"/>
                    <label for="first_name">Year of transfer</label>
 
                    <button class="btn waves-effect waves-light" type="submit" name="action">Transfer
                        <i class="material-icons right">send</i>
                    </button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;