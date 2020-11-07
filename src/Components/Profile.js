import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainSidebar from './MainSidebar'
import ProfileSection from './ProfileSection'
import Loading from './Loading'
import axios from 'axios'

export default class Profile extends Component{

    state ={
        isLogin: false,
        userData: {},
        self: true,
        id: "",
    }

    async componentDidMount(){
        console.log("profile page ran");
        if (localStorage.getItem('authenticated')){
            let url;
            if (this.props.match.params.id){
                url = "http://localhost:5000/profile/"+this.props.match.params.id;
                this.setState({
                    self:false,
                    id: this.props.match.params.id,
                })
            }
            else{
                url = "http://localhost:5000/profile/";
            }
            await axios.get(url, {
                headers : {
                token: localStorage.getItem('token')
                }
            })
                .then(res => {
                    if(res.status === 200){
                        this.setState({
                            isLogin: true,
                            userData: res.data
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

    render(){
        return(
            !this.state.isLogin ? (<Loading />)  : (
                <div id="wrapper">
                    <MainSidebar />
                    <ProfileSection user={this.state.userData} self={this.state.self} id={this.state.id} />
                </div>
            )
            
        )
    }
}