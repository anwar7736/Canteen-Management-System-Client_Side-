import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import API from '../api/API';
import cogoToast from 'cogo-toast';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  

class DayWiseMeal extends React.Component{
        state={
            dataTable : [],
            user_id   : '',
            from_date : '',
            to_date   : '',
        }

        componentDidMount=()=>{
         const user_id = localStorage.getItem('id');
         this.setState({user_id : user_id});

         Axios.get(API.GetAllMealByUser + user_id)
         .then(response=>{
             this.setState({dataTable : response.data});

         })
         .catch(error=>{
            
         });
     }

       resetForm=()=>{
            this.setState({from_date : '', to_date : ''});
            this.componentDidMount();
        }
     
      filterByDate=()=>{
           const {user_id, from_date, to_date} = this.state;

           if(from_date=='' || to_date=='')
           {
             cogoToast.warn('Both dates are required!');
           }
           else{
                let myData = new FormData();
                myData.append('user_id', user_id);
                myData.append('from_date', from_date);
                myData.append('to_date', to_date);

              Axios.post(API.GetMealFilterByDate, myData)
             .then(response=>{
                 this.setState({dataTable : response.data});
             })
             .catch(error=>{
                cogoToast.error('Something went wrong!');
             })
           }
         } 

 render(){
    const {from_date, to_date} = this.state;
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
            {
                name: 'Is_Parcel',
                selector: 'is_parcel',
                sortable: true,
            }, 
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            }, 
        ];

 	return(
 		<Fragment>
 			  <div className="container-fluid animated zoomIn transaction-preview">
                    <h3 className="heading-title text-danger text-center m-3">Day Wise Meal Report</h3><hr/>
                    <div className="input-group">
                        From : <input value={from_date} onChange={(e)=> {this.setState({from_date:e.target.value})}} className="w-25 form-control form-control-sm mx-2" type="date"/>
                        To : <input value={to_date} onChange={(e)=> {this.setState({to_date:e.target.value})}} className="w-25 form-control form-control-sm mx-2" type="date"/>
                        <button onClick={this.filterByDate} className="btn btn-sm btn-success mx-2">Filter</button>
                        <button onClick={this.resetForm} className="btn btn-sm btn-danger mx-2">Refresh</button>
                    </div>
                </div>
                <hr/>
                    <DataTable
                        noHeader={true}
                        paginationPerPage={5}
                        pagination={true}
                        columns={columns}
                        data={this.state.dataTable}
                    />
                <br/>
                <br/>
                <br/>

 		</Fragment>
 		)
 }
}
export default DayWiseMeal;