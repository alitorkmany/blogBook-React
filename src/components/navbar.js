import React from 'react';
import socketIOClient from 'socket.io-client';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import { faUsers, faBell, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUserDetail, update, logout} from '../services/userService';
import Form from './common/form';
import Profile from './profile';
import logo from '../static/logo.png';

class Navbar extends Form {
    
    state = {
        errors: {},
    }

    async componentDidMount(){
        const socket = socketIOClient("http://127.0.0.1:3000");
        socket.io();
        try{
            const {data} = await getUserDetail();
            this.setState({ data }); 
        }catch(ex){
            toast.error(ex.response.data);
        }
    }

    schema = {
        input: Joi.string().min(3).required()
    }

    editProfile = value => {
        const data = {...this.state.data};
        if (value === 'name') {data.editName = true; data.editEmail = false;}
        else if (value === 'email') {data.editEmail = true; data.editName = false;}
        data.input = "";
        this.setState({ data });
    }

    saveProfile = async value => {
        const data = {...this.state.data};
        try{
            if (value === 'name'){
                data.editName = false;
                data.name = data.input;
            } 
            else if(value === 'email'){
                data.editEmail = false;
                data.email = data.input;
            }

            await update({
                name: data.name,
                email: data.email
            });

            data.input = "";
            this.setState({ data });
            
        }catch(ex){
            if(ex.response) toast.error(ex.response.data);
        }
    }

    fileChange = async e => {
        try{
            const {data} = await update({
                name: this.state.data.name,
                email: this.state.data.email,
                profileImage: e.currentTarget.files[0]
            });

            const user = {...this.state.data};
            user.profileImage = data.profileImage;
            this.setState({ data: user});

        }catch(ex) {
            if(ex.response) toast.error(ex.response.data);
        }
    }
    render() {
        const { data } = this.state;
        return (
            <nav className="navbar navbar-expand navbar-light bg-light">
                <img className="navbar-brand" src={logo} style={{ width: 50, marginLeft: 50}}/>

                <div className="btn-group ml-3">
                    <h5 style={{cursor: "pointer"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon={faSearch} /></h5>
                    <div className="dropdown-menu py-0">
                        <input
                        id="searchPopup"
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        name="search"
                        onChange={this.props.handleOnchange}
                        value={this.props.search}
                        />
                    </div>
                </div>

                <input
                id="searchInput"
                className="form-control mr-sm-2 w-25"
                type="search"
                placeholder="Search"
                name="search"
                onChange={this.props.handleOnchange}
                value={this.props.search}
                />

                    <ul className="navbar-nav mr-auto mt-2mt-lg-0">
                        <li className="nav-item active">
                            <img className="nav-link rounded-circle d-inline" style={{width: 50}}
                            src={data && 'http://localhost:3000/' + data.profileImage}/>
                            <a className="nav-link d-inline" href="" data-toggle="modal" data-target="#profileModal">{data && data.name}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><FontAwesomeIcon icon={faUsers} /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a>
                        </li>
                        <li className="nav-item">
                            <p className="nav-link pointer" onClick={logout}>Logout</p>
                        </li>
                    </ul>
                
                
                
                <Profile
                    user={data}
                    onEdit={this.editProfile}
                    onSave={this.saveProfile}
                    handleOnchange={this.handleOnchange}
                    handleSubmit={this.handleSubmit}
                    onChange={this.fileChange}
                    error={this.state.errors}
                />
            </nav>
        );
    }
}

export default Navbar;