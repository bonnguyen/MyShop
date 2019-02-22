import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet,
  Dimensions, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';

import { HOST_API } from '../../../../Constants';

const IMAGE_TYPE_PATH = HOST_API.concat('api/images/type/');
const { height, width } = Dimensions.get('window');

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  gotoListProduct = (category) => {
    const { navigation } = this.props;
    navigation.push('ListProduct', {
      name: category.name,
      id: category.id
    });
  }

  render() {
    const { wrapper, textStyle, imageStyle, paginationStyle, titleStyle, dotStyle } = styles;
    const { types } = this.props;

    const swiper = (
      <Swiper
      autoplay loop showsPagination index={0} width={imageWidth} height={imageHeight}
      paginationStyle={paginationStyle} activeDotColor='#34B089' dotStyle={dotStyle}
      activeDotStyle={dotStyle}
      >
        {
          types.map(type => (
            <TouchableOpacity
            key={type.id} style={{ width: imageWidth }} onPress={() => this.gotoListProduct(type)}
            >
              <ImageBackground style={imageStyle} source={{ uri: `${IMAGE_TYPE_PATH}${type.image}` }} >
                <Text style={titleStyle}>{type.name}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))
        }
      </Swiper>
    );

    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={textStyle}>LIST OF CATEGORY</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center' }}>
          { types.length ? swiper : <ActivityIndicator /> }
        </View>
      </View>
    );
  }
}

const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.3,
    backgroundColor: '#FFF',
		margin: 10,
    justifyContent: 'space-between',
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
    width: null,
		height: height * 0.23,
		paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
		resizeMode: 'stretch'
  },
  paginationStyle: {
    bottom: 20
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: 'Avenir',
		color: '#9A9A9A',
    alignItems: 'center',
    paddingTop: 20
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 5
  }
});
