import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import {Link} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import Axios from 'axios';

class Login extends React.Component{
		state = {
			username : 'anwar1234',
			password : '123',
			isChecked : true,
			redirectStatus : false,
			isDisabled : false,
		}
	
componentDidMount(){
	let user = localStorage.getItem('user');
	let pass = localStorage.getItem('pass')
	if(user!==null && pass!==null)
	{
		this.setState({username : user, password : pass, isChecked : true});
	}
}
RememberOnChange=()=>{
	if(this.state.isChecked==false)
	{
		this.setState({isChecked : true});
	}
	else
	{
		this.setState({isChecked : false});
	}
}

Login=(e)=>{
	e.preventDefault();
	let {username, password} = this.state;
	if(username=='')
	{
		 cogoToast.warn('Username Field is Required!')
	}
	else if(password=='')
	{
		 cogoToast.warn('Password Field is Required!')
	}
	else{
		 this.setState({isDisabled : true});
		Axios.post('https://api.coderanwar.com/api/login', {username:username, password:password})
                 .then(response=>{
       //              if(response.status==200 && response.data[0]==='admin')
       //              {
       //              	 this.setState({isDisabled : false});
       //                   // localStorage.setItem('login', true);
						 // localStorage.setItem('current_user', username);
       //                   localStorage.setItem('admin_verification', true);
       //                   localStorage.setItem('email_verified', response.data[1]);
       //                   if(this.state.isChecked==true)
       //                   {
       //                   	localStorage.setItem('user', this.state.username);
       //                   	localStorage.setItem('pass', this.state.password);
       //                   }
       //                   else
       //                   {
       //                   	let user = localStorage.getItem('user');
							// let pass = localStorage.getItem('pass');
							// if(user!==null && pass!==null)
							// {
							// 	localStorage.removeItem('user');
							// 	localStorage.removeItem('pass');	
							// }
       //                   }
       //                  this.setState({redirectStatus : true});
                    //}
                    if (response.status==200 && response.data[0]==='user')
                    {
                    	 this.setState({isDisabled : false});
                    	localStorage.setItem('login', true);
                         localStorage.setItem('user', true);
                         localStorage.setItem('id', response.data[1]['id']);
                         localStorage.setItem('name', response.data[1]['name']);
                         // localStorage.setItem('username', response.data[1]['username']);
                         // localStorage.setItem('email', response.data[1]['email']);
                         // localStorage.setItem('phone', response.data[1]['phone']);
                         localStorage.setItem('photo', response.data[1]['photo']);
                         // localStorage.setItem('address', response.data[1]['address']);
                         if(this.state.isChecked==true)
                         {
                         	localStorage.setItem('user', this.state.username);
                         	localStorage.setItem('pass', this.state.password);
                         }
                         else
                         {
                         	let user = localStorage.getItem('user');
							let pass = localStorage.getItem('pass');
						if(user!==null && pass!==null)
						{
							localStorage.removeItem('user');
							localStorage.removeItem('pass');	
						}
                         }
						 
						 this.setState({redirectStatus : true});
                    }


                    else if(response.data === 0){
                         cogoToast.error("Username or password is wrong!");
                          this.setState({isDisabled : false});
                    }
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                     this.setState({isDisabled : false});
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

RedirectToHomePage=()=>{
	if(this.state.redirectStatus==true)
	{
		if(localStorage.getItem('email_verified'))
		{
			return (
				<Redirect to="/otp_verification" />
				);
		}
		else {
			return (
				<Redirect to="/user_profile" />
				);
		}
	}
}

 render(){

 	return(
 		<Fragment>
 			<Container className="mt-4 col-lg-5 col-md-5 col-sm-8 col-xs-12">
 						<Form onSubmit={this.Login}>
 							<h2 className="text-center text-danger"><b>LOGIN</b></h2>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Enter Username</Form.Label>
						    <Form.Control value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} type="text" placeholder="Enter username" />
						    <Form.Text className="text-muted">
						    </Form.Text>
						  </Form.Group>
						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Enter Password</Form.Label>
						    <Form.Control value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} type="password" placeholder="Enter password" id="password"/>
						    <button id="showHideBtn" onClick={this.passwordShowHide} type="button" className="btn mt-0"><i class="fa fa-eye"/> Show Password</button>
						  </Form.Group>
						  <Form.Group className="mb-3" controlId="formBasicCheckbox">
							<Form.Check type="checkbox" onChange={this.RememberOnChange} defaultChecked={this.state.isChecked} className="text-primary" label="Remember me" />
						   </Form.Group>
						  <Button variant="success" className="btn-block mb-1" type="submit" disabled={this.state.isDisabled}>
						    Login	
						  </Button>
						  <Form.Group>
						   	<Link to="/email_verification">
						    		<p className="forget-pass">Forgotten Password?</p> 
						    </Link>
						  </Form.Group><br/><br/>
						   
					</Form>
 			</Container>
			 {this.RedirectToHomePage()}
 		</Fragment>
 		)
 	
 }
}
export default Login;