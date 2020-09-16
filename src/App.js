import React from 'react';
import './App.less';
import { TodoList, Home } from './components';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route component={ Home } path='/home' />
        <Route component={ TodoList } path='/todo-list' />
        <Redirect to='/home' from='/' />
      </Switch>
    </div>
  );
}

export default App;
