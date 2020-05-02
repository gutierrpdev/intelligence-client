import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import store from 'store';
import styles from './styles.css';
import { Route, Link, Redirect } from 'react-router-dom';
import Games from '../Games/index';
import Blek from '../Blek/Blek';
import Edge from '../Edge/Edge';
import Unpossible from '../Unpossible/Unpossible';

const isLoggedIn = () => !!store.get('loggedIn');

const handleLogout = history => () => {
  store.remove('loggedIn');
  history.push('/login');
};

class Iag extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    if (!isLoggedIn()) {
      return <Redirect to="/login" />;
    }
  
    const {history} = this.props;

    return (
      <div>
        <Helmet>
          <title>Intelligence Assessment Games</title>
        </Helmet>

        <Menu>
        <Link to="/games">
            <Menu.Item name="games">
              <Icon name="gamepad" />
              Juegos
            </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
        <Menu.Item name="logout" onClick={handleLogout(history)}>
            <Icon name="power" />
            Cerrar Sesión
            </Menu.Item>
        </Menu.Menu>
      </Menu>
  
        <div className={styles.mainBody}>
          <Route path="/games" component={Games} />
        </div>
        <div>
          <Route path="/blek" component={Blek} />
        </div>

        <div>
          <Route path="/edge" component={Edge} />
        </div>

        <div>
          <Route path="/unpossible" component={Unpossible} />
        </div>
      </div>
    );
  }
};

export default Iag;