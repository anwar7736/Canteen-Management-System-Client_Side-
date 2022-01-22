import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Dashboard from '../components/dashboard';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class PaymentPage extends React.Component{

 render(){
 	return(
 		<Fragment>
 			<title>Dashboard</title>
 			<NavBar/><br/>
 				<h5 className="text-center" >Please click below link for online payment</h5>
 				<center><a  className="btn btn-info text-white" href="http://127.0.0.1:8000/online-payment">Online Payment</a></center>

 			<Footer/>
 		</Fragment>
 		)
 }
}
export default PaymentPage;