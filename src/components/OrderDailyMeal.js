import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import API from '../api/API';
import {Redirect} from 'react-router-dom';
import cogoToast from 'cogo-toast';

class UserList extends React.Component{
        state={
            dataTable : [],
            lunch : '0',
            dinner : '0',
            show:false,
            deleteID:"",
            editID:"",
            user_id : "",
            token_no : "",
            isDisabled : false,
            modalTitle : 'Order Today Meal',
            btnText : 'Save Order',
            undoBtn : 'd-none',

        }
    componentDidMount(){
         const user_id = localStorage.getItem('id');
         const token_no = localStorage.getItem('token_no');
         const name = localStorage.getItem('name');
         this.setState({user_id : user_id, token_no : token_no, name: name});

         Axios.get(API.GetTodayOrderInfo + "/" + user_id + "/" + token_no)
         .then(response=>{
            if(response.status == 200 && response.data.length!==0)
            {
                 this.setState({dataTable : response.data, isDisabled : true});
            }
            else {
                 this.setState({isDisabled : false});
            }
         })
         .catch(error=>{
             this.setState({isDisabled : false});
            cogoToast.error("Something went wrong!");

         });
     }

    onSubmitHandler=()=>
    {
        const {lunch, dinner, editID, user_id, token_no} = this.state;
        if(lunch=='0'  && dinner=='0')
        {
            cogoToast.warn('Please choose your meal!')
        }
        else if(editID == ''){
            let myOrder = new FormData();
            myOrder.append('user_id', user_id);
            myOrder.append('token_no', token_no);
            myOrder.append('lunch', Number(lunch));
            myOrder.append('dinner', Number(dinner));
            console.log(myOrder);
           Axios.post(API.OrderDailyMeal, myOrder)
            .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleClose();
                         cogoToast.success('Your today order placed successfully');
                         this.componentDidMount();

                    }
                    else{
                         cogoToast.error(response.data);
                    }
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })
        }
        else
        {
            let editOrder = new FormData();
            editOrder.append("order_id", editID);
            editOrder.append("token_no", token_no);
            editOrder.append("lunch", Number(lunch));
            editOrder.append("dinner", Number(dinner));
             Axios.post(API.ChangeOrderedMeal, editOrder)
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.handleClose();
                         cogoToast.success('Today order updated successfully');
                         this.componentDidMount();

                    }
                    else{
                        this.handleClose();
                         cogoToast.info('Nothing to Changes');
                    }
                 })
                 .catch(error=>{

                      cogoToast.error('Something went wrong!');
                 })
        
     }
    }
    resetForm=()=>{
        this.setState({ lunch : '',dinner : '', btnText : 'Save Order', modalTitle : 'Order Today Meal', editID : '', deleteID : ''});
    }

    handleClose=()=>{
        this.setState({show:false});
        this.resetForm();
    }

    handleOpen=()=>{
        this.setState({ show:true});
    }

    deleteIconOnClick=(id)=>{
                 localStorage.setItem('deleted_order_id', id);
                 const {token_no} = this.state;
                 Axios.get(API.DeleteTodayOrder + id + "/" + token_no)
                 .then(response=>{
                    if(response.status == 200)
                    {
                         this.setState({dataTable : [], undoBtn : '', isDisabled : true});
                         setTimeout(()=>{
                             this.setState({undoBtn : 'd-none'});
                             localStorage.removeItem('deleted_order_id');
                             this.componentDidMount();
                         },4000);
                    }
                    else{
                         cogoToast.error('Something went wrong!');
                    }
                     
                 })
                 .catch(error=>{
                     cogoToast.error('Something went wrong!');
                 })
            }


    restoreOrder=()=>{
        const order_id = localStorage.getItem('deleted_order_id');
         const {token_no} = this.state;
        Axios.get(API.RestoreTodayOrder + order_id + "/" + token_no)
                 .then(response=>{
                         //this.setState({undoBtn : 'd-none', isDisabled : true});
                         // localStorage.removeItem('deleted_order_id');
                         this.componentDidMount();
                        cogoToast.success('Your today order restored successfully');
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })
    }

    editIconOnClick=(id)=>{
       this.handleOpen();
       this.setState({editID:id, modalTitle : 'Update Today Order', btnText : 'Update Order'})
       const{user_id, token_no} = this.state;
       Axios.get(API.GetTodayOrderInfo + "/" + user_id + "/" + token_no)
                 .then(response=>{
                         this.setState({
                            lunch: response.data[0].lunch,
                            dinner: response.data[0].dinner,
                        })
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })

    }
 render(){
    const date = new Date(this.valueOf);
    const {lunch, dinner, btnText, show, name, token_no, isDisabled, undoBtn} = this.state;

    const given_date = date.getFullYear() + "-" + date.getMonth()+1 + "-" + (date.getDate()+1);

 	const columns = [
            {
                name: 'Meal Take Date',
                selector: 'meal_given_date',
                sortable: true,

            },
            {
                name: 'Token No',
                selector: 'token_no',
                sortable: true,
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
                name: 'Delete',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={()=>{
                    if(window.confirm('Do you want to delete today order?')) 
                    {
                        this.deleteIconOnClick(row.id);
                    }
                   }
                }
                  className="btn btn-sm text-danger"><i className="fa fa-trash-alt"/></button>
            },
            {
                name: 'Edit',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={this.editIconOnClick.bind(this,row.id)}  className="btn btn-sm text-success"><i className="fa fa-edit"/></button>
            },
        ];
 	return(
 		<Fragment>
 			 <div className="container-fluid mt-3 animated zoomIn">
                                            <h3 className="text-danger text-center">Place Your Today Order</h3><br/>
                                           <p className= {undoBtn + " text-center text-success"} > <strong>Your today order has been deleted!</strong> <span className="text-danger" onClick={this.restoreOrder} style={{cursor:'pointer'}}>Undo</span></p>
                                            <center><button onClick={this.handleOpen} className="btn btn-info" disabled={isDisabled}>Order Today Meal</button></center>
                                            <hr className="bg-secondary"/>
                                                <DataTable
                                                    noHeader={true}
                                                    paginationPerPage={5}
                                                    pagination={true}
                                                    columns={columns}
                                                    data={this.state.dataTable}
                                                />

                </div>
                <Modal animation={false} className="animated zoomIn" show={show} onHide={show}>
                    <Modal.Header>
                        <strong><p className="text-danger">{this.state.modalTitle}</p></strong>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label"><b>Your Name</b></label>
                        <input value={name} disabled className="form-control form-control-sm" type="text"/> 
                        <label className="form-label "><b>Your Token No</b></label>
                        <input value={token_no} disabled className="form-control form-control-sm" type="text"/>
                         <label className="form-label"><b>Meal Take Date</b></label>
                        <input value={given_date} disabled className="form-control form-control-sm" type="text"/><br/>
                        <label className="form-label"><b>Enter Your Meal Quantity</b></label><br/>
                        <label className="form-label"><b>Lunch</b></label><br/>
                        <input type="number" min="0" max="5" onChange={(e)=> {this.setState({lunch:e.target.value})}} value={lunch}/><br/>
                        <label className="form-label"><b>Dinner</b></label><br/>
                        <input type="number" min="0" max="5" onChange={(e)=> {this.setState({dinner:e.target.value})}} value={dinner}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-sm btn-danger" onClick={this.handleClose}>
                            Close
                        </Button>
                        <button  className="btn btn-sm btn-success"  onClick={this.onSubmitHandler}>
                            {btnText}
                        </button>
                    </Modal.Footer>
                </Modal>
 		</Fragment>
 		)
 }
}
export default UserList;