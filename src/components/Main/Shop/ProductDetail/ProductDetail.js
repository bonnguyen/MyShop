import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions
} from 'react-native';

import global from '../../../global';
import { HOST_API } from '../../../../Constants';

const IMAGE_PRODUCT_PATH = HOST_API.concat('api/images/product/');
const icBack = require('../../../../media/appIcon/back.png');
const icCart = require('../../../../media/appIcon/cartfull.png');


export default class ProductDetail extends Component {
  gotoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  addThisProductToCart = (product) => {
    global.addProductToCart(product);
  }

  render() {
    const {
      wrapper, cardStyle, header, backStyle, cartStyle, textBlack,
      textSmoke, textHighlight, textMain, titleContainer, descContainer, productImageStyle,
      descStyle, txtMaterial, txtColor } = styles;
    const { navigation } = this.props;
    const product = navigation.getParam('product', null);
    return (
      <View style={wrapper}>
        <View style={cardStyle}>
          <View style={header}>
            <TouchableOpacity onPress={this.gotoBack}>
              <Image style={backStyle} source={icBack} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.addThisProductToCart(product)}>
              <Image style={cartStyle} source={icCart} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 6 }}>
            <ScrollView style={{ flex: 1, height: swiperHeight }} horizontal showsHorizontalScrollIndicator={false}>
            {
              product.images.map((image, id) => {
                return (<Image source={{ uri: `${IMAGE_PRODUCT_PATH}${image}` }} style={productImageStyle} key={id} />)
              })
            }
            </ScrollView>
          </View>
          <View style={titleContainer}>
            <Text style={textMain}>
              <Text style={textBlack}>{product.name.toUpperCase()}</Text>
              <Text style={textHighlight}> / </Text>
              <Text style={textSmoke}>{product.price}$</Text>
            </Text>
          </View>
          <View style={descContainer}>
            <ScrollView style={{ flexDirection: 'column', height: 100 }} showsVerticalScrollIndicator={false} >
              <Text style={descStyle}>{product.description}</Text>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={txtMaterial}>Material {product.material}</Text>
              <View style={{ flexDirection: 'row' }} >
                <Text style={txtColor}>Color {product.color}</Text>
                <View style={{ height: 15, width: 15, backgroundColor: product.color.toLowerCase(), borderRadius: 15, marginLeft: 10, borderWidth: 1, borderColor: '#C21C70' }} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const swiperWidth = (width / 1.8) - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DBDBD8'
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20
  },
  cartStyle: {
    width: 25,
    height: 25
  },
  backStyle: {
    width: 25,
    height: 25
  },
  productStyle: {
    width: width / 2,
    height: width / 2
  },
  textMain: {
    paddingLeft: 20,
    marginVertical: 10
  },
  textBlack: {
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3F46'
  },
  textSmoke: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#9A9A9A'
  },
  textHighlight: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#7D59C8'
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
    marginHorizontal: 20,
    paddingBottom: 5,
    alignItems: 'center'
  },
  descContainer: {
    margin: 10,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  descStyle: {
    color: '#AFAFAF'
  },
  linkStyle: {
    color: '#7D59C8'
  },
  productImageStyle: {
    width: swiperWidth,
    height: swiperHeight + 20,
    marginHorizontal: 5
  },
  mainRight: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingLeft: 20
  },
  txtColor: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir'
  },
  txtMaterial: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir'
  }
});
