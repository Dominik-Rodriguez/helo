import React, { Component } from 'react';
import axios from 'axios';

export default class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            filter: '',
            posts: []
        }
    }

    componentDidMount(){
        this.getPosts();
    }

    handleInput = (value) => {
        this.setState({filter: value})
    }

    handleReset = () => {
        this.setState({filter: ''})
    }

    getPosts = () => {
        axios.get('/api/posts')
        .then(res => this.setState({posts: res.data}))
        .catch(err =>console.log(err));
    }

    render(){
        const mappedPosts = this.state.posts.map((post, i) => (
            <div className="post-box">
                <h2 key={i}>{post.title}</h2>
                <p>by: {post.username}</p>
                <img src={post.profile_pic} />
            </div>
        ))
        return(
            <div className="dashboard">
                <div className="searchbar">
                    <input
                        value={this.state.filter}
                        placeholder="Search Posts by Title"
                        onChange={(e) => this.handleInput(e.target.value)}/>
                    <button>search</button>
                    <button onClick={this.handleReset}>Reset</button>
                    <label for="ownPosts">My Posts</label>
                    <input type="checkbox" name="ownPosts"/>
                </div>
                <div className="postDash">
                    {mappedPosts}
                </div>
            </div>
        )
    }
}