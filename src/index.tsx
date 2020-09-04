import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import View from './components/View';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <>
    <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/view/:id" component={View} />
    </Router>
  </>,
  document.getElementById('root')
);
