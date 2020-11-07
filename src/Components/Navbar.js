import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="nav">
                <NavLink className="nav-link text-white" activeClassName="active" to="/login">Login</NavLink>
                <NavLink className="nav-link text-white" activeClassName="active" to="/register">Register</NavLink>
            </nav>
        )
    }
}
