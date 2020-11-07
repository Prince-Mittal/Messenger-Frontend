import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default class MainSidebar extends Component {

    state = {
        isLogin: false,
        name: "Guest",
        profilePic: ""
    }

    handleToggle = (e) => {
        e.preventDefault();
        document.getElementById("wrapper").classList.toggle("menuDisplayed");
        let IconClass = document.getElementById("bars").classList;
        if (IconClass[1] === "fa-bars") {
            IconClass.remove("fa-bars");
            IconClass.add("fa-times");
        }
        else if (IconClass[1] === "fa-times") {
            IconClass.remove("fa-times");
            IconClass.add("fa-bars");
        }
    }

    handleLogout = (e) => {
        localStorage.removeItem("authenticated");
        localStorage.removeItem("token");
    }

    componentDidMount() {
        if (localStorage.getItem('authenticated')) {
            console.log("Token  is " + localStorage.getItem('token'));
            axios.get("http://localhost:5000/profile", {
                'headers' : {
                "token": localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.setState({
                            isLogin: true,
                            name: res.data.name,
                            profilePic: res.data.profilepic
                        });
                        console.log(res);
                    }

                })
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">

                    <li id="expand"><a href="https://google.com" id="menu-toggle" onClick={this.handleToggle}><span><abbr title="Expand"><i className="fa fa-bars" id="bars"
                        aria-hidden="true"></i></abbr>
                        <div className="text"> Close</div>
                    </span> </a>
                    </li>

                    <li><NavLink to="/profile" activeClassName="active"><span><abbr title="Profile"><img src={this.state.profilePic} className="rounded-circle" height="50px"
                        width="50px" alt="profile-pic" /></abbr>
                        <div className=".text"> {this.state.name} </div>
                    </span></NavLink>
                    </li>

                    <li><NavLink to="/search" activeClassName="active"><span><abbr title="Search User"><i className="fa fa-search" aria-hidden="true"></i></abbr>
                        <div className="text"> Search User</div>
                    </span> </NavLink>
                    </li>

                    <li><NavLink to="/friends" activeClassName="active"><span><abbr title="Friends"><i className="fa fa-users" aria-hidden="true"></i></abbr>
                        <div className="text"> Friends</div>
                    </span> </NavLink>
                    </li>

                    <li><NavLink to="/chat" activeClassName="active"><span><abbr title="Chats"><i className="fa fa-comments" aria-hidden="true"></i></abbr>
                        <div className="text"> Chats</div>
                    </span> </NavLink>
                    </li>

                    <li><NavLink to="/requests" activeClassName="active"><span><abbr title="Requests"><i className="fa fa-handshake-o" aria-hidden="true"></i></abbr>
                        <div className="text">Requests</div>
                    </span> </NavLink>
                    </li>

                    <li><NavLink to="/fsent" activeClassName="active"><span><abbr title="Sent Requests"><i className="fa fa-paper-plane" aria-hidden="true"></i></abbr>
                        <div className="text">Sent Requests</div>
                    </span> </NavLink>
                    </li>

                    <li className="logout" onClick={this.handleLogout}><NavLink to="/login"><span><abbr title="Logout"><i className="fa fa-sign-out"
                        aria-hidden="true"></i></abbr>
                        <div className="text"> Logout</div>
                    </span> </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
