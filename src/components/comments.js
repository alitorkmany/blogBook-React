import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import Textaria from './common/textarea';

class Comments extends Form {

    state = {
        data: {comment: ""},
        errors: {}
    }

    schema = {comment: Joi.string().required()}

    render() {
        const { comments, date, submitComment } = this.props;
        return (
        <div className="card mt-1 pl-3 pt-3">
            {comments.map( comment => (
                <div key={comment._id} className="mt-3">
                <div className="d-flex">
                    <div>
                        <img className="rounded-circle mr-1" style={{width: 30}}
                        src={'http://localhost:3000/' + comment.user.profileImage}/>
                    </div>
                    <div className="p-2 bg-light" style={{borderRadius: 20}}>
                        <a className="d-block" href="#" style={{marginBottom: 0}}>{comment.user.name}</a>
                        <small style={{marginBottom: 0}}>{comment.comment}</small>
                    </div>
                    
                </div>
                <small style={{marginLeft: '2.8rem'}}>{date(comment.date)}</small>
            </div>
            ))}

            <Textaria
                label="Write a command..."
                name="comment"
                onchange={this.handleOnchange}
                value={this.state.data.comment}
                error={this.state.errors.comment}
                submit={(e)=>{
                    this.handleSubmit(e);
                    submitComment(this.state.data.comment);
                    const data = {...data};
                    data.comment = "";
                    this.setState({ data });
                }}
            />

        </div>
        )
    }
}

export default Comments;