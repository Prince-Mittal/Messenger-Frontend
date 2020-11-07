import React, { Component } from 'react'
import "./profile.css"
import axios from 'axios'
export default class ProfileSection extends Component {

    state = {
        reqSent: 0,
    }

    componentDidMount() {
        if(this.props.id !== ""){
        axios.post("http://localhost:5000/friends/checkUser/" + this.props.id, {
            token: localStorage.getItem("token")
        }).then(res => {
            console.log("inside profile sec res is "+res.data.value);
            this.setState({
                reqSent: res.data.value
            })
        }).catch(err => console.log(err));
        }
    }

    sendReq = () => {
        let url = "http://localhost:5000/friends/sendReq/" + this.props.id
        axios.post(url, {
            token: localStorage.getItem("token")
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    reqSent: 1
                });
            }
        }).catch(err => console.log(err));
    }

    cancelReq = () => {
        let url = "http://localhost:5000/friends/cancelReq/" + this.props.id
        axios.post(url, {
            token: localStorage.getItem("token")
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    reqSent: 0
                });
            }
        }).catch(err => console.log(err));
    }
    
    render() {
        let user = this.props.user;
        return (
            <div id="page-content-wrapper" className="profile-sec">
                <div className="container-fluid">
                    <div className="row img-row mt-4">
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4">
                            <img src={user.profilepic} alt="" width="180px" height="180px" className="rounded-circle" />
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-4">
                            <p className="text-uppercase"><span className="text-success">Joined on </span>{user.date}</p>
                            <h1>{user.name}</h1>
                            <h4 className="text-muted">Add your Bio here</h4>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="text-center">
                                <p className="text-uppercase">Total Friends</p>
                                <h1 className="text-success">{user.friends}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="row icons-row mt-3">
                        <div className="col-md-2 text-center about1">
                            <p className="text-muted"><i className="fa fa-map-marker"></i>Location</p>
                        </div>
                        <div className="col-md-3 text-center about2">
                            <p className="text-muted"><i className="fa fa-phone"></i>99999-99999</p>
                        </div>
                        <div className="col-md-4 col-sm-8 text-center about3">
                            <p className="text-muted"><i className="fa fa-envelope"></i>{user.email}</p>
                        </div>
                        {this.props.self ? (
                            <div className="col-md-3 col-sm-4 text-center about4">
                                <button className="btn btn-outline-warning "><i className="fa fa-pencil-square-o mr-2 text-white" aria-hidden="true"></i> Update</button>
                            </div>
                        ) : ( this.state.reqSent === 1 ? (
                                <div className="col-md-3 text-center">
                                    <button className="btn btn-outline-danger " onClick={this.cancelReq}><i className="fa fa-times mr-2 text-white" aria-hidden="true"></i> Cancel Request</button>
                                </div>
                            ) : (
                                this.state.reqSent === 0 ? (
                                    <div className="col-md-3 text-center">
                                        <button className="btn btn-outline-success " onClick={this.sendReq}><i className="fa fa-plus mr-2 text-white" aria-hidden="true"></i> Send Request</button>
                                    </div>
                                ) : (
                                    <div className="col-md-3 text-center">
                                                <button className="btn btn-primary "><i className="fa fa-handshake-o mr-2 text-white" aria-hidden="true"></i> Friends</button>
                                    </div>
                                )
                            )
                        )}
                    </div>
                    <div className="container about-row mt-5">
                        <h3 className="mb-4">About: </h3>
                        <div className="col-md-6 col-sm-6 col-12 first-div">
                            <h4 className="text-success">Schooling: </h4>
                            <p className="pEdgu text-muted">Enter School here </p>
                            <h4 className="text-success">Matriculation: </h4>
                            <p className="sEdgu text-muted">Enter Details</p>
                            <h4 className="text-success">Higher Studies: </h4>
                            <p className="hEdgu text-muted">College Details here</p>
                        </div>
                        <div className="col-md-6 col-sm-6 col-12 sec-div">
                            <h4 className="text-success">Username: </h4>
                            <p className="text-muted">{user.username}</p>
                            <h4 className="text-success">Gender: </h4>
                            <p className="text-muted">{user.gender}</p>
                            <h4 className="text-success">DOB: </h4>
                            <p className="text-muted">31/12/1999</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
