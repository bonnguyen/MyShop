import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import bannerImage from '../../../../media/temp/banner.jpg';

const { height } = Dimensions.get('window');

export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  gotoListProduct = () => {
    const { navigation } = this.props;
    navigation.push('ListProduct', {
      name: 'SPRING COLLECTION',
      id: 'COLLECTION'
    });
  }

  render() {
    const { wrapper, textStyle, imageStyle } = styles;
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={textStyle}>SPRINT COLLECTION</Text>
        </View>
        <TouchableOpacity style={{ flex: 4 }} onPress={this.gotoListProduct}>
          <Image style={imageStyle} source={bannerImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.3,
    backgroundColor: '#FFF',
    margin: 10,
    shadowColor: '#2E272B',
    shadowOffset: { 
      width: 0, 
      height: 3 
    },
    shadowOpacity: 0.2,
    padding: 10,
    paddingTop: 0
  },
  textStyle: {
    fontSize: 20,
    color: '#AFAEAF'
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: height * 0.23,
    paddingTop: 10,
    resizeMode: 'stretch'
  }
});
