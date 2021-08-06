import React, { Component } from "react";
import Login from "./containers/Login";
import Admin from "./containers/Admin";
import {Route} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div className = "app">
        <Route path = "/login" component = {Login}/>
        <Route path = "/admin" component = {Admin}/>
      </div>
    );
  }
}
