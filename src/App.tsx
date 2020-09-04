import React from 'react';
import PostList from './components/PostList';
import View from './components/View';
import Login from './components/Login';
import Write from './components/Write';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

class App extends React.Component<{}, { login: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: false,
    };
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>LIVECommunity</h1>
          {(() => {
            if (window.localStorage.getItem('token') === null) {
              return (
                <button onClick={() => this.setState({ login: true })}>
                  로그인
                </button>
              );
            } else {
              return (
                <Link className="button" to="/write">
                  글쓰기
                </Link>
              );
            }
          })()}
        </header>
        <Login show={this.state.login} />
        <Router>
          <Switch>
            <Route exact path="/" component={PostList} />
            <Route exact path="/view/:id" component={View} />
            <Route exact path="/write" component={Write} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
