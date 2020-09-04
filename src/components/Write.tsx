import React from 'react';
import socketio from 'socket.io-client';
import config from '../config.json';
import './Write.css';

const socket = socketio.connect(config.server);

class Write extends React.Component {
  post(e: any) {
    e.preventDefault();
    e.persist();
    fetch(`${config.server}/userInfo?token=${localStorage.getItem('token')}`)
      .then((res) => res.json())
      .then((data) => {
        socket.emit('update', {
          title: e.target[0].value,
          content: e.target[1].value,
          author: data.username,
        });
        window.location.href = '/';
      });
  }
  render() {
    return (
      <div className="write">
        <h2>글쓰기</h2>
        <form onSubmit={this.post}>
          <label>
            제목
            <input type="text"></input>
          </label>
          <label>
            내용
            <textarea></textarea>
          </label>
          <input type="submit" className="button" value="저장"></input>
        </form>
      </div>
    );
  }
}

export default Write;
