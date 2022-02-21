import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import OrderDailyMeal from '../components/OrderDailyMeal';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class OrderDailyMealPage extends React.Component{
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
            <title>Order Daily Meal</title>
            <NavBar/>
                <OrderDailyMeal/>
            <Footer/>
             {this.RedirectToLoginPage()}
        </Fragment>
        )
 }
}
export default OrderDailyMealPage;