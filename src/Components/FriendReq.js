import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainSidebar from './MainSidebar'
import Loading from './Loading'
import axios from 'axios'
import './friends.css'
import requestSVG from "./requests.svg"

export default class FriendReq extends Component {

    state = {
        isLogin: false,
        friendsReq: []
    }

    componentDidMount() {
        if (localStorage.getItem('authenticated')) {
            console.log("Token  is " + localStorage.getItem('token'));
            axios.post("http://localhost:5000/friends/requests", {
                token: localStorage.getItem('token')
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.setState({
                            isLogin: true,
                            friendsReq: res.data.frequests
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

    loadProfile = (id) => {
        this.props.history.push("/profile/" + id);
    }

    acceptReq = (obj) => {
        let url = "http://localhost:5000/friends/acceptReq/"+obj._id;
        axios.post(url , { token: localStorage.getItem("token")})
        .then(res => {
            if(res.status === 200){
                let reqs = this.state.friendsReq.filter(user => user!==obj);
                this.setState({
                    friendsReq: reqs
                });
            }
        }).catch(err => console.log(err));
    }

    rejectReq = (obj) => {
        let url = "http://localhost:5000/friends/rejectReq/" + obj._id;
        axios.post(url, { token: localStorage.getItem("token") })
            .then(res => {
                if (res.status === 200) {
                    let reqs = this.state.friendsReq.filter(user => user !== obj);
                    this.setState({
                        friendsReq: reqs
                    });
                }
            }).catch(err => console.log(err));
    }

    render() {
        return (
            !this.state.isLogin ? (<div>
                <MainSidebar />
                <Loading />
            </div>) : (
                <div id="wrapper">
                    <MainSidebar />
                    <div id="page-content-wrapper">
                        <div className="container">
                            <div className="row mb-3">
                                <h1 className="page-title">Requests</h1>
                            </div>
                        {this.state.friendsReq.length === 0 ? (
                            <div className="row d-flex align-items-center justify-content-center request-svg">
                                <img src={requestSVG} alt="searchSVG" height="350px" />
                            </div>
                        ) : (
                            <div className="row">
                                {this.state.friendsReq.map((obj, index) => {
                                    return <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 dflex justify-content-center" key={index}>
                                        <figure className="figure">
                                            <img src={obj.profilepic} onClick={() => this.loadProfile(obj._id)} className="figure-img rounded-circle" alt="profilepic" height="80px" width="80px" /><br />
                                            <figcaption className="figure-caption text-center">{obj.name}</figcaption>
                                            <div className="decision ml-2">
                                                <i className="fa fa-check-circle mr-3 accept" aria-hidden="true" onClick={() => this.acceptReq(obj)}></i>
                                                <i className="fa fa-times-circle reject" aria-hidden="true" onClick={() => this.rejectReq(obj)}></i>
                                            </div>
                                        </figure>
                                    </div>
                                })}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            )

        )
    }
}