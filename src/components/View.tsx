import React from 'react';
import socketio from 'socket.io-client';
import fetch from 'node-fetch';
import config from '../config.json';
import './View.css';

interface Props {
  match: any;
}

interface State {
  title: string;
  content: string;
  author: string;
  comments: Array<any>;
}

const socket = socketio.connect(config.server);

class View extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      content: '',
      author: '',
      comments: [],
    };
  }
  async componentDidMount() {
    this.setState(
      (await (await fetch(`${config.server}/posts`)).json())[
        this.props.match.params.id
      ]
    );
    socket.on('updated', async () => {
      this.setState(
        (await (await fetch(`${config.server}/posts`)).json())[
          this.props.match.params.id
        ]
      );
    });
  }
  back() {
    window.location.href = '/';
  }
  comment(e: any, sans: any) {
    e.preventDefault();
    e.persist();
    fetch(`${config.server}/userInfo?token=${localStorage.getItem('token')}`)
      .then((res) => res.json())
      .then((data) => {
        socket.emit('comment', {
          id: sans.props.match.params.id,
          username: data.username,
          content: e.target[0].value,
        });
        e.target[0].value = '';
      });
  }
  render() {
    let comments = [];
    for (let i = 0; i < Object.keys(this.state.comments).length; i++) {
      comments.push(
        <div className="comment" key={i}>
          <span className="commentUsername">
            {this.state.comments[i].username}
          </span>
          <span className="commentContent">
            {this.state.comments[i].content}
          </span>
        </div>
      );
    }
    return (
      <div className="View">
        <button className="back" onClick={this.back}>
          목록으로
        </button>
        <div className="top">
          <div className="title">{this.state.title}</div>
          <div className="author">by {this.state.author}</div>
        </div>
        <hr />
        <div className="content">{this.state.content}</div>
        <hr />
        <h3>댓글 {comments.length}개</h3>
        {(() => {
          if (window.localStorage.getItem('token') !== null) {
            return (
              <form className="flex" onSubmit={(e) => this.comment(e, this)}>
                <input type="text" placeholder="댓글 입력"></input>
                <input
                  type="submit"
                  value="올리기"
                  className="button comment"
                ></input>
              </form>
            );
          }
        })()}
        <div className="commentList">{comments}</div>
      </div>
    );
  }
}

export default View;
