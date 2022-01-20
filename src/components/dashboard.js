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
            cogoToast.error('Something went wrong!');
         });

         Axios.get(API.LastSevenDaysMealReport + user_id)
         .then(response=>{
             this.setState({LastSevenDaysMealReport : response.data});

         })
         .catch(error=>{
            cogoToast.error('Something went wrong!');
         }); 

         // Axios.get(API.LastFivePaymentDetails + user_id)
         // .then(response=>{
         //     this.setState({LastFivePaymentDetails : response.data});

         // })
         // .catch(error=>{
         //    cogoToast.error('Something went wrong!');
         // });

         // Axios.get(API.LastFiveMonthsStatements + user_id)
         // .then(response=>{
         //     this.setState({LastFiveMonthsStatements : response.data});

         // })
         // .catch(error=>{
         //    cogoToast.error('Something went wrong!');
         // });
     }


 render(){
    const {from_date, to_date} = this.state;
    const columns = [
            {
                name: 'Meal Given Date',
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

 	return(
 		<Fragment>
        <div className="container" style={{marginBottom : '100px'}}>   
            <h4 className="text-center bg-danger text-light p-2 my-2">Dashboard Summary</h4>
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
                        columns={columns}
                        data={this.state.LastSevenDaysMealReport}
                    />
                </div>
                <div className="col-md-6">
                <h6 className="text-center text-danger">Last Five Months Statement</h6>
                    <DataTable
                        noHeader={true}
                        paginationPerPage={5}
                        pagination={true}
                        columns={columns}
                        data={this.state.LastSevenDaysMealReport}
                    />
                </div>
            </div>
        </div>  
 		</Fragment>
 		)
 }
}
export default Dashboard;