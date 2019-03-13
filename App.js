import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import firebase from 'firebase';
import AuthScreenDriver from "./screens/AuthScreenDriver";
import AuthScreenRider from "./screens/AuthScreenRider";
import DriverHome from "./screens/DriverHome";
import RiderHome from "./screens/RiderHome";
import SignUpDriver from "./screens/SignUpDriver";
import SignUpRider from "./screens/SignUpRider";
import AuthScreen from "./screens/AuthScreen"
import { Provider } from "react-redux";
import {LinearGradient} from 'expo';
import store from './src/store';

import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

const AppStackRider= createStackNavigator({ RiderHome: RiderHome});

const AppStackDriver= createStackNavigator({ DriverHome: DriverHome});

const AuthStack = createStackNavigator({
  AuthScreen:AuthScreen, 
  AuthScreenDriver:AuthScreenDriver,
  AuthScreenRider:AuthScreenRider,
  SignUpDriver : SignUpDriver,
  SignUpRider : SignUpRider
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    AppRider: AppStackRider,
    AppDriver: AppStackDriver,
  },
  {
    initialRouteName: 'Auth',
    headerBackground: (
      <LinearGradient
        colors={['#5ED2A0', '#339CB1']}
        style={{ flex: 1 }}
        start={[0, 0]}
        end={[1, 0]}
      />
    ),
  },

));
export default class App extends Component {
componentWillMount(){
  firebase.initializeApp(
    {
     //Your firebase app config
  
      }
      
);
}
  render() {
    return (
      <Provider store = {store}>
        <AppContainer/>
      </Provider>
    
    );
  }
}
