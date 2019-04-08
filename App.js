import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import DetailsScreen from './screens/Details';
import ProfileScreen from './screens/Profile';

class App extends React.Component {
  render() {
    return (
     <AppNavigator/>
    );
  }
}
const AppNavigator = createStackNavigator({
  
    HomeScreen: HomeScreen,
    LoginScreen:LoginScreen,
    Register:RegisterScreen,
    Details:DetailsScreen,
    ProfileScreen:ProfileScreen
  
  
  
  

});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default createAppContainer(AppNavigator);