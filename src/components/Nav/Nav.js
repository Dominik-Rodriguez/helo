import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Nav extends Component{
    constructor(props){
        super(props);
    }

    handleLogout= () => {
        axios.get('/api/logout')
        .then(() => {
            //clear the user from redux
            this.props.clearUser();
            //route user back to landing
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }
    
    render(){
        return(
            <div className="Nav">
                <div>
                    <div>need to ask about hiding nav bar</div>
                    <div>*profile pic*</div>
                    <p>{this.props.user.username}</p>
                </div>
                <Link to='/Dashboard'><button>Home</button></Link>
                <Link to=''><button>New Post</button></Link>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav);