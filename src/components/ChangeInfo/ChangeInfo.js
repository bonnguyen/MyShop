import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import global from './../global';
import changeInfo from '../../api/changeInfo';
import getToken from '../../storage/getToken';
import { isName, isPhoneNumber } from './../Utils';

import icBack from '../../media/appIcon/backs.png';

export default class ChangeInfo extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const user = this.props.navigation.getParam('user', null);
    this.state = {
      txtName: user.name,
      txtEmail: user.email,
      txtAddress: user.address,
      txtPhone: user.phone
    };
  }

  onSuccess = () => {
    Alert.alert(
      'Notice',
      'User information has been successfully updated',
      [
        {
          text: 'OK',
          onPress: () => this.goBackToMain()
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
      'User information has not been updated',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed')
        }
      ],
      {
        cancelable: false
      }
    );
  }

  updateInfo = () => {
    const { txtName, txtAddress, txtPhone } = this.state;

    getToken()
    .then(token => changeInfo(token, txtName, txtPhone, txtAddress))
    .then(user => {
      global.onSignIn(user);
      this.onSuccess();
    })
    .catch(error => { 
      console.log(error);
      this.onFail();
    });
  }

  handleSubmitForm = () => {
    const { txtName, txtAddress, txtPhone } = this.state;

    const isValidated = isName(txtName) && isName(txtAddress) && isPhoneNumber(txtPhone);
    if (isValidated) {
      this.updateInfo();
    }
  }

  goBackToMain = () => {
    this.props.navigation.pop();
  }

  render() {
    const {
      wrapper, header, headerTitle, backIconStyle, container, inputStyle, inputStyleNotEdit,
      buttonStyle, containerViewStyle
    } = styles;
    const { txtName, txtEmail, txtAddress, txtPhone } = this.state;
    return (
      <View style={wrapper}>
        <View style={header}>
          <View style={{ width: 30 }} />
          <Text style={headerTitle}>User Infomation</Text>
          <TouchableOpacity onPress={this.goBackToMain}>
            <Image source={icBack} style={backIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={container}>
          <TextInput
            style={inputStyle}
            placeholder='Enter your name'
            value={txtName}
            textContentType='name'
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType='next'
            onChangeText={text => this.setState({ ...this.state, txtName: text })}
          />
          <TextInput
            style={inputStyleNotEdit}
            placeholder='Enter your email'
            value={txtEmail}
            textContentType='emailAddress'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType='next'
            editable={false}
            onChangeText={text => this.setState({ ...this.state, txtEmail: text })}
          />
          <TextInput
            style={inputStyle}
            placeholder='Enter your address'
            value={txtAddress}
            textContentType='addressCityAndState'
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType='next'
            onChangeText={text => this.setState({ ...this.state, txtAddress: text })}
          />
          <TextInput
            style={inputStyle}
            placeholder='Enter your phone number'
            value={txtPhone}
            textContentType='telephoneNumber'
            keyboardType='phone-pad'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType='done'
            onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
          />
          <Button
            title='CHANGE YOUR INFOMATION'
            color='#FFF'
            fontSize={20}
            fontFamily='Avenir'
            containerViewStyle={containerViewStyle}
            buttonStyle={buttonStyle}
            onPress={this.handleSubmitForm}
          />
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DBDBD8'
  },
  header: { 
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: '#34B089', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10 
  },
  headerTitle: { 
    fontFamily: 'Avenir', 
    color: '#FFF', 
    fontSize: 20 
  },
  backIconStyle: { 
    width: 30, 
    height: 30 
  },
  container: {
    flex: 10,
    backgroundColor: '#DBDBD8', 
    padding: 10
  },
  inputStyle: {
    height: 50,
    backgroundColor: '#FFF',  
    borderRadius: 10,
    fontSize: 20,
    fontFamily: 'Avenir',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#34B089',  
    borderWidth: 1
  },
  inputStyleNotEdit: {
    height: 50,
    backgroundColor: '#EEE',  
    borderRadius: 10,
    fontSize: 20,
    fontFamily: 'Avenir',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#34B089',  
    borderWidth: 1
  },
  buttonStyle: {
    height: 50,
    backgroundColor: '#34B089',
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
