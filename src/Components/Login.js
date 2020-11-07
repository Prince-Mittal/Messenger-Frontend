import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import image from './login.svg'
import Navbar from './Navbar'
import LoginForm from './LoginForm'

class Login extends Component{

    componentDidMount() {
        if (localStorage.getItem('authenticated')) {
            this.props.history.push("/profile");
        }
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-4 col-lg-5 col-md-6 left-div ">
                        <img src={image} alt="Login SVG" />
                    </div>
                    <div className="col-xl-8 col-lg-7 col-md-6 right-div">
                        <div className="text-white input-form">
                            <h4>Chat WebApp</h4>
                            <p>Welcome Back. Have a nice chat</p>
                            <Navbar />
                            <LoginForm history={this.props.history} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;