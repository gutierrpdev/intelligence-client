import React from 'react';
import Unity, { UnityContent } from "react-unity-webgl";
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';

class Unpossible extends React.Component{
  constructor(props){
    super(props);

    this.unityContent = new UnityContent(
      "Unpossible/Build/Build.json",
      "Unpossible/Build/UnityLoader.js"
    );

    this.unityContent.on("LogEvent", eventJSON => {
      const event = JSON.parse(eventJSON);
      axios(API_BASE_URL + 'events', {
        method: "post",
        data: event, 
        withCredentials: true
      })
      .then(response => console.log(response));
    });

    const { history } = this.props;
    this.unityContent.on("GameOver", function () {
      const payload = {
        blekCompleted: true
      };
      axios(API_BASE_URL + 'users/me', {
        method: "patch",
        data: payload,
        withCredentials: true
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

export default Unpossible;