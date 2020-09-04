import React from 'react';
import fetch from 'node-fetch';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Policy from './Policy';
import config from '../config.json';
import 'react-tabs/style/react-tabs.css';
import './Login.css';

interface LoginProps {
  show: boolean;
}

class Login extends React.Component<LoginProps, {}> {
  login(e: any) {
    e.preventDefault();
    fetch(`${config.server}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === 'false')
          return alert('아이디 또는 비밀번호가 잘못되었습니다.');
        localStorage.setItem('token', data);
        window.location.reload()
      });
  }
  signup(e: any) {
    e.preventDefault();
    if (e.target[0].value.length < 4 || e.target[1].value.length < 5)
      return alert('아이디는 4글자, 비밀번호는 5글자 이상이어야 합니다.');
    fetch(`${config.server}/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value,
        email: e.target[2].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === 'false') return alert('이미 존재하는 아이디입니다.');
        localStorage.setItem('token', data);
        window.location.reload()
      });
  }
  render() {
    if (this.props.show) {
      return (
        <div className="Login">
          <div className="dim"></div>
          <main>
            <Tabs>
              <TabList>
                <Tab>로그인</Tab>
                <Tab>회원가입</Tab>
              </TabList>
              <TabPanel>
                <img
                  className="banner"
                  src="https://i.ibb.co/wr443vC/image.png"
                  alt=""
                />
                <form onSubmit={this.login}>
                  <div className="inputs">
                    <label>
                      아이디
                      <input type="text" id="username"></input>
                    </label>
                    <label>
                      비밀번호
                      <input type="password" id="password"></input>
                    </label>
                  </div>
                  <input
                    className="button"
                    type="submit"
                    value="로그인"
                  ></input>
                </form>
              </TabPanel>
              <TabPanel>
                <Policy />
                <form onSubmit={this.signup}>
                  <div className="inputs">
                    <label>
                      아이디
                      <input type="text" id="username"></input>
                    </label>
                    <label>
                      비밀번호
                      <input type="password" id="password"></input>
                    </label>
                    <label>
                      이메일
                      <input type="email" id="email"></input>
                    </label>
                  </div>
                  <input
                    className="button"
                    type="submit"
                    value="회원가입"
                  ></input>
                </form>
              </TabPanel>
            </Tabs>
          </main>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Login;
