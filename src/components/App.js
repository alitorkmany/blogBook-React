import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '../services/userService';
import LoginLayout from './layouts/login-layout';
import Not_Found from './not-found';
import Posts from './posts';

class App extends Component {

    
    constructor(props){
        super(props)
        this.state = {
            user: getUser()
        }
    }

    render(){
        return (
            <React.Fragment>
                <ToastContainer />
                <div>
                    <Switch>
                        
                        <Redirect exact from="/" to="/posts" />
                        <Route path="/login"
                        render={() => !this.state.user ? <LoginLayout /> : <Redirect to="/posts"/>} />

                        <Route path="/posts" 
                        render={() => this.state.user ? <Posts /> : <Redirect to="/login"/>} />

                        <Route path="/not-found" component={Not_Found} />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}

export default App;