import React from 'react';
import Unity, { UnityContent } from "react-unity-webgl";
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';

class Edge extends React.Component{
  constructor(props){
    super(props);

    this.unityContent = new UnityContent(
      "Edge/Build/Edge Web.json",
      "Edge/Build/UnityLoader.js"
    );

    this.unityContent.on("LogEvent", eventJSON => {
      const event = JSON.parse(eventJSON);
      axios(API_BASE_URL + 'events', {
        method: "post",
        data: event, 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => console.log(response));
    });

    const { history } = this.props;
    this.unityContent.on("GameOver", function () {
      const payload = {
        edgeCompleted: true
      };
      axios(API_BASE_URL + 'users/me', {
        method: "patch",
        data: payload,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response);
        history.push('/games');
      });
    });

    this.unityContent.setFullscreen(false);
  }

  render() {
    return <Unity unityContent={this.unityContent}/>;
  }
}

export default Edge;