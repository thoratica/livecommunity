import React from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';

export default class Header extends React.Component<{}, { login: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: false,
    };
  }
  render() {
    return (
      <>
        <header>
          <h1>LIVE Community</h1>
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
      </>
    );
  }
}
