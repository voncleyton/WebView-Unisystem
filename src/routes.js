import React from  'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Welcome from '~/pages/welcome';
import Retorno from '~/pages/retorno';
import Container from '~/pages/container';

const createNavigator = (AnyData = false, isValidate = false) => {
  let caminho = '';
  if (!AnyData) {
    caminho = 'Welcome';
  } else if (isValidate) {
    caminho = 'Container';
  } else { 
    caminho = 'Retorno';
  }

  return StackNavigator({
    Welcome: { screen: Welcome },
    Container: { screen: Container },
    Retorno: { screen: Retorno },
  }, {
    initialRouteName: caminho,
  });
};
export default createNavigator;
