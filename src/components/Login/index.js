import React from 'react';
import { Button, Divider, Form, Grid, Segment, Header, Icon, Dropdown, Message } from 'semantic-ui-react'
import { Helmet } from 'react-helmet';
import store from 'store';
import { Redirect } from 'react-router-dom';
import {API_BASE_URL} from '../../constants/apiConstants';
import './styles.css';

const isLoggedIn = () => !!store.get('loggedIn');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username_login: '',
      password_login: '',
      username_reg: '',
      password_reg: '',
      confirm_pass: '',
      age_reg: '',
      gender_reg: '',
      error_login: false,
      error_reg: false,
      error_reg_mes: '',
      login_loading: false,
      reg_loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
  }

  onSubmitLogin(e) {
    e.preventDefault();
    this.setState({login_loading : true});
    
    const payload={
        "userId":this.state.username_login,
        "password":this.state.password_login,
    }
    const { history } = this.props;
    this.setState({ error_login: false });
    let thisRef = this;

    fetch(API_BASE_URL+'users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(function (response) {
            if(response.status === 200){
                store.set('loggedIn', true);
                thisRef.setState({login_loading : false});
                history.push('/games');
            }
            else {
              return thisRef.setState({ error_login: true, login_loading: false });
            }
        })
        .catch(function (error) {
            console.log(error);
            thisRef.setState({ error_login: true });
            thisRef.setState({login_loading : false});
        });
  }

  onSubmitRegister(e) {
    e.preventDefault();
    
    if(this.state.password_reg !== this.state.confirm_pass){
      return this.setState({
        error_reg: true,
        error_reg_mes: 'Passwords do not match!'
      });
    }

    let age = parseInt(this.state.age_reg, 10);
    if( age < 14 || age > 120){
      return this.setState({
        error_reg: true,
        error_reg_mes: 'Age must be a valid number!'
      });
    }
    this.setState({reg_loading : true});

    const payload={
        "userId":this.state.username_reg,
        "password":this.state.password_reg,
        "age":this.state.age_reg,
        "gender":this.state.gender_reg
    }
    const { history } = this.props;
    this.setState({ error_reg: false });
    let thisRef = this;

    fetch(API_BASE_URL+'users', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
        .then(function (response) {
            if(response.status === 201){
                store.set('loggedIn', true);
                history.push('/questions');
            }
            else {
              return thisRef.setState({ 
                error_reg: true,
                error_reg_mes: "Username already in use or incomplete field.",
                reg_loading: false
              });
            }
        })
        .catch(function (error) {
          return thisRef.setState({ 
            error_reg: true,
            error_reg_mes: "Username already in use or incomplete field.",
            reg_loading: false
          });
        });
  }

  handleChange(e, {name, value}) {
    this.setState({ [name]: value });
  }

  render() {
    if (isLoggedIn()) {
      return <Redirect to="/games" />;
    }

    const { error_login, error_reg } = this.state;

    return (

      <div className="login">
        <Helmet>
            <title>Intelligence Assessment Games | Login</title>
          </Helmet>

          <Header as='h2' icon textAlign='center'>
            <Icon name='chess' circular />
            <Header.Content>Juegos para la medida de la inteligencia</Header.Content>
          </Header>

          <Message
              icon='exclamation circle' size='medium'
              header='Compatibilidad de los juegos'
              content='Esta plataforma está diseñada para ser usada desde un navegador web de PC (sólo Chrome, Edge o Firefox). ¡Los juegos no funcionarán si tratas de acceder desde un dispositivo móvil!'
            />
          <Segment placeholder className="login-body">
          <Grid columns={2} relaxed='very' stackable verticalAlign='middle' className="padded-login">        
          <Grid.Column >
            {(error_login) &&
              <Message negative>
                <p>Invalid username/ password entered. Please try again!</p>
              </Message>
            }
            <Form loading={this.state.login_loading}>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Nombre de usuario'
                placeholder='Nombre de Usuario...'
                name='username_login'
                onChange={this.handleChange}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Contraseña'
                type='password'
                placeholder='Contraseña...'
                name='password_login'
                onChange={this.handleChange}
              />

              <Button content='Iniciar Sesión' primary onClick={this.onSubmitLogin}/>
            </Form>
          </Grid.Column>

          <Grid.Column>

          {(error_reg) &&
              <Message negative>
                <p>{this.state.error_reg_mes}</p>
              </Message>
            }
            <Form loading={this.state.reg_loading}>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Nombre de Usuario'
                placeholder='Nombre de usuario...'
                name = 'username_reg'
                onChange={this.handleChange}
                required
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Contraseña'
                placeholder='Contraseña...'
                type='password'
                name='password_reg'
                onChange={this.handleChange}
                required
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Confirmar Contraseña'
                placeholder='Confirmar contraseña...'
                type='password'
                name='confirm_pass'
                onChange={this.handleChange}
                required
              />

              <Form.Input
                icon='address book'
                iconPosition='left'
                label='Edad'
                placeholder='Edad...'
                name='age_reg'
                onChange={this.handleChange}
                required
              />

              <Form.Input 
                label='Género'
                placeholder='Género...'
                required
                >
                <Dropdown 
                  icon='venus mars'
                  labeled
                  button
                  onChange={this.handleChange}
                  name='gender_reg'
                  className='icon'
                  selection
                  options={[
                    {key: 1, text: "Hombre", value: "Male"},
                    {key: 2, text: "Mujer", value: "Female"}
                    ]}
                />
              </Form.Input>

              <Button content='Registrarse!' primary onClick={this.onSubmitRegister}/>
            </Form>
          </Grid.Column>
        </Grid>

        <Divider vertical>Ó</Divider>
        </Segment>
      </div>
    );
  }
}

export default Login;