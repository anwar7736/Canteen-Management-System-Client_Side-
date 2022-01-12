import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import Axios from 'axios';

class Reset extends React.Component{
	constructor(){
		super()
		this.state = {
			email : '',
			new_pass : '',
			confirm_pass : '',
			redirectStatus : false,
			updateBtn : 'Update Password',
			isDisabled : false,
		}
	}
componentDidMount(){
	let email = localStorage.getItem('otp_verified');

	if(email!=null)
	{
		this.setState({email : email});
	}
}

ResetPassword=(e)=>{
	e.preventDefault();
	let email = this.state.email;
	let new_pass = this.state.new_pass;
	let confirm_pass = this.state.confirm_pass;
	if(new_pass=='')
	{
		 cogoToast.warn('New Password Field is Required!')
	}

	else if(new_pass.length < 3)
	{
		cogoToast.warn('New Password is Too Short!')
	}

	else if(confirm_pass=='')
	{
		 cogoToast.warn('Confirm Password Field is Required!')
	}
	
	else if(new_pass!==confirm_pass)
	{
		cogoToast.warn('Both Password are Does Not Match!')
	}

	else{
		this.setState({updateBtn : 'Updating...', isDisabled : true});
		Axios.post('https://api.coderanwar.com/api/ResetPassword', {email : email, password : new_pass})
                 .then(response=>{
						if(response.status==200 && response.data==1)
						{
							cogoToast.success('Password Reset Successfully');
							this.setState({
								updateBtn : 'Update Password', 
								isDisabled : false, 
							});
							setTimeout(()=>{
								this.setState({redirectStatus : true});
							},1000);

							localStorage.removeItem('otp_verified');
							
						}
                        else
						{
							this.setState({updateBtn : 'Update Password', isDisabled : false});
                         	cogoToast.error(response.data);
						}
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })
	}
}
passwordShowHide=()=>{
	let input = document.getElementById("password");
	let btnText = document.getElementById("showHideBtn");
	if(input.type=="password")
	{
		input.type = "text";
		btnText.innerHTML = '<i class="fa fa-eye-slash"/> Hide Password';
	}
	else
	{
		input.type = "password";
		btnText.innerHTML = '<i class="fa fa-eye"/> Show Password';
	}
}

onRedirectToLoginPage=()=>{
	if(this.state.redirectStatus===true){
		return (
				<Redirect to="/login" />
			   );
	}
}

 render(){

 	return(
 		<Fragment>
 			<Container className="mt-4 col-lg-5 col-md-5 col-sm-8 col-xs-12">
			 			<span id="count_down" className="d-none"></span>
 						<Form onSubmit={this.ResetPassword}>
 							<h2 className="text-center text-danger">Step 03 : Reset Password</h2>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Your Email Address</Form.Label>
						    <Form.Control value={this.state.email} disabled type="text" placeholder="example@gmail.com" />
						  </Form.Group> 
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Enter New Password</Form.Label>
						    <Form.Control value={this.state.new_pass} onChange={(e)=>{this.setState({new_pass:e.target.value})}} type="password" placeholder="Enter your new password..." />
						  </Form.Group>  
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Enter Confirm Password</Form.Label>
						    <Form.Control value={this.state.confirm_pass} onChange={(e)=>{this.setState({confirm_pass:e.target.value})}} type="password" placeholder="Re-type your 	new password..." />
						  </Form.Group> 

						  <Button disabled={this.state.isDisabled} variant="success" className="btn-block mb-2" type="submit">
						    {this.state.updateBtn}
						  </Button>
						  	<Link to="/login">
						    		<p className="forget-pass">Back to Login Page</p> 
						    </Link>
						   
					</Form>
 			</Container>
			 {this.onRedirectToLoginPage()}
 		</Fragment>
 		)
 	
 }
}
export default Reset;