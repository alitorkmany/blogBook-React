import React from 'react';
import { toast } from 'react-toastify';
import Form from './common/form';
import Joi from 'joi-browser';
import Input from './common/input';
import { login } from '../services/userService';

class Login extends Form {

    state = {
        data: {email: "", password: ""},
        errors: {}
    }
    
    schema = {
        email: Joi.string().required(),
        password: Joi.string().required()
    }

    doSubmit = async() => {
        try{
            const response = await login(this.state.data);
            localStorage.setItem("token", response.data);//jwt token to storage of browser
            this.props.push();
            
        }catch(ex){
            if(ex.response){
                toast.error(ex.response.data);
            }      
        }
    }

    render(){
        const { data, errors } = this.state;
        return (
            <form className="form-inline mr-5 float-right" onSubmit={(e)=>{
                this.handleSubmit(e);
                this.doSubmit();
            }}>
                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    onchange={this.handleOnchange}
                    value={data.email}
                    error={errors.email}
                    margin={50}
                    
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onchange={this.handleOnchange}
                    error={errors.password}
                    margin={50}
                />
                <button type="submit" className="btn btn-primary mt-2 ml-2">Login</button>
            </form>
        );
    }
}

export default Login;