import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Dashboard from '../components/dashboard';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class DashboardPage extends React.Component{

 render(){
 	return(
 		<Fragment>
 			<title>Dashboard</title>
 			<NavBar/>
 				<Dashboard/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default DashboardPage;