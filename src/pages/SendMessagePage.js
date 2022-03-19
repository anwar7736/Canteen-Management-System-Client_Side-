import React, {Component, Fragment} from 'react';
import NavBar from '../components/Navbar';
import SendMessage from '../components/SendMessage';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class SendMessagePage extends React.Component{
	constructor(){
		super();
		this.state = {
			redirectStatus : false,
		}

		}

	componentDidMount(){
		   if(localStorage.getItem('login')==null)
            {
                 this.setState({redirectStatus : true});
            }
	}

	RedirectToLoginPage=()=>{
		if(this.state.redirectStatus==true)
		{
			return (
					<Redirect to="/login" />
					);
		}
	}
 render(){
 	return(
 		<Fragment>
 				<title>Send Message</title>
 			<NavBar/>
 				<SendMessage/>
 				<Footer/>
				{this.RedirectToLoginPage()}
 		</Fragment>
 		)
 }
}
export default SendMessagePage;