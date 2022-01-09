import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import Axios from 'axios';

class OTP extends React.Component{
	constructor(){
		super()
		this.state = {
			email : '',
            otp: '',
            redirectStatus : false,
            totalSec : 300,
            status : false,
            isDisabled : true,
			verifyBtn : 'Verify OTP',
		}
	}
componentDidMount(){
	let email = localStorage.getItem('email_verified');

	if(email!=null)
	{
		this.setState({email : email});
	}

	setInterval(this.countDown,1000); 
	Axios.post('https://api.coderanwar.com/api/GetOTPExpiration', {email : email})
	.then(response=>{
		if(response.data < 0)
		{
			this.setState({status : true});
		}
		else{
			this.setState({totalSec : response.data});
		}
		
	})
	.catch(error=>{

	})    

}

countDown=()=>{
	var totalSec = this.state.totalSec;
	 var min = Math.floor(totalSec / 60);
	 var sec = (totalSec % 60);
	 if(min < 10)
	 {
		 min = '0' + min;
	 }

	 if(sec < 10)
	 {
		 sec = '0' + sec;
	 }
	 if(totalSec==0)
	 {
	   clearInterval(totalSec);
	   return this.setState({status : true, totalSec : ''});
	 }
	 else{
		   document.getElementById('count_down').innerHTML = min + ':' + sec; 
		   this.state.totalSec--;
	 }
   
 }

onChangeHandler=(e)=>
    {
        let otp = e.target.value;
        this.setState({otp : otp});
        if(otp.length===6)
        {
            this.setState({isDisabled : false});
        }
        
       else
        {
            this.setState({isDisabled : true});
        }
    }


OTPVerify=(e)=>{        
	e.preventDefault();
	this.setState({verifyBtn : 'Verifying...'});
	let email = this.state.email;
	let otp = this.state.otp;
	let MyForm = new FormData();
	MyForm.append('email', email);
	MyForm.append('otp', otp);

	Axios.post('https://api.coderanwar.com/api/OTPVerification', MyForm)
	.then(response=>{
		this.setState({verifyBtn : 'Verify OTP', isDisabled : true});
		if(response.status==200 && response.data==1)
		{
			cogoToast.success('OTP Verification Successfully');
			setTimeout(()=>{
				localStorage.setItem('otp_verified', email);
				this.setState({otp : '', isDisabled : true});
				localStorage.removeItem('email_verified');
				this.setState({redirectStatus : true});
			},1000);
			
			document.getElementById('OTPForm').reset();
		}
		else
		{	
			this.setState({verifyBtn : 'Verify OTP', isDisabled : true});
			cogoToast.error('Your OTP is not valid!');
		}
	})
	.catch(error=>{
		 
	})

	}
passwordShowHide=()=>{
	let input = document.getElementById("password");
	let btnText = document.getElementById("showHideBtn");
	if(input.type=="password")
	{
		input.type = "text";
		btnText.innerHTML = '<i class="fa fa-eye-slash"/> Hide Password';
	}
	else
	{
		input.type = "password";
		btnText.innerHTML = '<i class="fa fa-eye"/> Show Password';
	}
}

onRedirectToResetPassword=()=>{
	if(this.state.redirectStatus===true){
		return (
				<Redirect to="/reset_password" />
			   );
	}
} 
onRedirectToEmailVerify=()=>{
	if(this.state.status===true){
		return (
				<Redirect to="/email_verification" />
			   );
	}
}

 render(){

 	return(
 		<Fragment>	
 			<Container className="mt-4 col-lg-5 col-md-5 col-sm-8 col-xs-12">
 						<Form id="OTPForm" onSubmit={this.OTPVerify}>
 							<h2 className="text-center text-danger">Step 02 : OTP Verification</h2>
							 <p>We've already sent 6 digits OTP number in this email : {this.state.email}</p><hr/>
                             <p>This OTP will be expired within <span id="count_down" className="text-danger"></span></p>
                             <hr/>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Enter Valid OTP</Form.Label>
						    <Form.Control value={this.state.otp} maxLength="6" onChange={this.onChangeHandler} type="text" placeholder="Enter your valid OTP number..." />
						    <Form.Text className="text-muted">
						    </Form.Text>
						  </Form.Group>

						  <Button disabled={this.state.isDisabled} variant="success" className="btn-block mb-2" type="submit">
						    {this.state.verifyBtn}	
						  </Button>
						  	<Link to="/email_verification">
						    		<p className="forget-pass">Back to Email Verify</p> 
						    </Link>
						   
					</Form>
 			</Container>
			 {this.onRedirectToResetPassword()}
             {this.onRedirectToEmailVerify()}
 		</Fragment>
 		)
 	
 }
}
export default OTP;