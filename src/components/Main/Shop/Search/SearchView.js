import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';

import global from '../../../global';
import { toTitleCase } from '../../../Utils';
import { HOST_API } from '../../../../Constants';

const IMAGE_PRODUCT_PATH = HOST_API.concat('api/images/product/');

class ProductItem extends Component {
  render() {
    const { productContainer, productInfo, productImage, productName, productPrice, productMaterial,
      lastRowInfo, textColor, textShowDetail } = styles;
    const { product, gotoProductDetail } = this.props;
    return (
      <View style={productContainer}>
        <Image style={productImage} source={{ uri: `${IMAGE_PRODUCT_PATH}${product.images[0]}` }} />
        <View style={productInfo}>
          <Text style={productName}>{toTitleCase(product.name)}</Text>
          <Text style={productPrice}>{product.price}$</Text>
          <Text style={productMaterial}>Material {product.material}</Text>
          <View style={lastRowInfo}>
            <Text style={textColor}>Color {product.color}</Text>
            <View style={{ backgroundColor: product.color.toLowerCase(), height: 16, width: 16, borderRadius: 8 }} />
            <TouchableOpacity onPress={() => gotoProductDetail(product)}>
              <Text style={textShowDetail}>SHOW DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchListProduct: null,
    };
    global.setArraySearch = this.setArraySearch.bind(this);
  }

  setArraySearch(searchListProduct) {
    this.setState({ searchListProduct });
  }

  gotoProductDetail = (item) => {
    const { navigation } = this.props;
    navigation.push('ProductDetail', {
      product: item
    });
  }

  render() {
    const { wrapper } = styles;
    return (
      <View style={wrapper}>
        <FlatList
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          data={this.state.searchListProduct}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ProductItem product={item} gotoProductDetail={this.gotoProductDetail} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DBDBD8'
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    margin: 10,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around',
    shadowColor: '#2E272B',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.2
  },
  productImage: {
    width: 90,
    height: (90 * 452) / 361
  },
  productInfo: {
    justifyContent: 'space-between',
    marginLeft: 15,
    flex: 1
  },
  productName: {
    fontFamily: 'Avenir',
    color: '#BCBCBC',
    fontSize: 20,
    fontWeight: '400'
  },
  productPrice: {
    fontFamily: 'Avenir',
    color: '#B10D65',
  },
  productMaterial: {
    fontFamily: 'Avenir'
  },
  lastRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textColor: {
    fontFamily: 'Avenir'
  },
  textShowDetail: {
    fontFamily: 'Avenir',
    color: '#B10D65',
    fontSize: 11
  }
});
