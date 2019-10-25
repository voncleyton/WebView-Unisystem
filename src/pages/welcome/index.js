import React, { Component } from 'react';
import { Clipboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';

import styles from './styles';

export default class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    userName: '',
    loading: false,
    telaInicial: true,
    passWord: '',
    id: '',
    url: ''
  }

  async componentDidMount() {

    const userName = await AsyncStorage.getItem('@WebViewer:username');
    const passWord = await AsyncStorage.getItem('@WebViewer:passWord');
    const url = await AsyncStorage.getItem('@WebViewer:url'); 
    const id = DeviceInfo.getUniqueID();
    const telaInicial = !userName;

    this.setState({ userName, passWord, id, url, telaInicial });
  }

  geraChave = (num = 0) => {
    const chave = num * 2;
    return chave;
  };

  checkUserExists = async (userName) => {
    const user = await api.get(`/users/${userName}`);

    return user;
  };

  saveUser = async (userName, passWord, id, url) => {
    await AsyncStorage.setItem('@WebViewer:username', userName);
    await AsyncStorage.setItem('@WebViewer:passWord', passWord);
    await AsyncStorage.setItem('@WebViewer:url', url);
    await AsyncStorage.setItem('@WebViewer:id', id);
  };

  copyToClipboard = async () => {
    //const id = await AsyncStorage.getItem('@WebViewer:id');
    const { id } = this.state;
    await Clipboard.setString(id);

    Toast.show('Id Copiado!');
  };

  signIn = async () => {
    const { userName, passWord, id, url } = this.state;
  
    if (userName.length === 0 || passWord.length === 0 || url.length === 0) return;

    this.setState({ loading: true });

    try {
      await this.saveUser(userName, passWord, id, url);

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Retorno' }),
        ],
      });

      this.props.navigation.dispatch(resetAction);
    } catch (err) {
      this.setState({ loading: false, errorMessage: 'Algo deu Errado!' });
    }
  };
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor='#005340' />
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('~/assets/logo.png')} />
          </View>
          
          { !!this.state.telaInicial
            && <Text style={styles.title}>Bem-vindo</Text>
          }
          
          { !!this.state.telaInicial
            && <Text style={styles.title}>Bem-vindo</Text>
            && <Text style={styles.text}> Para continuar, precisamos que informe os seus dados de acesso! </Text>
          }

          {
            !this.state.telaInicial
            && <Text style={styles.title}>Dados de Acesso</Text>  
          }

          { !!this.state.errorMessage
            && <Text style={styles.error}>{this.state.errorMessage}</Text>
          }

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              //autoCapitalize="none"
              autoCapitalize="characters"
              autoCorrect={false}
              placeholder="Digite seu Usuário"
              underlineColorAndroid="rgba(0, 0, 0, 0)"
              value={this.state.userName}
              onChangeText={userName => this.setState({ userName })}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Digite sua Senha"
              underlineColorAndroid="rgba(0, 0, 0, 0)"
              value={this.state.passWord}
              onChangeText={passWord => this.setState({ passWord })}
            />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite sua Url Padrão"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                value={this.state.url}
                onChangeText={url => this.setState({ url })}
              />
            
            <View style={styles.idField}>
              <TextInput
                editable={false}
                //style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                value={this.state.id}
              />
              <TouchableOpacity onPress={this.copyToClipboard}>
                <Icon name="copy" size={20}/>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.signIn}>
              { this.state.loading
                ? <ActivityIndicator size="small" color="#FFFF" />
                : <Text style={styles.buttonText}>Prosseguir</Text>
              }
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Text style={styles.versao}>Versão 1.2019.07.001</Text> 
      </View>
    );
  }
}
