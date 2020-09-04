import React from 'react';
import socketio from 'socket.io-client';
import fetch from 'node-fetch';
import { Link } from 'react-router-dom';
import config from '../config.json';
import './PostList.css';

interface Props {}

interface States {
  data: any;
}

const socket = socketio.connect(config.server);

class PostList extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    fetch(`${config.server}/posts`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      });
    socket.on('updated', async () => {
      this.setState({
        data: await (await fetch(`${config.server}/posts`)).json(),
      });
    });
  }
  render() {
    let post = [];
    if (Object.keys(this.state.data).length === 0) {
      post.push(
        <h2 className="noposts" key={'noposts'}>
          글이 없습니다.
        </h2>
      );
    } else {
      for (let i = 0; i < Object.keys(this.state.data).length; i++) {
        post.push(
          <div className="post" key={i}>
            <Link
              to={`/view/${Object.keys(this.state.data)[i]}`}
              className="postTitle"
            >
              {this.state.data[Object.keys(this.state.data)[i]].title}
              <span className="commentCount">({this.state.data[Object.keys(this.state.data)[i]].comments.length})</span>
            </Link>
            <span className="postAuthor">
              {this.state.data[Object.keys(this.state.data)[i]].author}
            </span>
            <span className="postViews">
              {this.state.data[Object.keys(this.state.data)[i]].views}
            </span>
          </div>
        );
      }
    }
    return (
      <div className="posts">
        <div className="post title">
          <span className="postTitle">제목</span>
          <span className="postAuthor">작성자</span>
          <span className="postViews">조회수</span>
        </div>
        <div className="postList">{post}</div>
      </div>
    );
  }
}

export default PostList;
