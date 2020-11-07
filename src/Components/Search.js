import React, { Component } from 'react'
import "./search.css"
import MainSidebar from './MainSidebar'
import Loading from "./Loading.js"
import axios from "axios"
import search from "./userSearch.svg"

export default class Search extends Component {

    state = {
        isLogin: false,
        search: '',
        users: []
    }

    componentDidMount() {
        if (localStorage.getItem('authenticated')) {
            console.log("Token  is " + localStorage.getItem('token'));
            axios.post("http://localhost:5000/auth/verifyToken", {
                token: localStorage.getItem('token')
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            isLogin: true,
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/friends/search", {
            token: localStorage.getItem("token"),
            name: this.state.search
        }).then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    render() {
        return (
            !this.state.isLogin ? (<Loading />) : (
                <div id="wrapper">
                    <MainSidebar />
                    <div id="page-content-wrapper">
                        <div className="container">
                            <div className="row searchbar d-flex justify-content-center align-items-center mb-5 mt-3">
                                <form onSubmit={this.handleSubmit}>
                                    <input type="text" placeholder="Search User" name="search" value={this.state.value} onChange={this.handleChange} />
                                    <button type="submit" className="search btn btn-success ml-3"><i className="fa fa-search" aria-hidden="true"></i> Search</button>
                                </form>
                            </div>
                            {this.state.users.length === 0 ? (
                                <div className="row d-flex align-items-center justify-content-center search-svg">
                                    <img src={search} alt="searchSVG" height="350px" />
                                </div>
                            ) : (
                                    <div className="row">
                                        {this.state.users.map((obj, index) => {
                                            return <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 dflex justify-content-center" key={index}>
                                                <figure className="figure">
                                                    <img src={obj.profilepic} onClick={() => this.loadProfile(obj._id)} className="figure-img rounded-circle" alt="profilepic" height="80px" width="80px" /><br />
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
