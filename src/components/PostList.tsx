import React from 'react';
import socketio from 'socket.io-client';
import fetch from 'node-fetch';
import { Link } from 'react-router-dom';
import config from '../config.json';
import './PostList.css';

interface Props {
  rows: number;
}

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
    socket.emit('update', { title: 'tica_', content: '샌즈', author: 'sans' });
    socket.on('updated', async (msg: string) => {
      this.setState({
        data: await (await fetch(`${config.server}/posts`)).json(),
      });
    });
  }
  render() {
    let post = [];
    for (let i = 0; i < Object.keys(this.state.data).length; i++) {
      post.push(
        <div className="post">
          <Link to={`/view/${i + 1}`} className="postTitle" key={i}>
            {this.state.data[Object.keys(this.state.data)[i]].title}
          </Link>
          <span className="postAuthor">{this.state.data[Object.keys(this.state.data)[i]].author}</span>
        </div>
      );
    }
    return <div className="posts">
      <div className="post title">
        <span className="postTitle">제목</span>
        <span className="postAuthor">작성자</span>
      </div>
      {post}
    </div>;
  }
}

export default PostList;
