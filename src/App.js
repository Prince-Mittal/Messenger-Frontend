import React, {Component} from 'react'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Profile from './Components/Profile'
import FriendReq from './Components/FriendReq'
import Friends from './Components/Friends'
import ReqSent from './Components/ReqSent'
import Search from './Components/Search'
import Chat from './Components/Chat'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
class App extends Component{

  render(){
    return(
      <BrowserRouter>
      <div className="App">
        <Switch>
        <Redirect exact from='/' to="/login" />
        <Route path='/login' component={Login} />
        <Route path='/register' component={SignUp} />
        <Route exact path='/profile' key="self-profile" component={Profile} />
        <Route exact path='/profile/:id' key="other-profile" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path='/requests' component={FriendReq} />
        <Route path='/friends' component={Friends} />
        <Route path='/fsent' component={ReqSent} />
        <Route exact path='/chat' component={Chat} />
        {/* <Route exact path="/chat/:id" component={ChatRoom} /> */}
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
