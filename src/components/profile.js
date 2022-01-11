import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from 'react-router-dom';
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
        }
    componentDidMount(){
        let user_id= localStorage.getItem('id');
        Axios.get('http://127.0.0.1:8000/api/GetUserProfile/'+user_id)
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
    onUpdateProfile=()=>{
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
      let EmailRegx= /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;

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

            Axios.post('http://127.0.0.1:8000/api/UpdateProfile', MyForm)
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
            <Fragment><br/>
                <Container className="TopSection animated slideInDown mb-5">
                    <Row className="p-0">
                        <Col className="offset-md-3 shadow-sm bg-white mt-1" md={6} lg={6} sm={12} xs={12}>
                            <Row>
                                <Col md={12} lg={12} sm={12} xs={12}>
                                    <div className="card p-2">
                                        <div className="card-body">
                                            <div className="container-fluid ">
                                                <div className="row">
                                                    <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                        <h5 className="text-success text-center"><b>YOUR PROFILE</b></h5><hr/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Name</label>
                                                        <input value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div> 
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Username</label>
                                                        <input value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div> 
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Email Address</label>
                                                        <input readOnly value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div> 
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Mobile Number</label>
                                                        <input maxlength="11" value={this.state.phone} onChange={(e)=>this.setState({phone:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div>

                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Profile Picture</label><br/>
                                                        <img className="profile-image" src={this.state.previewImg}/>
                                                        <input onChange={(e)=> this.setState({photo:e.target.files[0]})} type="file" className="form-control mt-2 mb-3"/>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 mb-4 col-sm-12 col-12">
                                                        <label className="form-label">Your Current Address</label>
                                                        <input value={this.state.address} onChange={(e)=>this.setState({address:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div> 
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <button onClick={this.onUpdateProfile} className="btn btn-block btn-success">UPDATE PROFILE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                         
                            </Row>
                        </Col>
                    </Row>
                </Container><br/><br/>
                {this.PageRefresh()}
            </Fragment>
        );
    }
}

export default Profile;