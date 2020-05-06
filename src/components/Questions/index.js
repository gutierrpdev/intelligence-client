import React from 'react';
import { Button, Divider, Form, Grid, Segment, Header, Icon, Dropdown, Message } from 'semantic-ui-react'
import { Helmet } from 'react-helmet';
import store from 'store';
import { Redirect } from 'react-router-dom';
import {API_BASE_URL} from '../../constants/apiConstants';
import './styles.css';


class Questions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            knowsBlek : false,
            knowsEdge : false,
            knowsUnpossible: false,
            questionsCompleted: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, {name, value}) {
        this.setState({ [name]: (value === 'yes') });
    }

    getProfile() {
        fetch(API_BASE_URL + 'users/me', {
          method:"GET",
          credentials : 'include',
        })
          .then((data) => {
            return data.json();
          })
          .then((res)=>{
            const user = res;
            this.setState(...user);
          })
          .catch(e => {
            console.log(e);
          });
      }

    render(){
        return(
            <div>
                <Helmet>
                    <title>Intelligence Assessment Games | Questions</title>
                </Helmet>

                <Message
                icon='question circle outline' size='medium'
                header='Preguntas adicionales'
                content={this.state.questionsCompleted?'Ya has completado esta sección. ¡Muchas gracias por tu colaboración!':
                'Por favor, tómate un minuto para responder a las siguientes preguntas y haz click en "Enviar" cuando hayas terminado. Muchas gracias por tu ayuda.'}
                />

                <Form.Group inline>
                <label>¿Habías jugado alguna vez a EDGE?</label>
                <Form.Radio
                    label='Sí'
                    name='knowsEdge'
                    value='yes'
                    checked={value === 'yes'}
                    onChange={this.handleChange}
                />
                <Form.Radio
                    label='No'
                    name='knowsEdge'
                    value='no'
                    checked={value === 'no'}
                    onChange={this.handleChange}
                />
                </Form.Group>

                <Form.Group inline>
                <label>¿Habías jugado alguna vez a BLEK?</label>
                <Form.Radio
                    label='Sí'
                    name='knowsBlek'
                    value='yes'
                    checked={value === 'yes'}
                    onChange={this.handleChange}
                />
                <Form.Radio
                    label='No'
                    name='knowsBlek'
                    value='no'
                    checked={value === 'no'}
                    onChange={this.handleChange}
                />
                </Form.Group>

                <Form.Group inline>
                <label>¿Habías jugado alguna vez a UNPOSSIBLE?</label>
                <Form.Radio
                    label='Sí'
                    name='knowsUnpossible'
                    value='yes'
                    checked={value === 'yes'}
                    onChange={this.handleChange}
                />
                <Form.Radio
                    label='No'
                    name='knowsUnpossible'
                    value='no'
                    checked={value === 'no'}
                    onChange={this.handleChange}
                />
                </Form.Group>
            </div>
                );
    }

}

export default Questions;