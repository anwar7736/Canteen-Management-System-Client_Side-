import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class Login extends React.Component{

 render(){
 	return(
 		<Fragment>
 			<title>CMS | 404</title>
 			<NavBar/>
 			<h4 className="text-center mt-5 text-danger">404 | NOT FOUND</h4>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Login;