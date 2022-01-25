import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import MyNotification from '../components/MyNotification';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class MyNotificationPage extends React.Component{
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
 			<title>My All Message List</title>
 			<NavBar/>
 				<MyNotification/>
 			<Footer/>
 			 {this.RedirectToLoginPage()}
 		</Fragment>
 		)
 }
}
export default MyNotificationPage;