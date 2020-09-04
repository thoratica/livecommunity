import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Write from './components/Write';
import View from './components/View';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/view/:id" component={View} />
      </Switch>
    </Router>
  </>,
  document.getElementById('root')
);
