import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import AdminNotification from '../components/AdminNotification';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class AdminNotificationPage extends React.Component{

 render(){
 	return(
 		<Fragment>
 			<title>CMS | 404</title>
 			<NavBar/>
 				<AdminNotification/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default AdminNotificationPage;