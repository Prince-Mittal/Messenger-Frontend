import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainSidebar from './MainSidebar'
import axios from 'axios'
import './friends.css'
import Loading from './Loading'
import requestSVG from './requests.svg'
// import { Redirect } from 'react-router-dom'

export default class ReqSent extends Component {

    state = {
        isLogin: false,
        fsent: []
    }

    componentDidMount() {
        if (localStorage.getItem('authenticated')) {
            console.log("Token  is " + localStorage.getItem('token'));
            axios.post("http://localhost:5000/friends/reqsent/", {
                token: localStorage.getItem('token')
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.setState({
                            isLogin: true,
                            fsent: res.data.fsent
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

    cancelReq = (obj) => {
        let url = "http://localhost:5000/friends/cancelReq/" + obj._id;
        axios.post(url, { token: localStorage.getItem("token") })
            .then(res => {
                if (res.status === 200) {
                    let reqs = this.state.fsent.filter(user => user !== obj);
                    this.setState({
                        fsent: reqs
                    });
                }
            }).catch(err => console.log(err));
    }

    render() {
        return (
            !this.state.isLogin ? (<div>
                <MainSidebar />
                <Loading />
                </div>
            ) : (
                    <div id="wrapper">
                        <MainSidebar />
                        <div id="page-content-wrapper">
                            <div className="container">
                            <div className="row mb-3">
                                <h1 className="page-title">Requests Sent</h1>
                            </div>
                            {this.state.fsent.length === 0 ? (
                                <div className="row d-flex align-items-center justify-content-center request-svg">
                                    <img src={requestSVG} alt="searchSVG" height="350px" />
                                </div>
                            ) : (
                                <div className="row">
                                    {this.state.fsent.map((obj, index) => {
                                        return <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 d-flex justify-content-center align-items-center" key={index}>
                                            <figure className="figure">
                                                <img src={obj.profilepic} onClick={() => this.loadProfile(obj._id)} className="figure-img rounded-circle shadow-lg" alt="profilepic" height="80px" width="80px" /><br />
                                                <figcaption className="figure-caption text-center">{obj.name}</figcaption>
                                                <button className="btn btn-outline-danger ml-1 mt-1" onClick={() => this.cancelReq(obj)}>Cancel</button>
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