import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import API from '../api/API';
import cogoToast from 'cogo-toast';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  

class Dashboard extends React.Component{
        state={
            LastSevenDaysMealReport : [],
            LastFivePaymentDetails : [],
            LastFiveMonthsStatements : [],
            meal_rate : [],
            total_lunch : '',
            total_dinner : '',
            total_meal : '',
            total_cost : '',
            total_payment : '',
            total_due : '',
            total_working_day : '',
            Remaining_working_day : '',
            unread_notification : '',
            total_sending_message : '',

        }

        componentDidMount=()=>{
         const user_id = localStorage.getItem('id');
         const token_no = localStorage.getItem('token_no');

         this.setState({user_id : user_id});

         Axios.get(API.CountDashboardSummary + user_id)
         .then(response=>{
             this.setState({ 
                        meal_rate : response.data['Meal_Rate'][0],
                        total_lunch : response.data["Lunch"],
                        total_dinner : response.data["Dinner"],
                        total_meal : response.data["Total_Meal"],
                        total_cost : response.data["Total_Cost"],
                        total_payment : response.data["Total_Payment"],
                        total_due : response.data["Total_Due"],
                        total_working_day : response.data["Total_Working_Day"],
                        Remaining_working_day : response.data["Remaining_Working_Day"],
                        unread_notification : response.data["Unread_Notification"],
                        total_sending_message : response.data["Total_Sending_Message"],

                 });

         })
         .catch(error=>{
            
         });

         Axios.get(API.LastSevenDaysMealReport + user_id)
         .then(response=>{
             this.setState({LastSevenDaysMealReport : response.data});

         })
         .catch(error=>{
            
         }); 

         Axios.get(API.LastFivePaymentDetails + token_no)
         .then(response=>{
             this.setState({LastFivePaymentDetails : response.data});

         })
         .catch(error=>{
            
         });

         Axios.get(API.LastFiveMonthsStatements + token_no)
         .then(response=>{
             this.setState({LastFiveMonthsStatements : response.data});

         })
         .catch(error=>{
            
         });
     }


 render(){

    const columns = [
            {
                name: 'Meal Take Date',
                selector: 'meal_given_date',
                sortable: true,

            },
            {
                name: 'Token No',
                selector: 'token_no',
                sortable: false,
            },
            {
                name: 'Lunch',
                selector: 'lunch',
                sortable: true,
            },
            {
                name: 'Dinner',
                selector: 'dinner',
                sortable: true,
            }, 
            {
                name: 'Total Meal',
                selector: 'total_meal',
                sortable: true,
            }, 
            {
                name: 'Total Amount',
                selector: 'total_amount',
                sortable: true,
            },
        ]; 

        const payments = [
            {
                name: 'Date',
                selector: 'payment_date',
                sortable: true,

            }, 
            {
                name: 'Name',
                selector: 'name',
                sortable: true,

            },
            {
                name: 'Token No',
                selector: 'token_no',
                sortable: false,
            },
            {
                name: 'Amount',
                selector: 'amount',
                sortable: true,
            },
            {
                name: 'TrxID',
                selector: 'transaction_id',
                sortable: true,
            }, 
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            }, 
        ];

         const statements = [
            {
                name: 'Year',
                selector: 'year',
                sortable: true,

            },  
            {
                name: 'Month',
                selector: 'month',
                sortable: true,

            }, 
            {
                name: 'Token No',
                selector: 'token_no',
                sortable: false,
            },
            {
                name: 'Total Lunch',
                selector: 'total_lunch',
                sortable: true,

            },
            {
                name: 'Lunch Cost',
                selector: 'lunch_cost',
                sortable: true,

            },
            {
                name: 'Total Dinner',
                selector: 'total_dinner',
                sortable: true,
            },
            {
                name: 'Dinner Cost',
                selector: 'dinner_cost',
                sortable: true,
            }, 
            {
                name: 'Total Meal',
                selector: 'total_meal',
                sortable: true,
            },  
            {
                name: 'Total Cost',
                selector: 'total_cost',
                sortable: true,
            },  
            {
                name: 'Total Payment',
                selector: 'total_payment',
                sortable: true,
            },  
            {
                name: 'Give',
                selector: 'give',
                sortable: true,
            },  
            {
                name: 'Take',
                selector: 'take',
                sortable: true,
            }, 
        ];

        const months = ["January", "February", "March", 
                        "April", "May", "June", 
                        "July", "August", "September", 
                        "October", "November", "December"];
 	return(
 		<Fragment>
        <div className="container animated zoomIn" style={{marginBottom : '100px'}}>   
            <h4 className="text-center bg-danger text-light p-2 my-2">Dashboard Summary</h4>
             <h3 className="text-center bg-light text-success p-2 my-2">Month of <span>{months[new Date().getMonth()]}</span> <span className="text-danger">{new Date().getFullYear()}</span></h3>
             <hr/>
            <div className="row m-3">
                <div className="col-md-3 mb-3">
                    <div class="card">
                        <div className="card-body text-center">
                            <h3 className="text-success">Total Lunch</h3>
                            <h1 className="text-danger card-item">{this.state.total_lunch}</h1>
                        </div>
                    </div>
                </div> 
                <div className="col-md-3 mb-3">
                    <div class="card">
                        <div className="card-body text-center">
                            <h3 className="text-success">Total Dinner</h3>
                            <h1 className="text-danger card-item">{this.state.total_dinner}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div class="card">
                        <div className="card-body text-center">
                            <h3 className="text-success">Total Meal</h3>
                            <h1 className="text-danger card-item">{this.state.total_meal}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div class="card">
                        <div className="card-body text-center">
                            <h3 className="text-success">Total Cost</h3>
                            <h1 className="text-danger card-item">{this.state.total_cost}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div class="card">
                        <div className="card-body text-center">
                            <h3 className="text-success">Total Payment</h3>
                            <h1 className="text-danger card-item">{this.state.total_payment}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div class="card">
                        <div className="card-body text-center">
                            <h3 className="text-success">Total Due</h3>
                            <h1 className="text-danger card-item">{this.state.total_due}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div class="card">
                        <div className="card-body text-center">
                            <h3 className="text-success">Unread Msg</h3>
                            <h1 className="text-danger card-item">{this.state.unread_notification}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div class="card">
                        <div className="card-body text-center">
                            <h3 className="text-success">Send Message</h3>
                            <h1 className="text-danger card-item">{this.state.total_sending_message}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <hr/><h5 className="text-center text-danger">Last 7 Days Meal Summary</h5>
            <div className="row">
                <div className="col-md-12">
                    <DataTable
                        noHeader={true}
                        paginationPerPage={5}
                        pagination={true}
                        columns={columns}
                        data={this.state.LastSevenDaysMealReport}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-md-6">
                    <h6 className="text-center text-danger">Last Five Payment Details</h6>
                    <DataTable
                        noHeader={true}
                        paginationPerPage={5}
                        pagination={true}
                        columns={payments}
                        data={this.state.LastFivePaymentDetails}
                    />
                </div>
                <div className="col-md-6">
                <h6 className="text-center text-danger">Last Five Months Statement</h6>
                    <DataTable
                        noHeader={true}
                        paginationPerPage={5}
                        pagination={true}
                        columns={statements}
                        data={this.state.LastFiveMonthsStatements}
                    />
                </div>
            </div>
        </div>  
 		</Fragment>
 		)
 }
}
export default Dashboard;