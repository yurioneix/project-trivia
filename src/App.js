import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feeback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feeback } />
    </Switch>
  );
}
