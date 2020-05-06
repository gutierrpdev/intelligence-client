import React from 'react';
import { Form, Message, Container } from 'semantic-ui-react'
import { Helmet } from 'react-helmet';
import {API_BASE_URL} from '../../constants/apiConstants';


class Questions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            knowsBlek : '',
            knowsEdge : '',
            knowsUnpossible: '',
            questionsCompleted: false,
            error: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    handleChange(e, {name, value}) {
        this.setState({ [name]: value });
    }

    sendForm(e){
        e.preventDefault();

        this.setState({error: this.knowsBlek === '' || this.knowsEdge === '' || this.knowsUnpossible === ''});
        if(this.state.error) return;
        this.setState({questionsCompleted : true});

        const payload = {
            knowsBlek: this.state.knowsBlek === 'yes',
            knowsEdge: this.state.knowsEdge === 'yes',
            knowsUnpossible: this.state.knowsUnpossible === 'yes',
            questionsCompleted: true
        };
          fetch(API_BASE_URL + 'users/me', {
            method: 'PATCH',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
    }

    componentDidMount() {
        this.getProfile();
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
            this.setState({questionsCompleted : user.questionsCompleted});
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
                'Una última cosilla... por favor, responde a las siguientes preguntas y haz click en "Enviar" cuando hayas terminado. Muchas gracias por tu ayuda.'}
                />

        <Grid celled centered columns={3}>
          <Grid.Column attached>
            <Image src='/img/edge.jpg' size="large" rounded centered/>
            <Form.Group inline>
                <label>¿Habías jugado alguna vez a EDGE?</label>
                <Form.Radio
                    disabled={this.state.questionsCompleted}
                    label='Sí'
                    name='knowsEdge'
                    value='yes'
                    checked={this.state.knowsEdge === 'yes'}
                    onChange={this.handleChange}
                />
                <Form.Radio
                    disabled={this.state.questionsCompleted}
                    label='No'
                    name='knowsEdge'
                    value='no'
                    checked={this.state.knowsEdge === 'no'}
                    onChange={this.handleChange}
                />
                </Form.Group>

          </Grid.Column>
          <Grid.Column attached>
            <Image src='/img/blek.jpg' size="large" rounded centered/>
            <Form.Group inline>
                <label>¿Habías jugado alguna vez a BLEK?</label>
                <Form.Radio
                    disabled={this.state.questionsCompleted}
                    label='Sí'
                    name='knowsBlek'
                    value='yes'
                    checked={this.state.knowsBlek === 'yes'}
                    onChange={this.handleChange}
                />
                <Form.Radio
                    disabled={this.state.questionsCompleted}
                    label='No'
                    name='knowsBlek'
                    value='no'
                    checked={this.state.knowsBlek === 'no'}
                    onChange={this.handleChange}
                />
                </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Image src='/img/unpossible.png' size="large" rounded centered/>
            <Form.Group inline>
                <label>¿Habías jugado alguna vez a UNPOSSIBLE?</label>
                <Form.Radio
                    disabled={this.state.questionsCompleted}
                    label='Sí'
                    name='knowsUnpossible'
                    value='yes'
                    checked={this.state.knowsUnpossible === 'yes'}
                    onChange={this.handleChange}
                />
                <Form.Radio
                    disabled={this.state.questionsCompleted}
                    label='No'
                    name='knowsUnpossible'
                    value='no'
                    checked={this.state.knowsUnpossible === 'no'}
                    onChange={this.handleChange}
                />
                </Form.Group>
          </Grid.Column>
          <Form.Button attached='bottom' onClick={this.sendForm} disabled={this.state.questionsCompleted}>Enviar</Form.Button>
        </Grid>
            </div>
                );
    }

}

export default Questions;