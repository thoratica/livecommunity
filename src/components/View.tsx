import React from 'react';
import socketio from 'socket.io-client';
import fetch from 'node-fetch';
import Markdown from 'react-markdown/with-html';
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
  delete: any;
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
      delete: '',
    };
  }
  async componentDidMount() {
    this.setState(
      await (
        await fetch(`${config.server}/post/${this.props.match.params.id}`)
      ).json()
    );
    socket.on('updated', async () => {
      this.setState(
        await (
          await fetch(`${config.server}/post/${this.props.match.params.id}`)
        ).json()
      );
    });
    // eslint-disable-next-line
    eval(`document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });`)
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
  remove(e: any, sans: any) {
    e.preventDefault();
    e.persist();
    fetch(`${config.server}/userInfo?token=${localStorage.getItem('token')}`)
      .then((res) => res.json())
      .then((data) => {
        socket.emit('delete', {
          id: sans.props.match.params.id,
        });
        window.location.href = '/';
      });
  }
  render() {
    fetch(`${config.server}/userInfo?token=${localStorage.getItem('token')}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.username === this.state.author) {
          this.setState({
            delete: (
              <button className="delete" onClick={(e) => this.remove(e, this)}>
                삭제
              </button>
            ),
          });
        } else {
          this.setState({ delete: <></> });
        }
      });
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
        <div className="content">
          <Markdown source={this.state.content} escapeHtml={false} />
        </div>
        {this.state.delete}
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
