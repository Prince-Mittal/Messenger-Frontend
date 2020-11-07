import React, { Component } from 'react'
import axios from 'axios'
import ShowPwd from './ShowPwd'

export default class LoginForm extends Component {
    constructor(props){
        super(props)

        this.state = {
        name : '',
        email: '',
        username: '',
        password: '',
        gender: 'male',
        otp: null,
        otpReceived: false,
        otpVerified: false,
        signUp: false
        }
    }

    handleChange = (e) => {
        
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    RadioChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkOTP = (e) => {
        axios.post(`http://localhost:5000/auth/checkOTP`, {
            email: this.state.email,
            otp: this.state.otp
        }).then(res => {
            if(res.status === 200){
                this.setState({
                    otpVerified:true
                })
                var otpbtn = document.getElementById("otp-btn");
                otpbtn.innerHTML = "✔";
                otpbtn.style.backgroundColor = "#11a15d"
                console.log("User Verified");
            }
        })
        .catch(err => console.log(err));
    }

    handleSignUp = (e) => {
        if (this.state.otpVerified) {
            axios.post(`http://localhost:5000/auth/register`, {
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                gender: this.state.gender
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
            this.props.history.push('/login');
        }
        else {
            alert("OTP Not Verified");
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var emailerr = document.getElementById("emailerr");
        var unameerr = document.getElementById("unameerr");
        emailerr.classList.add("d-none");
        unameerr.classList.add("d-none");
            axios.post(`http://localhost:5000/auth/verify`, {
                username: this.state.username,
                email: this.state.email
            })
                .then(res => {
                    if (res.status === 200 && res.data === "ok") {
                        this.setState({
                            otpReceived: true,
                            signUp: true
                        });
                        console.log("otpRecieved true");
                    }
                }).catch(err => {
                    if (err.response.status === 400 && err.response.data.errmsg === "email") {
                        emailerr.classList.remove("d-none");
                    }
                    else if (err.response.status === 400 && err.response.data.errmsg === "username") {
                        unameerr.classList.remove("d-none");
                    }
                    else {
                        console.log(err);
                    }
                });
        
    }

    render() {
        return (
            <form className="mt-4" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="input" className="form-control mb-3"
                        name="name" placeholder="Enter Name" onChange={this.handleChange} required/>
                    <small id="emailerr" className="text-danger font-weight-bold d-none">Email Already Registered</small>
                    <input type="email" className="form-control mt-3 mb-3"
                        name="email" placeholder="Enter email" onChange={this.handleChange} required/>

                    <small id="unameerr" className="text-danger font-weight-bold d-none">Username Already Exists</small>
                    <input type="input" className="form-control mt-3 mb-3"
                        name="username" placeholder="Enter UserName" onChange={this.handleChange} required/>
                    
                    <input type="password" className="form-control mb-2" id="pwd"
                        name="password" placeholder="Password" onChange={this.handleChange} autoComplete="off" required/>
                    <ShowPwd />
                    <div className="mt-3">
                    <label className="font-weight-bold">Gender: </label>
                    <label className="radio-inline ml-3">
                        <input type="radio" name="gender" value="male"
                        checked={this.state.gender === 'male'}
                        onChange={this.RadioChange} /> 
                          Male 
                    </label>
                    <label className="radio-inline ml-3">
                        <input type="radio" name="gender" value="female"
                        checked={this.state.gender === "female"} 
                        onChange={this.RadioChange} /> 
                          Female 
                    </label>
                    </div>
                    {this.state.otpReceived ? (
                        <div className="input-group otp-div">
                            <input type="input" className="form-control mb-3"
                            name="otp" placeholder="OTP" onChange={this.handleChange} required />
                            <div className="input-group-append">
                            <button type="button" 
                                className="input-group-append btn text-white otp-submit" id="otp-btn"
                                onClick={this.checkOTP}>Verify</button>
                            </div>
                        </div>
                        ) : ""}
                    
                </div>
                {this.state.signUp ? (<button type="button" className="btn text-white" onClick={this.handleSignUp}>Register</button>) :
                     (<button type = "submit" className = "btn text-white" >SignUp</button>)}
            </form>
        )
    }
}
