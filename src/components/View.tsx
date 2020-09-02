import React from 'react';
import socketio from 'socket.io-client';
import fetch from 'node-fetch';
import config from '../config.json';

interface Props { match: any; }

interface State {
  title: string;
  content: string;
  author: string;
  comments: Array<string>;
}

class View extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      content: '',
      author: '',
      comments: []
    }
  }
  async componentDidMount() {
    let data = await (await fetch(`${config.server}/posts`)).json()
    this.setState(data[this.props.match.params.id])
  }
  render() {
    return (
      <div className="View">
        <div className="title">{this.state.title}</div>
        <div className="content">{this.state.content}</div>
      </div>
    );
  }
}

export default View;
