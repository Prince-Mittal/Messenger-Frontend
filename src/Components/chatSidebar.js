import React, { Component } from 'react'
import axios from 'axios'
import MainSidebar from "./MainSidebar"

export default class chatSidebar extends Component {

    state = {
        isLogin: false,
        friends: [],
        mainbar: false,
        chatExist: false
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

    handleToggleSidebar = (e) => {
        e.preventDefault();
        if(this.state.mainbar){
            this.setState({
                mainbar:false
            });
        }else{
            this.setState({
                mainbar: true
            })
        }
    }

    componentDidMount() {
        if (localStorage.getItem('authenticated')) {
            console.log("Token  is " + localStorage.getItem('token'));
            axios.get("http://localhost:5000/friends/", {
                headers:{
                token: localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.setState({
                            isLogin: true,
                            friends: res.data.friends
                        });
                        console.log(res);
                    }

                })
                .catch(err => console.log(err));
        }
        else {
            this.props.history.push("/");
        }
    }

    handleClick = async (_id) => {
        const Token = localStorage.getItem('token');
        // await axios.post("http://localhost:5000/chat/exist",{_id}, {
        //     headers: {
        //         token: Token
        //     }
        // })
            // .then(res => {
        //         if(res.status === 200 && res.data.chat !== null){
        //             this.setState({
        //                 chatExist: true
        //             });
        //             console.log("Chat Exist");
        //             console.log(res);
        //         }
        //     }).catch(err => console.log(err));
        
        // if(!this.state.chatExist){
            
        // })
        this.props.io.emit('create-private-chat-room', { _id, Token }, (response) => {
            this.props.fun(response);
        });
    }

    render() {
        return (
            <div id="sidebar-wrapper">
                {!this.state.mainbar ? (
                    <ul className="sidebar-nav">

                        <li id="expand"><a href="http://google.com" id="menu-toggle" onClick={this.handleToggle}><span><abbr title="Expand"><i className="fa fa-bars" id="bars"
                            aria-hidden="true"></i></abbr>
                            <div className="text"> Close</div>
                        </span> </a>
                        </li>

                        <li id="expand"><a href="http://google.com" id="menu-toggle" onClick={this.handleToggleSidebar}><span><abbr title="Expand"><i className="fa fa-arrow-left" id="bars"
                            aria-hidden="true"></i></abbr>
                            <div className="text"> back</div>
                        </span> </a>
                        </li>

                        {this.state.friends.map((obj, index) => {
                            return <li key={index}>
                                <a onClick={() => {
                                    this.handleClick(obj._id);
                                }} key={index}><span><abbr title={obj.name}><img src={obj.profilepic} className="rounded-circle" height="50px"
                                width="50px" alt="profile-pic" /></abbr>
                                <div className="text-white"> {obj.name} </div>
                            </span></a>
                            </li>
                        })}

                    </ul>
                ):(
                    <MainSidebar />
                ) 
                
                }
            </div>
        )
    }
}
