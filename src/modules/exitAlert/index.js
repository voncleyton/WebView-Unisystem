// packages
import {Alert} from 'react-native';
const exitAlert = () => {
  Alert.alert(
    'Confirmação',
    'Deseja sair do App?',
    [
      {text: 'Sim', onPress: () => BackHandler.exitApp()},
      {text: 'Não', style: 'cancel'},
    ],
  )
};
export {exitAlert};