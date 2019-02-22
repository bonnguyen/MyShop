import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import Bottom from './Bottom';
import register from '../../api/register';
import { isName, isEmail, isPassword } from './../Utils';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    };
  }

  onSignIn = () => {
    this.props.navigation.replace('SignIn');
  }

  onSuccess = () => {
    Alert.alert(
      'Notice',
      'Sign up successfully',
      [
        {
          text: 'OK',
          onPress: () => this.onSignIn()
        }
      ],
      {
        cancelable: false
      }
    );
  }

  onFail = () => {
    Alert.alert(
      'Notice',
      'Email has been used by other',
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

  registerUser = () => {
    const { name, email, password } = this.state;
    register(email, name, password)
    .then(res => {
      if (res === 'THANH_CONG') return this.onSuccess();
      this.onFail();
    });
  }

  resetPasswordFields = () => {
    this.setState({ password: '', rePassword: '' });
  }

  resetFields = () => {
    this.setState({ name: '', email: '', password: '', rePassword: '' });
  }

  handleSubmitForm = () => {
    const { name, email, password, rePassword } = this.state;
    if (password !== rePassword) {
      this.resetPasswordFields();
      return;
    }

    const isValidated = isName(name)
    && isEmail(email)
    && isPassword(password)
    && isPassword(rePassword);

    if (!isValidated) {
      this.resetFields();
    } else {
      this.registerUser();
    }
  }

  render() {
    const { wrapper, container, inputStyle, buttonStyle, containerViewStyle } = styles;
    return (
      <View style={wrapper}>
        <View style={container}>
          <TextInput
            style={inputStyle}
            placeholder='Enter your name'
            textContentType='none'
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType='next'
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
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
            returnKeyType='next'
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
          <TextInput
            style={inputStyle}
            placeholder='Re-enter your password'
            secureTextEntry
            textContentType='password'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType='done'
            value={this.state.rePassword}
            onChangeText={text => this.setState({ rePassword: text })}
          />
          <Button
            title='SIGN UP NOW'
            color='#FFF'
            fontSize={20}
            fontFamily='Avenir'
            containerViewStyle={containerViewStyle}
            buttonStyle={buttonStyle}
            onPress={this.handleSubmitForm}
          />
        </View>
        <Bottom onPressSignInButon={this.onSignIn} isSignIn={false} />
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
