import React, { Component } from 'react';

class Textaria extends Component{

    onvalue = new Event('onvalue');

    Onvalue = () => {
        let self = document.getElementById(this.props.name);
        if(self){
            self.addEventListener('onvalue', function(){
            this.style.overflow = 'hidden';
            this.style.height = 0;
            this.style.height = this.scrollHeight + 'px';
        }, false);
        self.dispatchEvent(this.onvalue);
        }
    }

    componentDidMount(){
        document.getElementById(this.props.name).addEventListener('keypress', e => {
            if ((e.keyCode || e.which) == 13) this.props.submit(e);
        });
    }

    render(){
        return (
            <div className="form-group">
                <textarea 
                    style={{resize: "none", height: 36}}
                    name={this.props.name} 
                    className="form-control col-sm-12" 
                    id={this.props.name}
                    placeholder={this.props.label}
                    value={(()=>{
                        this.Onvalue();
                        return this.props.value})()}
                    onChange={this.props.onchange}>
                </textarea>
                { this.props.error && <div id="login-alert" className="alert alert-danger" style={{marginTop: this.props.margin}} role="alert">{ this.props.error }</div> }
            </div>
        )
    }
}

export default Textaria;