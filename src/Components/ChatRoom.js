import React, { Component } from 'react'
// import ChatSidebar from './chatSidebar'
import "./chat.css"
import axios from 'axios';
import Loading from "./Loading"
export default class ChatRoom extends Component {
    state = {
        dataLoad: false,
        message: '',
        user: null,
        chat: null,
        chatStart: false,
        messages: []
    }

    componentDidMount() {
        console.log("ChatRoom Called");
        console.log(this.props);
        let id = this.props.chat.chatmembers[0]._id;
        let url = "http://localhost:5000/profile/" + id;
        axios.get(url, {
            headers:{
            token: localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({
                user: res.data,
                chatStart: true
            });
        }).catch(err => console.log(err));
        this.props.io.on('new-message',(data) => {
            const messages = [...this.state.messages, data._doc];
            this.setState({
                messages
            })
            // console.log(data);
        });
    }

    // componentWillUnmount(){
    //     this.props.io.removeAllListeners('new-message');
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit =(e) => {
        e.preventDefault();
        e.target.reset();
        let Token = localStorage.getItem("token");
        let msg = this.state.message;
        var {receiver, sender } = this.props.chat;
        this.props.io.emit('send-message', {Token, msg, receiver, sender}, (response) => {
            const messages = [...this.state.messages, response.msg];
            this.setState({
                messages,
            });  
        })
    }

    render() {
        return (
            
                <div id="page-content-wrapper" className="chatRoom-wrapper">
                    {this.state.chatStart ? (
                        <div className="container-fluid chatRoom">
                            <div className="row bg-dark">
                                <div className="col-12">
                                    <img src={this.props.chat.receiver[0].profilepic} className="figure-img rounded-circle mt-2 mr-3 float-left" alt="profilepic" height="60px" width="60px" />
                                    <h5 className="text-white mt-4">{this.props.chat.receiver[0].name}</h5>
                                </div>
                            </div>
                            <div className="chat-box" id="chat-box">
                                {this.state.messages.map((obj,index) => {
                                    var arr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
                                    var h = new Date(obj.createdAt).getHours();
                                    var m = new Date(obj.createdAt).getMinutes();
                                    var date = new Date(obj.createdAt).getDate();
                                    var month = new Date(obj.createdAt).getMonth();
                                    var year = new Date(obj.createdAt).getFullYear()
                                    h = (h < 10) ? '0' + h : h;
                                    m = (m < 10) ? '0' + m : m;
                                    var timestamp = h + ':' + m;

                                    if(obj.sender._id === this.props.chat.sender._id ){
                                        return <div className="row mt-1" key={index}>
                                            <div className="media w-50 float-right ml-auto">
                                                <div className="media-body">
                                                    <div className="bg-primary rounded py-2 px-3 mb-2">
                                                        <p className="text-small mb-0 text-white ">{obj.message}</p>
                                                    </div>
                                                    <p className="small text-muted ">{timestamp} | {date} {arr[month]} {year}</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    else{
                                        return <div className="row mt-1" key={index}>
                                            <div className="media w-50 float-left"><img src={obj.sender.profilepic} alt="user" width="50" height="50" className="rounded-circle" />
                                                <div className="media-body">
                                                    <div className="bg-light rounded py-2 px-3 mb-2">
                                                        <p className="text-small mb-0 text-muted">{obj.message}</p>
                                                    </div>
                                                    <p className="small text-muted">{timestamp} | {date} {arr[month]} {year}</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })
                                }
                                

                            </div>
                            <form onSubmit={this.handleSubmit} className="bg-light" autoComplete="off">
                                <div className="input-group">
                                    <input type="text" placeholder="Type a message" id="msg" name="message" value={this.state.value} onChange={this.handleChange} className="form-control rounded-0 border-0 py-4 bg-light" />
                                    <div className="input-group-append">
                                        <button id="button-addon2" type="submit" className="btn btn-link"> <i className="fa fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    
                    ) : (
                        <Loading />
                    )}
                </div>     
        )
    }
}
