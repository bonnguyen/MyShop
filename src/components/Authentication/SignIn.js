import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import Bottom from './Bottom';
import signIn from '../../api/signIn';
import saveToken from '../../storage/saveToken';
import { isEmail, isPassword } from './../Utils';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'bontest@gmail.com',
      password: '123456'
    };
  }

  onSignUp = () => {
    this.props.navigation.replace('SignUp');
  }

  onSignIn = () => {
    const { email, password } = this.state;
    signIn(email, password)
    .then(resJSON => {
      saveToken(resJSON.token);
      this.gotoMain();
    })
    .catch(error => {
      console.log(error);
      this.onFail();
    });
  }

  onFail = () => {
    Alert.alert(
      'Notice',
      'Your login attempt was not successful. Please try again.',
      [
        {
          text: 'OK',
          onPress: () => this.resetFields()
        }
      ],
      {
        cancelable: false
      }
    );
  }

  resetFields = () => {
    this.setState({ email: '', password: '' });
  }

  gotoMain = () => {
    this.props.navigation.navigate('AppStack');
  }

  handleSubmitForm = () => {
    const { email, password } = this.state;
    const isValidated = isEmail(email) && isPassword(password);
    if (!isValidated) {
      this.resetFields();
    } else {
      this.onSignIn();
    }
  }

  render() {
    const { wrapper, container, inputStyle, buttonStyle, containerViewStyle } = styles;
    return (
      <View style={wrapper}>
        <View style={container}>
          <TextInput
            style={inputStyle}
            placeholder='Enter your email'
            textContentType='emailAddress'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType='next'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            style={inputStyle}
            placeholder='Enter your password'
            secureTextEntry
            textContentType='password'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType='done'
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
          <Button
            title='SIGN IN NOW'
            color='#FFF'
            fontSize={20}
            fontFamily='Avenir'
            containerViewStyle={containerViewStyle}
            buttonStyle={buttonStyle}
            onPress={this.handleSubmitForm}
          />
        </View>
        <Bottom onPressSignUpButon={this.onSignUp} isSignIn />
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#34B089',
    padding: 10,
  },
  container: {
    flex: 1
  },
  inputStyle: {
    height: 50,
    backgroundColor: '#FFF',  
    borderRadius: 10,
    fontSize: 20,
    fontFamily: 'Avenir',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  buttonStyle: {
    height: 50,
    backgroundColor: '#34B089',  
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  containerViewStyle: {
    marginLeft: 0,
    marginRight: 0
  }
});
