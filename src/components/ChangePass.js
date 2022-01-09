import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import {Redirect} from 'react-router-dom';
import {Link} from "react-router-dom";
import Axios from 'axios';

class ChangePass extends React.Component{
	constructor(){
		super()
		this.state = {
			username : '',
			new_pass : '',
			confirm_pass : '',
			updateBtn : 'Update Password',
			isDisabled : false,
		}
	}
	componentDidMount() {
		let username = localStorage.getItem('current_user');
		if(username!==null)
		{
			this.setState({username : username});
		}
	}
	

ChangePassword=(e)=>{
	e.preventDefault();
	let username = this.state.username;
	let new_pass = this.state.new_pass;
	let confirm_pass = this.state.confirm_pass;
	if(new_pass=='')
	{
		 cogoToast.error('New Password is Required!')
	}
	else if(new_pass.length < 3)
	{
		 cogoToast.error('New Password is to Short!')
	}
	else if(confirm_pass=='')
	{
		 cogoToast.error('Confirm Password is Required!')
	}
	else if(new_pass!==confirm_pass)
	{
		 cogoToast.error('Both Password does not Match!')
	}
	else{

		this.setState({updateBtn : 'Updating...', isDisabled : true});
		let MyForm = new FormData();
		MyForm.append('username', username);
		MyForm.append('newpass', new_pass);
		Axios.post('https://api.coderanwar.com/api/ChangePassword', MyForm)
                 .then(response=>{
                   if(response.status===200 && response.data===1)
                   {
                   		cogoToast.success('Password Changed Successfully');
						   this.setState({
							updateBtn : 'Update Password', 
							isDisabled : false, 
							new_pass : '',
							confirm_pass : ''
						});
                   }
                   else if(response.status===200 && response.data===0)
                   {
						this.setState({
							updateBtn : 'Update Password', 
							isDisabled : false, 
							new_pass : '',
							confirm_pass : ''
						});
						cogoToast.error('Something went wrong!');
                   }
                 })
                 .catch(error=>{
                   cogoToast.error('Something went wrong!');
                 })
	}
}
 render(){
 	return(
 		<Fragment>
 			<div className="container mt-4 col-lg-5 col-md-5 col-sm-8 col-xs-12">
 						<Form onSubmit={this.ChangePassword}>
 								<h2 className="text-center text-danger">Change Password</h2>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Username </Form.Label>
						    <Form.Control disabled value={this.state.username} onChange={(e)=>{this.setState({email:e.target.value})}} type="text" placeholder="Enter email" />
						    <Form.Text className="text-muted">
						    </Form.Text>
						  </Form.Group>
						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Enter New Password</Form.Label>
						    <Form.Control value={this.state.new_pass} onChange={(e)=>{this.setState({new_pass:e.target.value})}} type="password" placeholder="Enter new password" />
						  </Form.Group>
						  <Form.Group controlId="formPassword">
						  <Form.Label>Enter Confirm New Password</Form.Label>
						    <Form.Control value={this.state.confirm_pass} onChange={(e)=>{this.setState({confirm_pass:e.target.value})}} type="password" placeholder="Re-type new password" />
						  </Form.Group>
						  <Button disabled={this.state.isDisabled} variant="info" className="btn-block" type="submit">
						  {this.state.updateBtn}
						  </Button><br/>
						    <Link href="/login">
						    <p className="forget-pass">Back to Login</p> 
						    </Link>
						</Form>
 			</div>
 		</Fragment>
 		)
 	
 }
}
export default ChangePass;