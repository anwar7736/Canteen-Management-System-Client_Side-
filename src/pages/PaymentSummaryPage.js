import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import PaymentSummary from '../components/PaymentSummary';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class PaymentSummaryPage extends React.Component{

 render(){
 	return(
 		<Fragment>
 			<title>Payment Summary</title>
 			<NavBar/>
 				<PaymentSummary/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default PaymentSummaryPage;