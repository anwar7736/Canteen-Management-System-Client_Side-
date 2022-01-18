import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import OrderDailyMeal from '../components/OrderDailyMeal';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class OrderDailyMealPage extends React.Component{

 render(){
    return(
        <Fragment>
            <title>CMS | Order Daily Meal</title>
            <NavBar/>
                <OrderDailyMeal/>
            <Footer/>
        </Fragment>
        )
 }
}
export default OrderDailyMealPage;