import React, { Component } from 'react';
import Login from '../login';
import Register from '../register';
import logo from "../../static/logo.png";


class LoginLayout extends Component {
    state = {
        profileImange: {
            image: ""
        }
    }
    getImage = image => {
        const profileImange = {...this.state.profileImange};
        profileImange.image = image;
        this.setState({profileImange});
    }
    push = () => {
        window.location.pathname = '/posts';
    }

    render(){
        return (
            <div className="row">
                <div className="col-12 bg-primary pt-3 pb-3">
                    <img src={logo} style={{ width: 150, marginLeft: 50}}/>
                    <Login push={this.push}/>
                </div>
                <div className="col-6 mt-5">
                    <div className="container ml-5">
                        <h4 className="font-weight-light">Connect to friends, family and around <br/> the world with Blog Book</h4>
                    </div>
                    <div className="text-center mt-5">
                        <img className="rounded-circle" style={{width: 250}} src={this.state.profileImange.image}/>
                    </div>
                </div>
                <div className="col-6 mt-5">
                    <div className="container pr-5">
                        <h3>Sign Up</h3>
                        <p>It is easy and quick</p>
                        <Register getimage={this.getImage}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginLayout;