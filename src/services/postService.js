import http from './httpService';
import config from '../config/defualt.json';

export function getPosts(){
    return http.get(config.url + 'post');
}

export function sendPost(post){
    return http.post(config.url + 'post', post);
}

export function deletePost(postId){
    return http.delete(config.url + 'post/' + postId);
}

export function editPost(postId, post){
    return http.put(config.url + 'post/' + postId, post);
}

export function sendLike(post){
    return http.post(config.url + 'post/like', post);
}

export function sendComment(comment){
    return http.post(config.url + 'post/comment', comment);
}