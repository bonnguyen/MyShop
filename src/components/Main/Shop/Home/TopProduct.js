import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator
} from 'react-native';

import { HOST_API } from '../../../../Constants';
import { toTitleCase } from '../../../Utils';

const IMAGE_PRODUCT_PATH = HOST_API.concat('api/images/product/');
const { height, width } = Dimensions.get('window');

class ProductItem extends Component {
  render() {
    const { productContainer, productImage, productName, productPrice } = styles;
    const { product, gotoProductDetail } = this.props;

    return (
      <TouchableOpacity style={productContainer} onPress={() => gotoProductDetail(product)}>
        <Image style={productImage} source={{ uri: `${IMAGE_PRODUCT_PATH}${product.images[0]}` }} />
        <Text style={productName}>{toTitleCase(product.name)}</Text>
        <Text style={productPrice}>{product.price}$</Text>
      </TouchableOpacity>
    );
  }
}

export default class TopProduct extends Component {
  gotoProductDetail = (item) => {
    const { navigation } = this.props;
    navigation.push('ProductDetail', {
      product: item
    });
  }

  render() {
    const { wrapper, textStyle } = styles;
    const { topProducts } = this.props;

    const flatList = (
      <FlatList
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={topProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProductItem product={item} gotoProductDetail={this.gotoProductDetail} />}
      />
    );

    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
          <Text style={textStyle}>TOP PRODUCT</Text>
        </View>
        { topProducts.length ? flatList : <ActivityIndicator /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom: 10
  },
  productContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  productImage: {
    height: height * 0.23,
    width: null,
    resizeMode: 'stretch'
  },
  productName: {
    marginVertical: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: '#AFAEAF',
    fontWeight: '500'
  },
  productPrice: {
    marginBottom: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: '#662F90'
  }
});
