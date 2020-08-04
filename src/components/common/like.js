import React from 'react';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Like = (props)=> {
    return (
        props.liked ? <div style={{color: 'blue', cursor: 'pointer'}} onClick={props.onclick}><FontAwesomeIcon icon={faThumbsUp}/>&nbsp;Like</div>
        : <div style={{cursor: 'pointer'}} onClick={props.onclick}><FontAwesomeIcon icon={faThumbsUp}/>&nbsp;Like</div>
    )
}

export default Like;