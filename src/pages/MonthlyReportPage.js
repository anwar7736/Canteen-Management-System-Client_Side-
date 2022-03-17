import React, {Component, Fragment} from 'react';
import NavBar from '../components/Navbar';
import MonthlyReport from '../components/MonthlyReport';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class MonthlyReportPage extends React.Component{
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
 			<title>Monthly Statement</title>
 			<NavBar/>
 				<MonthlyReport/>
 			<Footer/>
 			 {this.RedirectToLoginPage()}
 		</Fragment>
 		)
 }
}
export default MonthlyReportPage;