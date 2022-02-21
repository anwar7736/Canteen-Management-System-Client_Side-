import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import API from '../api/API';
import {Redirect} from 'react-router-dom';
import {Link} from "react-router-dom";
import Axios from 'axios';

class SendMessage extends React.Component{
		state = {
			author_name : '',
			msg_title : '',
			msg_body : '',
			submitBtn : 'Submit',
			isDisabled : false,
		}
	componentDidMount() {

	}
	

SendMessage=(e)=>{
	e.preventDefault();
	const {author_name, msg_title, msg_body} = this.state;
	const id = localStorage.getItem('id');

	if(author_name=='')
	{
		 cogoToast.error('Fullname field is required!')
	}
	else if(msg_title=='')
	{
		 cogoToast.error('Message title field is required!')
	}
	else if(msg_body=='')
	{
		 cogoToast.error('Message description field is required!')
	}
	else{

		this.setState({submitBtn : 'Submitting...', isDisabled : true});
		let MyForm = new FormData();
		MyForm.append('author_id', id);
		MyForm.append('author_role', 'user');
		MyForm.append('author_name', author_name);
		MyForm.append('msg_title', msg_title);
		MyForm.append('msg_body', msg_body);
		Axios.post(API.SendMessage, MyForm)
                 .then(response=>{
                   if(response.status===200 && response.data===1)
                   {
                   		cogoToast.success('Message has been sent.');
						   this.setState({
							submitBtn : 'Submit', 
							isDisabled : false, 
							author_name : '',
							msg_title : '',
							msg_body : ''
						});
                   }
                   else if(response.status===200 && response.data===0)
                   {
						this.setState({
							submitBtn : 'Submit', 
							isDisabled : false, 
							author_name : '',
							msg_title : '',
							msg_body : ''
						});
						cogoToast.error('Something went wrong!');
                   }
                 })
                 .catch(error=>{
                   cogoToast.error('Something went wrong!');
                 })
	}
}
 render(){
 	return(
 		<Fragment>
 			<div className="container mt-4 col-lg-5 col-md-5 col-sm-8 col-xs-12 animated zoomIn">
 						<Form onSubmit={this.SendMessage}>
 								<h2 className="text-center text-danger">Send Message To Admin</h2>
						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Enter Your Fullname</Form.Label>
						    <Form.Control value={this.state.author_name} onChange={(e)=>{this.setState({author_name:e.target.value})}} type="text" placeholder="Enter your fullname..." />
						  </Form.Group>
						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Enter Message Title</Form.Label>
						    <Form.Control value={this.state.msg_title} onChange={(e)=>{this.setState({msg_title:e.target.value})}} type="text" placeholder="Enter message title..." />
						  </Form.Group>
						  <Form.Group controlId="formPassword">
						  <Form.Label>Enter Message Body</Form.Label>
						   <textarea className="col-md-12" rows="6" value={this.state.msg_body} placeholder="Enter message description..." onChange={(e)=> {this.setState({msg_body:e.target.value})}}></textarea>
						  </Form.Group>
						  <Button disabled={this.state.isDisabled} variant="success" className="btn-block" type="submit">
						  {this.state.submitBtn}
						  </Button><br/>
						    <Link to="/">
						    <p className="forget-pass">Back to Home</p>
						    </Link>
						</Form><br/><br/>
 			</div>
 		</Fragment>
 		)
 	
 }
}
export default SendMessage;