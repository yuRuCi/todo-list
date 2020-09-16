import React, { Component } from 'react';
import logo from './image/logo.svg';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button type='primary'>
          <Link to='/todo-list'>进入todo-list</Link>
        </Button>
      </header>
    </div>
    )
  }
}