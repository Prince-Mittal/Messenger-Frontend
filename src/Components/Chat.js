import React, { Component } from 'react'
import ChatSidebar from "./chatSidebar"
import ChatSVG from './chat.svg'
import "./chat.css"
import SocketIO from "socket.io-client"
import ChatRoom from './ChatRoom'

const io = SocketIO('http://localhost:5000');

export default class Chat extends Component {

    state = {
        activeChat: null
    }

    componentDidMount(){
        const Token = localStorage.getItem('token');
        io.emit('new-connection', { Token });
    }

    updateChats = async (data) => {
        data.chat.sender = data.chat.chatmembers[1];
        data.chat.receiver = data.chat.chatmembers.filter((e,i) => i !== 1);
        await this.setState({
            activeChat: data.chat
        });
        console.log(this.state.activeChat);
    }

    render() {
        return (
            <div id="wrapper">
                <ChatSidebar io={io} fun={this.updateChats}/>
                {this.state.activeChat ? (
                    <ChatRoom io={io} chat={this.state.activeChat}/>
                ) : (
                    <div id = "page-content-wrapper">
                    <div className = "container">
                        <div className = "row mb-3">
                            <h1 className = "page-title">Chat</h1>
                        </div >
                        <div className="row chat-div d-flex align-items-center justify-content-center">
                            <img src={ChatSVG} alt="Chat SVG" />
                        </div>
                    </div >
                    </div >
                )}
                
            </div>
        )
    }
}
