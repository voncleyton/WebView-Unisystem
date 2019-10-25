// packages
import {Alert, BackHandler} from 'react-native';
const exitAlert = () => {
    Alert.alert(
        'Confirmação',
        'Deseja sair do App?',
        [
          {text: 'Não', onPress: () => {}, style: 'cancel'},
          {text: 'Sim', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false }
    )
};
export {exitAlert};


