import React from 'react';
import Unity, { UnityContent } from "react-unity-webgl";
import {API_BASE_URL} from '../../constants/apiConstants';

class Blek extends React.Component{
  constructor(props){
    super(props);

    this.unityContent = new UnityContent(
      "Blek/Build/BlekWeb.json",
      "Blek/Build/UnityLoader.js"
    );

    this.unityContent.on("LogEvent", eventJSON => {
      const event = JSON.parse(eventJSON);
      console.log(event);
      fetch(API_BASE_URL + 'events', {
        method: 'POST',
        body: JSON.stringify(event), 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => console.log(response))
      .catch(err => console.log(err));
    });

    const { history } = this.props;
    this.unityContent.on("GameOver", function () {
      const payload = {
        blekCompleted: true
      };
      fetch(API_BASE_URL + 'users/me', {
        method: 'PATCH',
        body: JSON.stringify(payload),
        credentials: 'include'
      })
      .then(response => {
        console.log(response);
        history.push('/games');
      })
      .catch(err => {
        console.log(err);
      });
    });

    this.unityContent.setFullscreen(false);
  }

  render() {
    return <Unity unityContent={this.unityContent}/>;
  }
}

export default Blek;