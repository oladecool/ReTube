import React from 'react';
import SearchBar from './components/SearchBar'
import youtube from './apis/youtube';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import './App.css';

const KEY = 'AIzaSyBomHeIsM7csE7t4AVb9iUfxDvxqMzfCGs';

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit('naija');
  }

  onTermSubmit = async term => {
   const res = await youtube.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY,
        q: term
      }
   });
    
    this.setState({ 
      videos: res.data.items,
      selectedVideo: res.data.items[0]
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
