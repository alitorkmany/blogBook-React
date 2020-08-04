import { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {

    validateOnsubmit = () => {
        const result = Joi.validate(this.state.data, this.schema);
        if(!result.error) return null;

        const errors = {};
        for(let err of result.error.details)
            errors[err.path[0]] = err.message;
        
        return errors;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validateOnsubmit();
       if(errors && !errors.profileImage){
           this.setState({ errors });
           return
       }
       //this.doSubmit();
    }

    handleOnchange = e => {
        const data = {...this.state.data};
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data });
    }
}

export default Form;