import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '~/components/AndroidBackbottonHandler';
import { exitAlert } from '~/components/ExitAlert';
import Spinner from 'react-native-loading-spinner-overlay';
import { WebView } from 'react-native-webview';

import { 
  View,
  AsyncStorage, 
} from 'react-native';

import styles from './styles';

export default class Web extends Component {
  state = {
    userName: '',
    passWord: '',
    id: '',
    url: '',
    loading: true,
  }
  
  async componentDidMount() {
    const userName = await AsyncStorage.getItem('@WebViewer:username');
    const passWord = await AsyncStorage.getItem('@WebViewer:passWord');
    const url = await AsyncStorage.getItem('@WebViewer:url');
    const id = await AsyncStorage.getItem('@WebViewer:id');

    this.setState({
      userName,
      passWord,
      id,
      url,
    });

    handleAndroidBackButton(exitAlert);  
  }

  componentWillUnMount() {
    removeAndroidBackButtonHandler();
  }
  
  showSpinner() {
    this.setState({ loading: true });
  }

  hideSpinner() {
    this.setState({ loading: false });
  }

  render() {
    return ( 
      <View style = {styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={'Carregando...'}
          textStyle={{ color: '#417C9C' }}
        />
        <WebView
          source={{
            uri: `${this.state.url}`,
            method: 'post',
            body: `user=${this.state.userName}&password=${this.state.passWord}&id=${this.state.id}`,
          }} 
          onLoadStart={() => (this.showSpinner())}
          onLoad={() => (this.hideSpinner())}
        />
      </View>
    );
  }
}

