import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import '~/config/DevToolsConfig';
import '~/config/ReactotronConfig';

import createNavigator from '~/routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  }

  async componentDidMount() {
    const userName = await AsyncStorage.getItem('@WebViewer:username');
    this.appLoaded(userName);
  }

  appLoaded(userName) {
    this.setState({
      userChecked: true,
      userLogged: !!userName,
    });
  }

  render() {
    if (!this.state.userChecked) return null;

    const Routes = createNavigator(this.state.userLogged, false);
    return <Routes />;
  }
}
