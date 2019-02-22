import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Header from './Authentication/Header';

const AuthStack = createStackNavigator({
  SignIn,
  SignUp
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions: {
    header: props => <Header {...props} />,
    headerStyle: {
      backgroundColor: 'transparent'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#FFF',
    },
    headerTintColor: '#FFF',
    animationEnabled: true
  }
});

export default AuthStack;
