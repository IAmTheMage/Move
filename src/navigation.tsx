import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createSwitchNavigator} from '@react-navigation/compat';
import Login from './components/Login1';
import Signup from './components/Signup/';
import Home from './components/Home/navigation';

const Switch = createSwitchNavigator({Login: Login, Signup: Signup, Home: Home}, {initialRouteName: 'Login'});

const Navigation = () => {
  return (
    <NavigationContainer>
      <Switch></Switch>
    </NavigationContainer>
  )
}

export default Navigation;