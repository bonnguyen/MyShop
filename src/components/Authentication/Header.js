import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet, Dimensions
} from 'react-native';

import icLogo from '../../../src/media/appIcon/ic_logo.png';
import icBack from '../../../src/media/appIcon/back_white.png';

const { height } = Dimensions.get('window');

export default class Header extends Component {
  goBackToMain = () => {
    this.props.navigation.navigate('AppStack');
  }

  render() {
    const { wrapper, row, iconStyle, titleStyle } = styles;
    return (
      <View style={wrapper}>
        <View style={row}>
          <TouchableOpacity onPress={this.goBackToMain}>
            <Image style={iconStyle} source={icBack} />
          </TouchableOpacity>
          <Text style={titleStyle} numberOfLines={1}>Wearing a Dress</Text>
          <Image style={iconStyle} source={icLogo} />  
        </View>
      </View>   
    );
  }
}

const heightTopHeader = (height / 9) - (height / 23);

const styles = StyleSheet.create({
  wrapper: {
    height: heightTopHeader,
    backgroundColor: '#34B089',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  titleStyle: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Avenir',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  },
  iconStyle: {
    width: 25,
    height: 25
  }
});
