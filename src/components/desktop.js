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
        localStorage.removeItem('admin');
        localStorage.removeItem('worker');
        localStorage.removeItem('current_user');
        localStorage.removeItem('login');
        localStorage.removeItem('seller');
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
        
        this.state.login==true ? 
                            <>
                                <Nav.Link className="text-center" onClick={this.Logout}>
                                        <div className="nav-item-div">
                                            <i className="fas mx-1 fas fa-power-off"/>Logout
                                        </div>
                                </Nav.Link>
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
				      	 	<Link to="#">
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
                                <Link to="#">
                                    <div className="nav-item-div">
                                        <i className="fa mx-1 fa-envelope"/>Send Message 
                                    </div>
                                </Link>
                            </Nav.Link>
                            <NavDropdown className="nav-item-div" title="Others" id="navbarScrollingDropdown">
                                 <NavDropdown.Item>
                                    <Link to="#" className="text-danger" >Notification <span> <i className="fa fa-heart"><sup>1</sup></i></span></Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="text-success" >Settings</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Link to="/change_password" className="text-danger">Change Password</Link>
                                </NavDropdown.Item>
                          </NavDropdown>
                          <i className="fa fa-report-alt"/><NavDropdown className="nav-item-div" title="Reports" id="navbarScrollingDropdown">
                                 <NavDropdown.Item>
                                    <Link to="#"className="text-danger" >Day Wise Meal Report</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="text-success">Daily Meal Schedule</Link>
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
