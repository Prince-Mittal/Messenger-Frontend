import React, { Component } from 'react'
import GIF from './loading.gif'

export default class Loading extends Component {
    render() {
        return (
            <div className="loader">
                <img src={GIF} alt="Loader" height="200px" />
            </div>
        )
    }
}
