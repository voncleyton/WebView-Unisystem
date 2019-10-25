import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 350,
      backgroundColor: '#EEEEEE',
      borderRightColor: '#FFF',
      borderRightWidth: 1,
    },
    header: {
      height: 52,
      backgroundColor: '#125A30',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#FFF',
      fontFamily: 'Arial',
    },
    menuItem: {
      height: 40,
      padding: 20,
      backgroundColor: '#125A30',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 5,
      marginVertical: 2.5,
    },
    menuItemText: {
      fontWeight: 'bold',
      fontSize: 15,
      fontFamily: 'Arial', 
      color: '#FFF', 
    }
  });

export default styles;
