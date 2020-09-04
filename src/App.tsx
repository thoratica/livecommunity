import React from 'react';
import PostList from './components/PostList';
import './App.css';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PostList />
      </div>
    );
  }
}

export default App;
