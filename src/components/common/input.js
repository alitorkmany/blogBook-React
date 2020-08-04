import React from 'react';

const Input = ({label, type, name, value, onchange, error, margin, marginb}) => {
    return (
        <div className="form-group" style={{marginBottom: marginb}}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type} 
                name={name} 
                className="form-control col-sm-12" 
                id={name}
                placeholder={label}
                value={value}
                onChange={onchange}>
            </input>
            { error && <div id="login-alert" className="alert alert-danger" style={{marginTop: margin}} role="alert">{ error }</div> }
        </div>
    )
}

export default Input;