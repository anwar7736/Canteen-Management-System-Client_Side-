import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import SiteLogin from '../components/login';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class Login extends React.Component{
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
 			<title>CMS | Login</title>
 			<NavBar/>
 			<SiteLogin/>
 			<Footer/>
		  {this.RedirectToHomePage()}
 		</Fragment>
 		)
 }
}
export default Login;