import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import styles from './styles';

export default class HeaderRight extends Component {
  signOut = async () => {
    await AsyncStorage.clear();
  }

  render() {
    return (
      <TouchableOpacity onPress={this.signOut}>
        <Icon name="exchange" size={16} style={styles.icon}/>
      </TouchableOpacity>
    );
  }
}
