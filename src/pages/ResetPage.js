import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Reset from '../components/reset';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class ResetPage extends React.Component{
	constructor(){
		super();
		this.state = {
			redirectStatus : false,
		}
		}

	componentDidMount(){
		   if(localStorage.getItem('otp_verified')==null)
            {
                this.setState({redirectStatus : true});
            }
	}

	RedirectToOTPVerifyPage=()=>{
		if(this.state.redirectStatus==true)
		{
			return (
					<Redirect to="/otp_verification" />
					);
		}
	}

 render(){
 	return(
 		<Fragment>
 			<title>Reset Password</title>
 			<NavBar/>
 			<Reset/>
 			<Footer/>
			 {this.RedirectToOTPVerifyPage()}
 		</Fragment>
 		)
 }
}
export default ResetPage;