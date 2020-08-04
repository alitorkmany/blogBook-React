import React from "react";
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import  * as Postservice from '../services/postService';
import { getUser, getUserDetail } from '../services/userService';
import Navbar from './navbar';
import Comments from './comments';
import Form from './common/form';
import Input from './common/input';
import Textaria from './common/textarea';
import Post from "./post";

class Posts extends Form {

    state = {
        data: {post: "", input: "", search: ""},
        errors: {},
    }

    async componentDidMount(){
        try{
            const { data } = await Postservice.getPosts();

            const posts = data.map( post => {
                post.showComment = false;
                post.isEdit = false;
                return post;
            });

            this.setState({ posts });
            
            console.log(this.state.posts)
        }catch(ex){
            if(ex.response){
                toast.error(ex.response.data);
            }   
        }
    }

    doLike = async post => {
        try{
            const { _id } = getUser();

            const posts = [...this.state.posts];
            const index = posts.indexOf(post);

            const thisLike = posts[index].likes.find(like => like.user === _id);

            if(thisLike){
                const indexLike = posts[index].likes.indexOf(thisLike);
                posts[index].likes[indexLike].like =! posts[index].likes[indexLike].like;
            }else{
                posts[index].likes.push({
                    like: true,
                    user: _id
                });
            }
            this.setState({ posts });

            await Postservice.sendLike({postId: post._id});
        }catch(ex){
            if(ex.response)
                toast.error(ex.response.data)
        }
    }

    getLike = post => {
        const { _id } = getUser();
        if(post.likes.length != 0){
            const ilike = post.likes.find(value => {
                if(value.user === _id) return value;
            });
            return ilike.like;
        }
    }

    getDate = date => {
        const today = new Date();
        const postDate = new Date(date);

        if(today.getFullYear() - postDate.getFullYear())
        return today.getFullYear() - postDate.getFullYear() + ' year ago'

        if(today.getMonth() - postDate.getMonth())
        return today.getMonth()- postDate.getMonth() + ' month ago'

        if(today.getDate() - postDate.getDate())
        return today.getDate() - postDate.getDate() + ' day ago'

        if(today.getHours() - postDate.getHours())
        return today.getHours() - postDate.getHours() + ' hrs'
    }

    toggleComment = post => {
        if(post.comments.length >= 0){
            const posts = [...this.state.posts];
            const index = posts.indexOf(post);
            posts[index].showComment = !posts[index].showComment;
            this.setState({ posts });
        }
    }

    submitCommand = async (post, commentData) => {
        try{
            const posts = [...this.state.posts];
            const index = posts.indexOf(post);
            const { data: user } = await getUserDetail();
            const {data: comment} = await Postservice.sendComment({
                postId: post._id,
                comment: commentData
            });
            comment.user = user;
            posts[index].comments.push(comment);
            
            this.setState({ posts });

        }catch(ex){
            if(ex.response)
                toast.error(ex.response.data)
        }
    }

    submitPost = async () => {
        try{
            const posts = [...this.state.posts];

            const {data: post} = await Postservice.sendPost({ body: this.state.data.post });
            post.showComment = false;
            post.isEdit = false;
           
            posts.unshift(post);

            const data = {...this.state.data};
            data.post = "";
            
            this.setState({ posts, data });

        }catch(ex){
            if(ex.response)
                toast.error(ex.response.data)
        }
    }

    postDelete = async post => {
        try{
            await Postservice.deletePost(post._id)
            let posts = [...this.state.posts];
            posts = posts.filter( value => value._id != post._id);
            this.setState({ posts });
        }catch(ex){
            if(ex.response)
                toast.error(ex.response.data)
        }
    }

    toggleEdit = post => {
        const data = {...this.state.data};
        const posts = [...this.state.posts];
        const index = posts.indexOf(post);

        data.input = posts[index].body;
        posts[index].isEdit = true;
        
        this.setState({ posts, data });
    }

    postEdit = async post => {
        const data = {...this.state.data};
        const posts = [...this.state.posts];
        const index = posts.indexOf(post);

        posts[index].body = data.input;
        posts[index].isEdit = false;

        try{
            await Postservice.editPost(post._id, {body: data.input});
        }catch(ex){
            if(ex.response)
                toast.error(ex.response.data)
        }
        data.input = "";
        this.setState({ posts, data });

    }

    renderPost = post => {
        return (
            <Post
            key={post._id}
            image={post.author.profileImage}
            post={post.body}
            name={post.author.name}
            commentCount={post.comments.length + " Comments"}
            likeCount={post.likes.length}
            date={this.getDate(post.date)}
            meLiked = {this.getLike(post)}
            isEdit={post.isEdit}
            onclick={()=> this.doLike(post)}
            toggleComment={()=>this.toggleComment(post)}
            deletePost={()=> this.postDelete(post)}
            toggleEdit={()=>this.toggleEdit(post)}
            >
                <Textaria
                    name="input"
                    onchange={this.handleOnchange}
                    value={this.state.data.input}
                    error={this.state.errors.input}
                    submit={(e)=>{
                        this.handleSubmit(e);
                        this.postEdit(post);
                    }}
                />
            </Post>
        )
    }

    schema = Joi.alternatives().try(
        {
            input: Joi.string().allow(''),
            post: Joi.string().required()
        },
        {
            post: Joi.string().allow(''),
            input: Joi.string().required(),
        }
      );

    render(){
        return (
        <React.Fragment>
            <div className="">
                <Navbar
                    handleOnchange={this.handleOnchange}
                    search={this.state.search}
                />
                <div className="posts">

                    <div className="card mt-2 p-3">
                        <Textaria
                            label="What is on your mind?"
                            name="post"
                            onchange={this.handleOnchange}
                            value={this.state.data.post}
                            error={this.state.errors.post}
                            submit={(e)=>{
                                this.handleSubmit(e);
                                this.submitPost();
                            }}
                        />
                    </div>

                    {this.state.posts && this.state.posts.filter(post => post.author.name.toLowerCase().indexOf(this.state.data.search.toLowerCase()) !== -1)
                    .map(post => {
                        return(
                            <React.Fragment key={post._id}>

                                {this.renderPost(post)}

                                {post.showComment && 
                                <Comments
                                comments={post.comments}
                                date={this.getDate}
                                submitComment={data => this.submitCommand(post, data)}
                                /> }
                                
                            </React.Fragment>)
                        })
                    }
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default Posts;
 