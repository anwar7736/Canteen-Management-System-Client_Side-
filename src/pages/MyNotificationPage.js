import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import MyNotification from '../components/MyNotification';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class MyNotificationPage extends React.Component{

 render(){
 	return(
 		<Fragment>
 			<title>My All Message List</title>
 			<NavBar/>
 				<MyNotification/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default MyNotificationPage;