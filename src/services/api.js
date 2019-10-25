import { AsyncStorage } from 'react-native';
import axios from 'axios';

const url = async () => AsyncStorage.getItem('@WebViewer:url');

const api = axios.create({
  baseURL: url,
});

export default api;
