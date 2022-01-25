import React, {Component, Fragment} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import API from '../api/API';
import {Redirect} from "react-router-dom";
import Axios from 'axios';
import cogoToast from 'cogo-toast';
class DesktopNavbar extends React.Component{
    state = {
            user_id : '',
            countLatest : '',
            login: '',
            redirectStatus : false,
        }
    
    componentDidMount(){
            const user_id = localStorage.getItem('id');
            this.setState({user_id : user_id});
            Axios.get(API.CountLastest + "/" + user_id)
            .then(res=>{
                this.setState({countLatest :  res.data});
            })
            .catch(err=>{

            })
           if(localStorage.getItem('login')!=null)
            {
                this.setState({login : true});
            }
            else{
                this.setState({login : false});
            }
    }
    Login=()=>{
        localStorage.setItem('name', 'Anwar');
        alert(localStorage.getItem('name'))
    }
    Logout=()=>{
        localStorage.removeItem('login');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('token_no');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('photo');
        localStorage.removeItem('address');
        this.setState({redirectStatus : true});
    }

    changeLatest=()=>{
        const {user_id} = this.state;
        Axios.get(API.SetUnreadStatus + "/" + user_id)
        .then(res=>{
            this.componentDidMount();
        })
        .catch(err=>{

        });
    }

    RedirectToLoginPage=()=>{
        if(this.state.redirectStatus==true)
        {
            return (
                    <Redirect to="/login" />
                    );
        }
    }

 render(){
    const {countLatest}  = this.state;
    const login_logout_btn = 
        
        this.state.login ?
                          <>
                            <NavDropdown title={<img className="profile-photo" src={localStorage.getItem('photo')}/>} id="navbarScrollingDropdown">
                             <NavDropdown.Item>
                                <span className="text-muted">{localStorage.getItem('name')}</span>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.changeLatest}>
                                 <Link to="/admin_notification" className="btn text-danger"><i className="fas h4 fa-bell"></i> Notification <sup><span className="badge text-white bg-danger">{countLatest == 0 ? "" : countLatest}</span></sup></Link>
                            </NavDropdown.Item> 
                             <NavDropdown.Item>
                                <Link to="/user_profile"><span className="btn text-success"><i className="fa h4 fa-user"></i> My Profile</span></Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/user_token"><span className="btn text-dark"><i className="fa fa-list-ul"></i> View My Token</span></Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/change_password"><span className="btn text-primary"><i class="fas fa-key"></i> Change Password</span></Link>
                            </NavDropdown.Item> 
                            <NavDropdown.Item>
                                <Link to="#"><span className="btn text-muted"><i class="fas fa-cog"></i> Settings</span></Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <a onClick={this.Logout} className="link btn text-danger"><i class="fas fa-power-off"></i> Logout</a>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>  
                        </>
                        :
                        <>
                              <Nav.Link className="text-center">
                                    <Link to="/login">
                                        <div className="nav-item-div">
                                            <i className="fas mx-1 fas fa-power-off"/>Login
                                        </div>
                                    </Link>
                                </Nav.Link>

                          </>
 	return(
 		<Fragment>
 			<Navbar className="w-100 nav-bar sticky-top" collapseOnSelect expand="lg" variant="light">
				  <Link to="/">
				  <Navbar.Brand style={{cursor:'pointer'}}>
				  		<img className="nav-logo" src="../cms.webp" alt="NavLogo"/>
				  </Navbar.Brand>
				  </Link>
				  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
				  <Navbar.Collapse id="responsive-navbar-nav">
				    <Nav className="mr-auto">
				      <Nav.Link className="text-center">
				      	 	<Link activeClassName="d-none" to="/">
				      	 		<div className="nav-item-div">
				      	 		 	<i className="fa mx-1 fa-home"/> Dashboard
				      			 </div>
				      	 		
				      	 	</Link>
				      </Nav.Link>
				      <Nav.Link className="text-center">
				      	 	<Link to="/user_profile">
				      	 		<div className="nav-item-div">
				      	 		 	<i className="fa mx-1 fa-user-alt"/>My Profile
				      			 </div>
				      	 		
				      	 	</Link>
				      </Nav.Link>
				      <Nav.Link className="text-center" >
                                <Link to="/order_daily_meal">
                                    <div className="nav-item-div">
                                        <i className="fa mx-1 fa-list-ul"/>Order Daily Meal
                                    </div>
                                </Link>
                            </Nav.Link>

                            <Nav.Link className="text-center" >
                                <Link to="make_payment">
                                    <div className="nav-item-div">
                                        <i className="fa mx-1 fa-shopping-bag"/>Make Payment
                                    </div>
                                </Link>
                            </Nav.Link>

                            <Nav.Link className="text-center" >
                                <Link to="/send_message">
                                    <div className="nav-item-div">
                                        <i className="fa mx-1 fa-envelope"/>Send Message 
                                    </div>
                                </Link>
                            </Nav.Link>
                          <i className="fa fa-report-alt"/><NavDropdown className="nav-item-div" title="Reports" id="navbarScrollingDropdown">
                                 <NavDropdown.Item>
                                    <Link to="/day_wise_meal"className="text-danger" >Day Wise Meal Report</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/dailyMealItem" className="text-success">Daily Meal Schedule</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/all_notification" className="text-primary">All Sending Messages</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/payment_summary" className="text-dark">Payment Statement</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="text-danger">Monthly Statement</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                          </NavDropdown>
                           
                           {
                            login_logout_btn
                           }
				    </Nav>

				  </Navbar.Collapse>
			</Navbar>
            {this.RedirectToLoginPage()}
 		</Fragment>
 		)
 }
}
export default DesktopNavbar;
