import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import DayWiseMeal from '../components/DayWiseMeal';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class DayWiseMealPage extends React.Component{

 render(){
 	return(
 		<Fragment>
 			<title>CMS | Day Wise Meal Report</title>
 			<NavBar/>
 				<DayWiseMeal/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default DayWiseMealPage;