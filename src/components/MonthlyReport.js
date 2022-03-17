import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import API from '../api/API';
import cogoToast from 'cogo-toast';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  

class MonthlyReport extends React.Component{
        state={
            dataTable : [],
            token_no   : '',
            from_date : '',
            to_date   : '',
            years : [],
            selected_year : '',
            selected_month : '',

        }

        componentDidMount=()=>{
         const token_no = localStorage.getItem('token_no');
         this.setState({token_no : token_no});

         Axios.get(API.GetYearsAndMonths)
         .then(response=>{
             this.setState({years : response.data.years});

         })
         .catch(error=>{
            
         });

         Axios.get(API.GetAllMonthlyStatement + token_no)
         .then(response=>{
             this.setState({dataTable : response.data});

         })
         .catch(error=>{
            
         });
     }

       resetForm=()=>{
            // this.setState({selected_year : '', selected_month : ''});
            this.componentDidMount();
        }
     
      filter=()=>{
           const {token_no, selected_year, selected_month} = this.state;

           if(selected_year=='' && selected_month=='')
           {
             cogoToast.warn('Please select your option!');
           }
           else{
                let myData = new FormData();
                myData.append('token_no', token_no);
                myData.append('year', selected_year);
                myData.append('month', selected_month);

              Axios.post(API.GetMonthlyStatementByKey, myData)
             .then(response=>{
                 this.setState({dataTable : response.data});
             })
             .catch(error=>{
                cogoToast.error('Something went wrong!');
             })
           }
         } 

 render(){
    const {years} = this.state;
    const  months = ["January", "February", "March",
					"April", "May", "June",
					 "July", "August", "September",
					 "October",	"November", "December"];
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

 	return(
 		<Fragment>
 			  <div className="container-fluid animated zoomIn transaction-preview">
                    <h3 className="heading-title text-danger text-center m-3">Month Wise Statement</h3><hr/>
                    <div className="row">
                    	<div className="col-xs-12 m-1">
                    		  <b>Year:</b>  <select onChange={(e)=> this.setState({selected_year : e.target.value})}>
                                <option value="" selected >Choose Year</option>
                                {
                                    years.map((item)=>{
                                    	return (<option value={item.year}>{item.year}</option>);
                                    })
                                }
                            </select>
                    	</div>
                    	<div className="col-xs-12 m-1">
                    		 <b>Month:</b> <select onChange={(e)=> this.setState({selected_month : e.target.value})}>
                                <option value="" selected >Choose Month</option>
                                {
                                    months.map((month)=>{
                                    	return (<option value={month}>{month}</option>);
                                    })
                                }
                            </select>
                    	</div>                    	
                    	<div className="col-xs-12 m-1">
                    		 <button onClick={this.filter} className="btn btn-sm btn-success mx-2">Filter</button>
                        <button onClick={this.resetForm} className="btn btn-sm btn-danger mx-2">Refresh</button>
                    	</div>
                    </div>
                        
                    </div>
                <hr/>
  
                    <DataTable
                        noHeader={true}
                        paginationPerPage={5}
                        pagination={true}
                        columns={statements}
                        data={this.state.dataTable}
                    />
                <br/>
                <br/>
                <br/>

 		</Fragment>
 		)
 }
}
export default MonthlyReport;