import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainSidebar from './MainSidebar'
import axios from 'axios'
import './friends.css'
import Loading from './Loading' 
import friendsSVG from "./friends.svg"
// import { Redirect } from 'react-router-dom'

export default class Friends extends Component {

    state = {
        isLogin: false,
        friends: []
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

    loadProfile = (id) => {
        this.props.history.push("/profile/"+id);
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
                                <h1 className="page-title">Friends</h1>
                            </div>
                            {this.state.friends.length === 0 ? (
                                <div className="row d-flex align-items-center justify-content-center search-svg">
                                    <img src={friendsSVG} alt="friendsSVG" height="350px" />
                                </div>
                            ) : (
                            <div className="row">
                                {this.state.friends.map((obj, index) => {
                                    return <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 dflex justify-content-center" key={index}>
                                        <figure className="figure" onClick={() => this.loadProfile(obj._id)}>
                                            <img src={obj.profilepic} className="figure-img rounded-circle" alt="profilepic" height="80px" width="80px" /><br />
                                            <figcaption className="figure-caption text-center">{obj.name}</figcaption>
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