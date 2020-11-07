import React, { Component } from 'react'
import ShowPwd from './ShowPwd'
import axios from 'axios'
export default class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit event fired ");

        await axios.post(`http://localhost:5000/auth/login`,{
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                localStorage.setItem('authenticated',res.data.authenticated);
                localStorage.setItem('token',res.data.token);
            }).catch(err => console.log(err));
        if(localStorage.getItem('authenticated'))
            this.props.history.push('/profile');
        else
            this.props.history.push('/');

    }
    render() {
        return (
            <form className="mt-4" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control mb-4"
                       name="email" value={this.state.value} onChange={this.handleChange} placeholder="Enter email" />
                    <input type="password" className="form-control mb-4" id="pwd"
                        name="password" value={this.state.value} onChange={this.handleChange}  placeholder="Password" autoComplete="off" />
                    <ShowPwd />
                </div>
                <button type="submit" className="btn text-white">Login</button>

            </form>
        )
    }
}
