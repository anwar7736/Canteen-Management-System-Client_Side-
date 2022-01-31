import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from 'react-router-dom';
import API from '../api/API';
import {Redirect} from 'react-router';
import cogoToast from 'cogo-toast';
import Axios from 'axios';

class Profile extends Component {
       state = {
            PageRefreshStatus : false,
            name : '',
            username : '',
            email : '',
            phone : '',
            photo : '',
            address : '',
            previewImg : '',
            updateBtn : 'Update Profile',
        }
    componentDidMount(){
        let user_id= localStorage.getItem('id');
        Axios.get(API.GetUserProfile+"/"+user_id)
        .then(response=>{
            if(response.status===200)
            {
                this.setState({
                    name : response.data['name'],
                    username : response.data['username'],
                    email : response.data['email'],
                    phone : response.data['phone'],
                    previewImg : response.data['photo'],
                    address : response.data['address'],
                })
            }
        })
        .catch(error=>{

        })
     }
    onUpdateProfile=(e)=>{
     e.preventDefault();
      let id = localStorage.getItem('id');
      let name = this.state.name;
      let username = this.state.username;
      let email = this.state.email;
      let phone = this.state.phone;
      let photo = this.state.photo;
      let address = this.state.address;
      let NameRegx=/^[A-Za-z\'\s\.\:\-]+$/;
	  let UserNameRegx=/^[A-Za-z0-9\'\s\.\:\-]+$/;
      let MobileRegx=/^(?:\+?88|0088)?01[15-9]\d{8}$/;
      let EmailRegx= /^[a-zA-Z0-9_]+@+[a-zA-Z0-9]+.+[A-z]/;

       if(name.length===0)
        {
            cogoToast.error('Enter Your Name');
        }
        else if(!NameRegx.test(name))
        {
             cogoToast.error('Name is Invalid!');
        } 
        else if(username.length===0)
        {
            cogoToast.error('Enter Your Username');
        }
        else if(username.length < 3)
        {
            cogoToast.error('Username is Too Short!');
        }
        else if(!UserNameRegx.test(username))
        {
             cogoToast.error('Username is Invalid!');
        }

        else if(email.length===0)
        {
            cogoToast.error('Enter Your Valid Email Address');
        }
        else if(!EmailRegx.test(email))
        {
             cogoToast.error('Invalid Email Address!');
        } 

        else if(phone.length===0)
        {
            cogoToast.error('Enter Your Valid Mobile Number');
        }
        else if(!MobileRegx.test(phone))
        {
             cogoToast.error('Invalid Mobile Number!');
        } 
        else if(address.length===0)
        {
             cogoToast.error('Enter Your Current Address!');
        }
        else
        {
            let MyForm = new FormData();
            MyForm.append('id', id);
            MyForm.append('name', name);
            MyForm.append('username', username);
            MyForm.append('email', email);
            MyForm.append('phone', phone);
            MyForm.append('photo', photo);
            MyForm.append('address', address);

            Axios.post(API.UpdateProfile, MyForm)
            .then(response=>{                
                if(typeof response.data === 'string')
                {
                    cogoToast.error(response.data);
                }

                else if(response.status==200 && response.data!=0)
                {
                    this.setState({PageRefreshStatus:true})
                    cogoToast.success('Your profile updated successfully..');
                    // localStorage.removeItem('name');
                    // localStorage.removeItem('username');
                    // localStorage.removeItem('email');
                    // localStorage.removeItem('phone');
                    // localStorage.removeItem('photo');
                    // localStorage.removeItem('address');
                    localStorage.setItem('name', response.data['name']);
	                localStorage.setItem('user', response.data['username']);
	                localStorage.setItem('photo', response.data['photo']);
                }
                else{
                     cogoToast.warn("Profile Nothing to Changes");
                }
            })
            .catch(error=>{
                 cogoToast.error('Something Went Wrong!');
            })
        
    }
}
    PageRefresh=()=>{
        if(this.state.PageRefreshStatus===true){
            let path = window.location.pathname;
            return (
                    <Redirect to={path} />
                   );
        }
    }
    render() {
        return (
            <Fragment>
                <div className="container card mt-4 col-lg-5 col-md-5 col-sm-8 col-xs-12">
                        <Form onSubmit={this.onUpdateProfile}>
                                <h5 className="text-success text-center m-4"><b>YOUR PROFILE</b></h5><hr/>
                          <Form.Group controlId="formBasicPassword">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} type="text" placeholder="Enter your name" />
                          </Form.Group>
                          <Form.Group controlId="formBasicPassword">
                            <Form.Label>Your Username</Form.Label>
                            <Form.Control value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} type="text" placeholder="Enter your username" />
                          </Form.Group>
                          <Form.Group controlId="formPassword">
                          <Form.Label>Your Email Address</Form.Label>
                            <Form.Control value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} type="text" placeholder="Enter your valid email address..." />
                          </Form.Group>
                          <Form.Group controlId="formPassword">
                          <Form.Label>Your Mobile Number</Form.Label>
                            <Form.Control maxLength="11" value={this.state.phone} onChange={(e)=>{this.setState({phone:e.target.value})}} type="text" placeholder="Enter your valid mobile number..." />
                          </Form.Group> 
                          <Form.Group controlId="formPassword">
                          <Form.Label>Your Profile Picture</Form.Label><br/>
                            <img className="profile-image mb-2" src={this.state.previewImg}/>
                            <Form.Control onChange={(e)=> this.setState({photo:e.target.files[0]})} type="file" placeholder="Re-type new password" />
                          </Form.Group>
                          <Form.Group controlId="formPassword">
                          <Form.Label>Your Current Address</Form.Label>
                            <Form.Control value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} type="text" placeholder="Enter your current location..." />
                          </Form.Group> 
                          <Button disabled={this.state.isDisabled} variant="success" className="btn-block" type="submit">
                          {this.state.updateBtn}
                          </Button><br/><br/>
                            <Link to="/">
                            <p className="forget-pass">Back to Home Page</p>
                            </Link>
                        </Form>
                    </div>
                {this.PageRefresh()}
            </Fragment>
        );
    }
}

export default Profile;