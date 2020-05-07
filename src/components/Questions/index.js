import React from 'react';
import { Form, Message, Grid, Image, Button, Checkbox } from 'semantic-ui-react'
import { Helmet } from 'react-helmet';
import {API_BASE_URL} from '../../constants/apiConstants';


class Questions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            knowsBlek : 0,
            knowsEdge : 0,
            knowsUnpossible: 0,
            questionsCompleted: false
        }

        this.handleResult = this.handleResult.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    handleChange(e, {name, value}) {
        this.setState({ [name]: value });
      }

    sendForm(e){
        e.preventDefault();

        this.setState({questionsCompleted: true});
        const payload = this.state;
        const {history} = this.props;

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
            history.push('/games');
          })
          .catch(err => {
            console.log(err);
          });
    }

    componentDidMount() {
        this.getProfile();

        if(this.state.questionsCompleted){
            const {history} = this.props;
            history.push('/games');
        }
    }

    getProfile() {
        fetch(API_BASE_URL + 'users/me', {
          method:"GET",
          credentials : 'include',
          headers: {
            'Accept': 'application/json'
          }
        })
          .then((data) => {
            return data.json();
          })
          .then((res)=>{
            const user = res;
            this.setState({...user});
            console.log(this.state);
          })
          .catch(e => {
            console.log(e);
          });
      }

    render(){

        const values = [0, 1, 2, 3, 4, 5, 6, 7];
        return(
            <div>
                <Helmet>
                    <title>Intelligence Assessment Games | Questions</title>
                </Helmet>

                <Message
                icon='question circle outline' size='medium'
                header='Preguntas adicionales'
                content={this.state.questionsCompleted?'Ya has completado esta sección. ¡Muchas gracias por tu colaboración!':
                `Antes de empezar, nos gustaría que valoraras tu nivel de conocimiento de los juegos a los que jugarás en esta plataforma.
                 Para ello, para cada uno de los juegos siguientes, por favor, valora del 0 al 7 tu grado de familiaridad o destreza en el
                  mismo, siendo 0 = "No lo he jugado nunca" y 7 = "Lo he jugado extensivamente". Muchas gracias por tu ayuda.`}
                />

        <Grid celled centered columns={3}>
          <Grid.Column attached>
            <Image src='/img/edge.jpg' size="large" rounded centered/>
            <label>Valora tu nivel de experiencia con EDGE:</label>
            <Form.Group inline>
            {
                values.map(val => {
                    <Form.Field>
                        <Checkbox
                            radio
                            label={val}
                            name='knowsEdge'
                            value={val}
                            checked={this.state.knowsEdge === {val}}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                })
            }
            </Form.Group>

          </Grid.Column>
          <Grid.Column attached>
            <Image src='/img/blek.jpg' size="large" rounded centered/>
            <label>Valora tu nivel de experiencia con BLEK:</label>
            <Form.Group inline>
            {
                values.map(val => {
                    <Form.Field>
                        <Checkbox
                            radio
                            label={val}
                            name='knowsBlek'
                            value={val}
                            checked={this.state.knowsBlek === {val}}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                })
            }
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Image src='/img/unpossible.png' size="large" rounded centered/>
            <label>Valora tu nivel de experiencia con UNPOSSIBLE:</label>
            <Form.Group inline>
            {
                values.map(val => {
                    <Form.Field>
                        <Checkbox
                            radio
                            label={val}
                            name='knowsUnpossible'
                            value={val}
                            checked={this.state.knowsUnpossible === {val}}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                })
            }
            </Form.Group>
          </Grid.Column>
          <Button 
            attached='bottom' 
            onClick={this.sendForm} 
            color={this.state.questionsCompleted?'green':'blue'}>
                Enviar
            </Button>
        </Grid>
            </div>
                );
    }

}

export default Questions;