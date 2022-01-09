import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import EmailVerify from '../components/email';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class EmailPage extends React.Component{
	constructor(){
		super();
		this.state = {
			redirectStatus : false,
		}

		}


	componentDidMount(){
		if(localStorage.getItem('login')!=null)
		{
			this.setState({redirectStatus : true});
		}
		
		localStorage.removeItem('email_verified');
		localStorage.removeItem('otp_verified');

	}

	RedirectToHomePage=()=>{
		if(this.state.redirectStatus==true)
		{
			return (
					<Redirect to="/" />
					);
		}
	}

 render(){
 	return(
 		<Fragment>
 			<title>Email Verification</title>
 			<NavBar/>
 			<EmailVerify/>
 			<Footer/>  
			{this.RedirectToHomePage()}
 		</Fragment>
 		)
 }
}
export default EmailPage;