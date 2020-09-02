import React from 'react';
import PostList from './components/PostList';
import View from './components/View';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

class App extends React.Component<{}, { login: boolean; }> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: false
    }
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>LIVE Community</h1>
          {(() => {
            if (true) {
              return (
                <button onClick={() => this.setState({ login: true })}>로그인</button>
              );
            } else {
              return (
                <a href="/login">
                  <button>글쓰기</button>
                </a>
              );
            }
          })()}
        </header>
        <Login show={this.state.login} />
        <Router>
          <Switch>
            <Route exact path="/" component={PostList} />
            <Route exact path="/view/:id" component={View} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
