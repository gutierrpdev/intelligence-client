import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Image, Button, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {API_BASE_URL} from '../../constants/apiConstants';
import './styles.css';

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blekPlayed: false,
      edgePlayed: false,
      unpossiblePlayed: false,
      userId: '',
      userAge: 0,
      userGender: '',
      questionsCompleted: false
    };
  }

  componentDidMount() {
    this.getProfile();

    if(this.state.questionsCompleted){
      const {history} = this.props;
      history.push('/questions');
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

        this.setState({
            blekPlayed: user.blekCompleted,
            edgePlayed: user.edgeCompleted,
            unpossiblePlayed: user.unpossibleCompleted,
            userId: user.userId,
            userAge: user.age,
            userGender: user.gender,
            questionsCompleted: user.questionsCompleted
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    const information =[
      'Pulsa sobre "Empezar Juego!" bajo cada imagen para lanzarlo en tu navegador.',
      'Una vez abierto un juego, este debe ser completado "del tirón", evitando salir del mismo durante la partida. Cada actividad no debería llevar más de 15 minutos en ser completada.',
      'Al principio de cada juego aparecerá una sección de tutorial para familiarizarte con las mecánicas del mismo. Una vez terminado el tutorial, podrás continuar con el juego en sí y tendrás un tiempo límite para completar todos los niveles que puedas. Se registrarán datos relativos a tu interacción con el juego.',
      'Es necesario completar las tres pruebas para que los resultados sean válidos.',
      'No olvides hacer click en la sección de Preguntas del menú cuando acabes con los juegos. ¡Muchas gracias por tu colaboración!'
    ];
    return (
        <div>
            <Helmet>
                <title>Intelligence Assessment Games | Profile</title>
            </Helmet>

            <Message
              icon='gamepad' size='big'
              header='Portal de juegos para la medida de la inteligencia'
              content='Bienvenidos. En esta página encontraréis una serie de juegos desarrollados por alumnos de la facultad de informática de la
              UCM como parte de un TFG sobre el estudio de la inteligencia por medio de videojuegos.'
            />

            <Message>
              <Message.Header>Instrucciones e Indicaciones</Message.Header>
              <Message.List items={information}/>
            </Message>

        <Grid celled centered columns={3}>
          <Grid.Column attached>
            <Image src='/img/edge.jpg' size="large" rounded centered/>
            <Button as={Link} to="/edge" 
              attached='bottom'
              color={this.state.edgePlayed?'green':'blue'}
              disabled={this.state.edgePlayed}
            >
              {this.state.edgePlayed?"Completado":"Empezar juego!"}
            </Button>
          </Grid.Column>
          <Grid.Column attached>
            <Image src='/img/blek.jpg' size="large" rounded centered/>
            <Button as={Link} to="/blek"
              attached='bottom'
              color={this.state.blekPlayed?'green':'blue'}
              disabled={this.state.blekPlayed}
            >
              {this.state.blekPlayed?"Completado":"Empezar juego!"}
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Image src='/img/unpossible.png' size="large" rounded centered/>
            <Button as={Link} to="/unpossible" 
              attached='bottom'
              color={this.state.unpossiblePlayed?'green':'blue'}
              disabled={this.state.unpossiblePlayed}
            >
              {this.state.unpossiblePlayed?"Completado":"Empezar juego!"}
            </Button>
          </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default Games;