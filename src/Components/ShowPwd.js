import React, { Component } from 'react'

export default class ShowPwd extends Component {
    render() {
        function togglePwd() {
            var x = document.getElementById("pwd");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        }
        return (
            <div>
                <input type="checkbox" onClick={togglePwd} /> Show Password
            </div>
        )
    }
}
