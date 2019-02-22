import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation';

import global from './../global';
import checkLogin from '../../api/checkLogin';
import getToken from '../../storage/getToken';
import saveToken from '../../storage/saveToken';

import icProfile from '../../media/temp/profile.png';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    global.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    this.checkToken();
  }

  onFail = () => {
    this.setState({ user: null });
    saveToken('');
  }

  onSignIn(user) {
    this.setState({ user });
  }

  checkToken = async () => {
    try {
      const token = await getToken();
      if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
        return;
      }
      const resJSON = await checkLogin(token);
      global.onSignIn(resJSON.user);
    } catch (error) {
      console.log(error);
      this.onFail();
    }
  }

  gotoSignIn = () => {
    this.props.navigation.navigate('AuthStack');
  }

  gotoSignOut = () => {
    this.setState({ user: null });
    saveToken('');
    this.props.navigation.navigate('AuthStack');
  }

  gotoChangeInfo = () => {
    this.props.navigation.push('ChangeInfo', {
      user: this.state.user
    });
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  gotoOrderHistory = () => {
    this.props.navigation.push('OrderHistory');
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  render() {
    const {
      wrapper, profileAvatar, profileName, container, buttonStyle, buttonSignInStyle, containerViewStyle
    } = styles;
    const { user } = this.state;
    const loginJSX = (
      <View style={container}>
        <Button
          title='SIGN IN'
          color='#34B089'
          fontSize={20}
          fontFamily='Avenir'
          containerViewStyle={containerViewStyle}
          buttonStyle={buttonSignInStyle}
          onPress={this.gotoSignIn}
        />
      </View>
    );
    const logoutJSX = (
      <View style={container}>
        <Text style={profileName}>{user ? user.name : ''}</Text>  
        <View style={{ flex: 1 }}>
          <Button
            title='ORDER HISTORY'
            color='#34B089'
            fontSize={20}
            fontFamily='Avenir'
            containerViewStyle={containerViewStyle}
            buttonStyle={buttonStyle}
            onPress={this.gotoOrderHistory} 
          />
          <Button
            title='CHANGE INFO'
            color='#34B089'
            fontSize={20}
            fontFamily='Avenir'
            containerViewStyle={containerViewStyle}
            buttonStyle={buttonStyle}
            onPress={this.gotoChangeInfo} 
          />
          <Button
            title='SIGN OUT'
            color='#34B089'
            fontSize={20}
            fontFamily='Avenir'
            containerViewStyle={containerViewStyle}
            buttonStyle={buttonStyle}
            onPress={this.gotoSignOut} 
          />
        </View>
      </View>
    );
    const mainJSX = this.state.user ? logoutJSX : loginJSX;
    return (
      <View style={wrapper}>
        <Image style={profileAvatar} source={icProfile} />
        { mainJSX }
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#34B089',
    borderRightWidth: 1,
    borderColor: '#DBDBD8',
    alignItems: 'center'
  },
  profileAvatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    margin: 20
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: '#FFF',
    alignSelf: 'center',
    marginBottom: 20
  },
  container: {
    flex: 1, 
    alignSelf: 'stretch',
    marginBottom: 20
  },
  buttonSignInStyle: {
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  buttonStyle: {
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  containerViewStyle: {
    marginLeft: 10,
    marginRight: 10
  }
});
