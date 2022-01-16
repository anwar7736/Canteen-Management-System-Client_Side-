import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import API from '../api/API';
import {Redirect} from 'react-router-dom';
import {Link} from "react-router-dom";
import Axios from 'axios';

class DailyMealItem extends React.Component{
	state = {
		data : [],
	}
	componentDidMount(){
		Axios.get(API.GetDailyMealItem)
		.then(res=>{
			if(res.status==200 && res.data!=0)
			{
				this.setState({data: res.data});
			}
			else cogoToast.error('Something went wrong!');
		})
		.catch(err=>{
			cogoToast.error('Something went wrong!');
		});
	}
 render(){
 	const {data} = this.state;
 	let serial = 1;
 	const DailyMealItem = data.map(function(item){
 		return (
 			<>
 				<tr>
 					<td>{serial++}</td>
	 				<td>{item.day}</td>
	 				<td>{item.lunch_item}</td>
	 				<td>{item.dinner_item}</td>
	 			</tr>
 			</>
 		)
 	})
 	return(
 		<Fragment>
 			<div className="mt-3" style={{marginBottom:'100px'}}>
 					 <h5 className="text-danger"><marquee scrollAmount="5">বিঃদ্রঃ প্রতিদিন দুপুরের খাবার বিকাল ৩টার মধ্যে এবং রাতের খাবার রাত ১০টার মধ্যে সংগ্রহ করতে হবে।</marquee></h5><br/>
 					<h3 className="text-center text-success mt-4">প্রতিদিনের খাবারের মেন্যুসমূহ নিচে দেওয়া হলঃ-</h3><br/>
 					<h6 className="text-center text-danger">প্রয়োজন অনুসারে এই তালিকা পরিবর্তন হতে পারে</h6><br/>
 					<div class="table-responsive col-md-8 offset-md-2 text-center">
 						<table class="table table-bordered table-striped">
					  <thead style={{fontSize:'13.5px'}} className="bg-dark text-white">
					    <tr>
					      <th scope="col">সিরিয়াল</th>
					      <th scope="col">বার</th>
					      <th scope="col">দুপুরের মেন্যু </th>
					      <th scope="col">রাতের মেন্যু
					      </th>
					    </tr>
					  </thead>
					  <tbody style={{fontSize:'13.5px'}}>
					    	{DailyMealItem}
					  </tbody>
					</table>
 					</div>
 			</div>
 		</Fragment>
 		)
 	
 }
}
export default DailyMealItem;