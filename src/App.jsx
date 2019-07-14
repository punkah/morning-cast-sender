import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  componentDidMount() {
    /* eslint-disable */
    window.__onGCastApiAvailable = isAvailable => {
      if (isAvailable) {
        this.initializeCastApi();
      }
    };
  }

  initializeCastApi = () => {
    const context = cast.framework.CastContext.getInstance();
    context.setOptions({
      receiverApplicationId: '804329DF',
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });
    context.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, event =>
      console.log(event),
    );
    context.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, event =>
      console.log(event),
    );
  };

  onClick = () => {
    const mediaInfo = new chrome.cast.media.MediaInfo(
      'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4',
      'video/mp4',
    );
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    castSession.loadMedia(request).then(
      () => {
        console.log('Load succeed');
      },
      errorCode => {
        console.log(`Error code: ${errorCode}`);
      },
    );
  };

  render() {
    return (
      <div className="app">
        <div id="app-cast-launcher">
          <google-cast-launcher />
        </div>
        <div id="app-cast-button">
          <button onClick={this.onClick} type="button">
            Cast
          </button>
        </div>
      </div>
    );
  }
}

export default App;
