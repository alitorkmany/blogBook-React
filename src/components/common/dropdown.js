import React from 'react';

const Dropdown = props=> {
    return(
        <div className="btn-group">
            <h3 style={{cursor: "pointer"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">...</h3>
            <div className="dropdown-menu dropdown-menu-right">
                <a onClick={props.editPost} className="dropdown-item" href="#">Update post</a>
                <div className="dropdown-divider"></div>
                <a onClick={props.deletePost} className="dropdown-item" href="#">Delete post</a>
            </div>
        </div>
    )
}

export default Dropdown;