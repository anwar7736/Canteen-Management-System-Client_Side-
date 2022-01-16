import React, {Component, Fragment} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";

class DesktopNavbar extends React.Component{
    constructor(){
        super()
        this.state = {
            login: '',
            redirectStatus : false,
        }
    }
    componentDidMount(){
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
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('photo');
        localStorage.removeItem('address');
        this.setState({redirectStatus : true});
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
    
    const login_logout_btn = 
        
        this.state.login ?
                          <>
                            <NavDropdown title={<img className="profile-photo" src={localStorage.getItem('photo')}/>} id="navbarScrollingDropdown">
                             <NavDropdown.Item>
                                <span className="text-muted">{localStorage.getItem('name')}</span>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                 <Link to="/notification" className="btn"><i className="fas h4 fa-bell"></i> <sup><span className="badge text-white bg-danger">1</span></sup></Link>
                            </NavDropdown.Item> 
                             <NavDropdown.Item>
                                <Link to="/user_profile"><span className="btn text-success"><i className="fa h4 fa-user"></i> My Profile</span></Link>
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
				  <Link to="#">
				  <Navbar.Brand style={{cursor:'pointer'}}>
				  		<img className="nav-logo" src="../cms.webp" alt="NavLogo"/>
				  </Navbar.Brand>
				  </Link>
				  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
				  <Navbar.Collapse id="responsive-navbar-nav">
				    <Nav className="mr-auto">
				      <Nav.Link className="text-center">
				      	 	<Link activeClassName="d-none" to="#">
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
                                <Link to="#">
                                    <div className="nav-item-div">
                                        <i className="fa mx-1 fa-list-ul"/>Order Meal
                                    </div>
                                </Link>
                            </Nav.Link>

                            <Nav.Link className="text-center" >
                                <Link to="#">
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
                                    <Link to="#"className="text-danger" >Day Wise Meal Report</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/dailyMealItem" className="text-success">Daily Meal Schedule</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="text-primary">Message Details</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="text-dark">Payment Statement</Link>
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
