import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class Bottom extends Component {
  render() {
    const { wrapper, buttonSignInStyle, buttonSignUpStyle, containerButtonBottomStyle } = styles;
    const { isSignIn } = this.props;
    return (
      <View style={wrapper}>
        <Button
          title='SIGN IN'
          color={isSignIn ? '#34B089' : '#9A9A9A'}
          fontSize={20}
          fontFamily='Avenir'
          containerViewStyle={containerButtonBottomStyle}
          buttonStyle={buttonSignInStyle}
          onPress={this.props.onPressSignInButon}
        />
        <Button
          title='SIGN UP'
          color={isSignIn ? '#9A9A9A' : '#34B089'}
          fontSize={20}
          fontFamily='Avenir'
          containerViewStyle={containerButtonBottomStyle}
          buttonStyle={buttonSignUpStyle}
          onPress={this.props.onPressSignUpButon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonSignInStyle: {
    height: 50,
    backgroundColor: '#FFF',  
    borderWidth: 1,
    borderColor: '#34B089',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  buttonSignUpStyle: {
    height: 50,
    backgroundColor: '#FFF',  
    borderWidth: 1,
    borderColor: '#34B089',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  containerButtonBottomStyle: {
    marginLeft: 0,
    marginRight: 0,
    width: '50%'
  }
});
