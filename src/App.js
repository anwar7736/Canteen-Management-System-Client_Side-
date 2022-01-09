import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes/routes';

class App extends React.Component{
  render(){
    return (
        <Fragment>
            <Router>
                <Routes/>
            </Router>
        </Fragment>
    );
  }
}

export default App;
