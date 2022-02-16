import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from 'react-router-dom';
import API from '../api/API';
import {Redirect} from 'react-router';
import cogoToast from 'cogo-toast';
import Axios from 'axios';

class Profile extends Component {
       state = {
            name : '',
            token_no : '',
            email : '',
            phone : '',
            previewImg : '',
            reg_date : '',
            btn : '',
        }
    componentDidMount(){
        let user_id= localStorage.getItem('id');
        Axios.get(API.GetUserProfile+"/"+user_id)
        .then(response=>{
            if(response.status===200)
            {
                this.setState({
                    name : response.data['name'],
                    token_no : response.data['token_no'],
                    email : response.data['email'],
                    phone : response.data['phone'],
                    previewImg : response.data['photo'],
                    reg_date : response.data['reg_date']
                })
            }
        })
        .catch(error=>{

        })
     }
     printToken=()=>{ 
     	this.setState({btn : 'd-none'})
     	window.print();
     	this.setState({btn : ''})
     }
    render() {
    	const {name, token_no, email, phone, previewImg, reg_date, btn} = this.state;
        return (
            <Fragment>
            	<div className="row m-1">
            		<div className="col-md-9 offset-4">
            			<button onClick={this.printToken} className={btn + " btn btn-danger "}>Print Token</button>
            		</div>
            	</div>
                     <div className="container token_preview card mt-4 col-lg-4 col-md-5 col-sm-8 col-xs-8">
                        <div className="token_section">
                            <h3 className="text-success text-center m-3"><b>CANTEEN <br/>MANAGEMENT SYSTEM</b></h3><hr/>
                            <img src={previewImg} className="prevIMG"/>
                            <hr/>
                                <h5 className=""><b className="text-muted">Name :</b> <span className="text-muted">{name}</span></h5>
                                <h5 className=""><b className="text-muted">Email :</b> <span className="text-muted">{email}</span></h5>
                                <h5 className=""><b className="text-muted">Phone :</b> <span className="text-muted">{phone}</span></h5>
                                <h5 className=""><b className="text-muted">Reg Date :</b> <span className="text-muted">{reg_date}</span></h5><hr/>
                            <h2 className="text-danger text-center"><b>TOKEN NO : {token_no}</b></h2>
                        </div>
                     </div>
            </Fragment>
        );
    }
}

export default Profile;