import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import MyToken from '../components/MyToken';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class MyTokenPage extends React.Component{
		state = {
			redirectStatus : false,
		}

		

	componentDidMount(){
		   if(!localStorage.getItem('login'))
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
 			<title>My Token</title>
 			<NavBar/>
 			<MyToken/>
 			<Footer/>
		  {this.RedirectToLoginPage()}
 		</Fragment>
 		)
 }
}
export default MyTokenPage;