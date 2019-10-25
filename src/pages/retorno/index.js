import React, { Component } from 'react';
import Validacao from '~/services/validacao';
import createNavigator from '~/routes';
import { NavigationActions } from 'react-navigation';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  AsyncStorage, 
  ActivityIndicator, 
  StatusBar
} from 'react-native';

import styles from './styles';
export default class Retorno extends Component {
  static navigationOptions = {
    header: null,
  };  

  state = {
    userName: '',
    userChecked: false,
    userEmpty: false,
    serverOn: false,
    acesso: false,
    serverMessage: '',
    errorMessage: '',
    voltar: false,
  }

  async componentDidMount() {
    const userName = await AsyncStorage.getItem('@WebViewer:username');
    
    if (!!userName) {
      this.setState({userName});
      this.validaDados(userName);  
    } else this.setState({ userChecked: true, userEmpty: true });
   // this.appLoaded(userName);
  }

  backToHome = () => {
    this.setState({ voltar: true });
  };

  refresh = () => {
    this.setState({userChecked: false});
    this.validaDados(this.state.userName);
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

  async validaDados(userName) {
    const passWord = await AsyncStorage.getItem('@WebViewer:passWord');
    const url = await AsyncStorage.getItem('@WebViewer:url'); 
    const id = await AsyncStorage.getItem('@WebViewer:id');  
    const numOrig = Math.floor(Math.random() * (1000 - 100) + 100);
    const numChave = this.geraChave(numOrig);

    const dados = {
      //userName: userName,
      //passWord: passWord,
      pDispositivo: id,
      pIdentificador: numOrig,
      pChave: numChave,
    };

    // const resposta = await Validacao(url, dados);
    
    // if (resposta.serverOn) {
    //   this.setState({
    //     serverOn: true,
    //     acesso: resposta.dados.status,
    //     serverMessage: resposta.dados.msg,
    //   });
    // } else {
    //   this.setState({
    //     serverOn: false,
    //     errorMessage: resposta.erro,
    //   });
    // }

    /**
     * CHUNCHOOO (ABAIXO) PQ NÃO É MAIS PRA FAZER A VALIDAÇÃO DO LADO DO SERVIDOR (ACIMA)
     */
    this.setState({
      serverOn: true,
      acesso: true,
      serverMessage: 'ok',
    });
    /***************/

    this.setState({ userChecked: true });
  }

  geraChave(num) {
    let n1 = (num % 255);
    let n2 = n1 + (num % 125);
    let n3 = n2 + (num % 77);
    let n4 = n3 + (num % 35);
    let n5 = n4 * (num % 17);
    return (n1+n2+n3+n4+n5);
  }

  appLoaded(userName) {
    this.setState({
      userChecked: true,
    });
  }

  render() {
    if (!this.state.userChecked) {
      return (
          <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor='#005340' />
            <Text style={styles.text}>Aguarde... Verificando dados! </Text>           
            <ActivityIndicator size="small" color="#FFFF" />
        </View>
      );
    }

    if (!this.state.userEmpty) {
      if (this.state.serverOn) {
        if (!this.state.acesso) {
          return (
            <View style={styles.container}>
              <StatusBar barStyle="light-content" backgroundColor="#005340" />
              <Text style={styles.title}>Algo de errado aconteceu!</Text>          
              <Text style={styles.error}> {this.state.serverMessage} </Text>
              <TouchableOpacity style={styles.button} onPress={this.refresh}>
                <Text style={styles.buttonText}>Tentar Novamente</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.verDados}>
                <Text style={styles.buttonText}>Verificar Dados</Text>
              </TouchableOpacity>
            </View>
          );
        }
      } else { 
        return (
          <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#005340" />
            <Text style={styles.title}>Algo de errado aconteceu!</Text>          
            <Text style={styles.error}> {this.state.errorMessage} </Text>
            <TouchableOpacity style={styles.button} onPress={this.refresh}>
              <Text style={styles.buttonText}>Tentar Novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.verDados}>
              <Text style={styles.buttonText}>Verificar Dados</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }  

    const Routes = createNavigator(!this.state.userEmpty, true);
    return <Routes />;    
  }
}
