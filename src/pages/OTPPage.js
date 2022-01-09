
import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import OTPVerify from '../components/otp';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class OTPPage extends React.Component{
	constructor(){
		super();
		this.state = {
			redirectStatus : false,
		}
		}

	componentDidMount(){
		   if(localStorage.getItem('email_verified')==null)
            {
                this.setState({redirectStatus : true});
            }
	}
	RedirectToEmailVerifyPage=()=>{
		if(this.state.redirectStatus==true)
		{
			return (
					<Redirect to="/email_verification" />
					);
		}
	}

 render(){
 	return(
 		<Fragment>
 		    <title>OTP Verification</title>
 			<NavBar/>
 			<OTPVerify/>
 			<Footer/>
			 {this.RedirectToEmailVerifyPage()}
 		</Fragment>
 		)
 }
}
export default OTPPage;