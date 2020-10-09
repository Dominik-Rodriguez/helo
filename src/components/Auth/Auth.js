import axios from 'axios';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            verPassword: '',
            registerView: false
        }
    }

    componentDidMount(){
        if(this.props.user.username){
            this.props.history.push('/Dashboard');
        }
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleToggle = () => {
        this.setState({registerView: !this.state.registerView})
    }

    handleRegister = () => {
        const {username, password, verPassword} = this.state;
        if(password && password === verPassword){
            axios.post('/api/register', {username, password})
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/Dashboard');
            }).catch(err => console.log(err));
        } else {
            alert('Passwords do not match')
        }
    }

    handleLogin = () => {
        const {username, password} = this.state;
        axios.post('/api/login', {username, password})
        .then(res => {
            this.props.getUser(res.data);
            this.props.history.push('/Dashboard');
        })
    }

    render(){
        
        return(
            <div className="Auth">
                <section>
                    <div>*Helo logo*</div>
                    {this.state.registerView
                    ? (<>
                        <h3>Register your account here</h3>
                    </>)
                    : <h1>Helo</h1>}
                    <input
                        value={this.state.username}
                        name='username'
                        placeholder='Username'
                        onChange={(e) => this.handleInput(e)}/>
                    <input
                        type="password"
                        value={this.state.password}
                        name="password"
                        placeholder="Password"
                        onChange={(e) => this.handleInput(e)}/>
                    {this.state.registerView
                    ? (<>
                        <input
                            type='password'
                            value={this.state.verPassword}
                            name='verPassword'
                            placeholder='Verify Password'
                            onChange={(e) => this.handleInput(e)}/>
                        <button onClick={this.handleRegister}>Register</button>
                        <p>Have an account? <span onClick={this.handleToggle}>Login Here</span></p>
                    </>)
                    : (<>
                        <button onClick={this.handleLogin}>Login</button>
                        <p>Don't have an account? <span onClick={this.handleToggle}>Register Here</span></p>
                    </>)}
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);