import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import Axios from 'axios';

class Email extends React.Component{
	constructor(){
		super()
		this.state = {
			email : '',
			password : '',
			isChecked : true,
			redirectStatus : false,
			verifyBtn : 'Verify Email',
			isDisabled : false,
		}
	}

EmailVerify=(e)=>{
	e.preventDefault();
	let email = this.state.email;
	let EmailRegx= /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
	if(email=='')
	{
		 cogoToast.warn('Email Address Field is Required!');
	}
	else if(!EmailRegx.test(email))
	{
		cogoToast.error('Invalid Email Address!');
	}
	else{
		this.setState({verifyBtn : 'Verifying....', isDisabled : true});
		Axios.post('https://api.coderanwar.com/api/EmailVerification', {email:email})
                 .then(response=>{
                    if(response.status==200 && response.data=='1')
                    {
						this.setState({
							verifyBtn : 'Verify Email',
							email : '',
							isDisabled : false, 
						});
						cogoToast.success('Please check your mail');
                        localStorage.setItem('email_verified', email);
						setTimeout(()=>{
							this.setState({redirectStatus : true});
						},1000)
                    }
                   
                    else if(response.status==200 && response.data==='Email address does not exists.'){
						this.setState({verifyBtn : 'Verify Email', isDisabled : true});
						this.setState({email : ''});
                         cogoToast.error(response.data);
                    }
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })
	}
}

RedirectToOTPVerifyPage=()=>{
	if(this.state.redirectStatus==true)
	{
		return(
				<Redirect to="/otp_verification" />
			);
	}
}
 render(){

 	return(
 		<Fragment>
 			<Container className="mt-4 col-lg-5 col-md-5 col-sm-8 col-xs-12">
					    <span id="count_down" className="d-none"></span>
 						<Form onSubmit={this.EmailVerify}>
 							<h2 className="text-center text-danger">Step 01 : Email Verification</h2>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Enter Email Address</Form.Label>
						    <Form.Control value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} type="text" placeholder="Enter email address..." />
						    <Form.Text className="text-muted">
						    </Form.Text>
						  </Form.Group>
						  <Button variant="success" disabled={this.state.isDisabled} className="btn-block mb-2" type="submit">
						   {this.state.verifyBtn}	
						  </Button>
						 	<Link to="/login">
						    		<p className="forget-pass">Back to Login Page</p> 
						    </Link>
						   
					</Form>
 			</Container>
			 {this.RedirectToOTPVerifyPage()}
 		</Fragment>
 		)
 	
 }
}
export default Email;