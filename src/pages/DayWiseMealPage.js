import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import DayWiseMeal from '../components/DayWiseMeal';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class DayWiseMealPage extends React.Component{
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
 			<title>Day Wise Meal Report</title>
 			<NavBar/>
 				<DayWiseMeal/>
 			<Footer/>
 			 {this.RedirectToLoginPage()}
 		</Fragment>
 		)
 }
}
export default DayWiseMealPage;