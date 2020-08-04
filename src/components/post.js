import React from 'react';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Like from './common/like';
import Dropdown from './common/dropdown';

const Post = (props) => {
    return (
        <div className="card mt-2 border">
            <div className="card-header ">
                <a href="#">
                    <img className="nav-link rounded-circle d-inline" style={{width: 70}}
                    src={'http://localhost:3000/' + props.image}/>
                    <p className="d-inline">{props.name}</p>
                </a>
                <span className="float-right"><Dropdown
                deletePost={props.deletePost}
                editPost={props.toggleEdit}
                /></span>
            </div>
            
            <div className="card-body">
                {props.isEdit ? props.children : props.post}
            </div>

            <div className="card-footer text-right">
                <small className="float-left ml-3"><FontAwesomeIcon icon={faThumbsUp}/> &nbsp;{props.likeCount}</small>
                <small className="mr-3" 
                onClick={props.toggleComment}
                style={{cursor: 'pointer'}}>{props.commentCount}</small>
            </div>

            <div className="card-footer text-muted">
                <small className="ml-3">{props.date}</small>
                <small className="float-right mr-3"><Like
                liked={props.meLiked}
                onclick={props.onclick}
                /></small>
                <small className="float-right mr-3"><FontAwesomeIcon icon={faComment}/> Comment</small>
            </div>
        </div>
    )
}

export default Post;