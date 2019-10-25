import React, { Component } from 'react';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Web from '~/pages/web';
import Menu from '~/pages/menu';

export default class Container extends Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    const menu = <Menu navigator={navigator} navigation ={this.props.navigation}/>;
    return (
      <SideMenu menu={menu}>
        <Web/>
      </SideMenu>
    );
  }
}