import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import AdminNotification from '../components/AdminNotification';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class AdminNotificationPage extends React.Component{
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
 			<title>Notification</title>
 			<NavBar/>
 				<AdminNotification/>
 			<Footer/>
 			{this.RedirectToLoginPage()}
 		</Fragment>

 		)
 }
}
export default AdminNotificationPage;