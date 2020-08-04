import React from 'react';
import { toast } from 'react-toastify';
import Form from './common/form';
import Joi from 'joi-browser';
import Input from './common/input';
import { register } from '../services/userService';

class Register extends Form {

    state = {
        data: {
            name: "", 
            email: "", 
            password: "",
            profileImage: {}
        },
        errors: {}
    }

    schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }

    doSubmit = async() => {
        try{
            await register(this.state.data);
            window.location.reload();
        }catch(ex) {
            if(ex.response){
                toast.error(ex.response.data);
            }
        }
    }

    fileChange = e => {
        const data = {...this.state.data};
        data.profileImage = e.currentTarget.files[0];
        this.setState({ data });
        this.props.getimage(URL.createObjectURL(e.currentTarget.files[0]));
    }

    render(){
        const { data, errors } = this.state;
        return (
            <form onSubmit={(e)=>{
                this.handleSubmit(e);
                this.doSubmit();
            }}>
                <Input
                    label="Name"
                    name="name"
                    type="text"
                    onchange={this.handleOnchange}
                    value={data.name}
                    error={errors.name}
                    
                />
                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    onchange={this.handleOnchange}
                    value={data.email}
                    error={errors.email}
                    
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onchange={this.handleOnchange}
                    error={errors.password}
                />
                <Input
                    label="Profile picture"
                    name="profileImage"
                    type="file"
                    onchange={this.fileChange}
                    error={errors.profileImage}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default Register;