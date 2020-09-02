import React from 'react';
import './Login.css';

interface LoginProps {
  show: boolean;
}

class Login extends React.Component<LoginProps, {}> {
  render() {
    if (this.props.show) {
      return (
        <div className="Login">
          <div className="dim"></div>
          <main>
            <h2>로그인</h2>
            <form>
              <label>
                아이디
                <input type="text" id="username"></input>
              </label>
              <label>
                비밀번호
                <input type="password" id="password"></input>
              </label>
            </form>
          </main>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Login;
