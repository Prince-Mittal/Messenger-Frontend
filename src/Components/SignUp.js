import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import image from './login.svg';
import Navbar from './Navbar';
import SignupForm from './SignupForm';

class Login extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-4 col-lg-5 col-md-6 left-div ">
                        <img src={image} alt="Login SVG" />
                    </div>
                    <div className="col-xl-8 col-lg-7 col-md-6 right-div">
                        <div className="text-white input-form">
                            <h4>Chat WebApp</h4>
                            <p>Start a Chat today on your ChatApp.</p>
                            <Navbar />
                            <SignupForm history={this.props.history} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;