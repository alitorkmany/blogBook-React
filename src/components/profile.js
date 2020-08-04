import React from 'react';
import Input from './common/input';


export default props => {
    return(
        <div className="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header d-block border-0">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                <h5 className="modal-title text-center" id="exampleModalLabel">Profile</h5>
            </div>
            <div className="modal-body text-center">

                {/* Image field rendering */}
                <div>
                    <img className="rounded-circle d-inline-block" style={{width: 200}}
                                    src={props.user && 'http://localhost:3000/' + props.user.profileImage}/>
                    <input type="file" name="file float-right" className="inputfile" id="file" onChange={props.onChange}/>
                    <label className="pointer float-right" for="file">Edit</label>
                </div>
                
                {/* Name field rendering */}
                <div className="mt-4">
                    {props.user && props.user.editName ?
                    <form className="mb-5" onSubmit={(e)=>{
                        props.handleSubmit(e);
                        props.onSave('name');
                    }}>
                    <Input
                        name="input"
                        onchange={props.handleOnchange}
                        value={props.user.input}
                        errors={props.error.input}
                        marginb={0}
                    />
                    <small className="float-left font-italic">Press enter to save</small>
                    </form>:
                    <h5 className="d-inline">{props.user && props.user.name}</h5>}
                    {props.user && !props.user.editName && <p className="pointer float-right "onClick={()=>props.onEdit('name')}>Edit</p>}
                </div>

                {/* Email field rendring */}
                <div className="mt-4 mb-4">
                    {props.user && props.user.editEmail ?
                    <form className="mb-5" onSubmit={(e)=>{
                        props.handleSubmit(e);
                        props.onSave('email');
                    }}>
                    <Input
                        name="input"
                        onchange={props.handleOnchange}
                        value={props.user.input}
                        errors={props.error.input}
                        marginb={0}
                    /> 
                    <small className="float-left font-italic">Press enter to save</small>
                    </form>:
                    <h5 className="d-inline">{props.user && props.user.email}</h5>}
                    {props.user && !props.user.editEmail && <p className="pointer float-right "onClick={()=>props.onEdit('email')}>Edit</p>}
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

