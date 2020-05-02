import React from 'react';
import Axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updateTitle: props.updateTitle,
            userData: props.userData
        }
    }
    
    redirectToBlek = () => {
        this.state.updateTitle('Blek');
        this.props.history.push('/blek');
    }

    fetchBlekCsv = async () => {
        const response = Axios.get(API_BASE_URL + 'files/blek');
    }

    render() {
        return (
        <div className="mt-2">
            {JSON.stringify(this.props.userData)}
            <button type="button" onClick={this.redirectToBlek}>
                Play Blek.
            </button>
            <button type="button" onClick={this.fetchBlekCsv}>
                Play Blek.
            </button>
        </div>
        );
    }
}

export default withRouter(Home);