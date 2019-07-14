import React, { Component } from 'react';
import './App.scss';

class App extends Component {
    componentDidMount() {
    window["__onGCastApiAvailable"] = isAvailable => {
      if (isAvailable) {
        this.initializeCastApi();
      }
    };
  }

  initializeCastApi = () => {
    const context = cast.framework.CastContext.getInstance();
    context.setOptions({
      receiverApplicationId: "804329DF",
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
    context.addEventListener(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      event => console.log(event)
    );
    context.addEventListener(
      cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      event => console.log(event)
    );
  };

  onClick = () => {
    const mediaInfo = new chrome.cast.media.MediaInfo(
      "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
      "video/mp4"
    );
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    castSession.loadMedia(request).then(
      function() {
        console.log("Load succeed");
      },
      function(errorCode) {
        console.log("Error code: " + errorCode);
      }
    );
  };

  render() {
    return (
      <div className="app">
        <google-cast-launcher />
        <button onClick={this.onClick}>Cast</button>
      </div>
    );
  }
}

export default App;
