import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from './styles';

export default class Menu extends Component {
  static navigationOptions = {
    header: null,
  };

  verDados = async () => {
    try {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Welcome' }),
        ],
      });

      this.props.navigation.dispatch(resetAction);
    } catch (err) {
      console.log(err);
    }
  };

  render(){
   return (
      <View style = {styles.container}>
        <StatusBar barStyle="light-content" backgroundColor='#125A30' />
        <View style={styles.header}>
          <Text style={styles.headerText}>Menu</Text>
        </View>
        <TouchableOpacity onPress={ this.verDados }>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>DADOS DE ACESSO</Text>
          </View>
        </TouchableOpacity>
      </View>
   );
  }
}