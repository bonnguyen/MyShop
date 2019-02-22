import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, Image, FlatList, StyleSheet, RefreshControl
} from 'react-native';

import getListProduct from '../../../../api/getListProduct';
import icBack from '../../../../media/appIcon/backList.png';

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

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: null,
      refreshing: false,
      page: 1
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const idType = navigation.getParam('id', null);

    getListProduct(idType, 1)
    .then(resProducts => {
      this.setState({
        listProduct: resProducts
      });
    })
    .catch(error => console.log(error));
  }

  gotoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  gotoProductDetail = (item) => {
    const { navigation } = this.props;
    navigation.push('ProductDetail', {
      product: item
    });
  }

  render() {
    const { wrapper, container, header, iconStyle, titleStyle } = styles;
    const { navigation } = this.props;
    const name = navigation.getParam('name', null);
    const id = navigation.getParam('id', null);
    return (
      <View style={wrapper}>
        <View style={container}>
          <View style={header}>
            <TouchableOpacity onPress={this.gotoBack}>
              <Image style={iconStyle} source={icBack} />
            </TouchableOpacity>
            <Text style={titleStyle} numberOfLines={1}>{name}</Text>
            <View style={{ width: 30 }} />
          </View>
          <FlatList
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            data={this.state.listProduct}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ProductItem product={item} gotoProductDetail={this.gotoProductDetail} />}
            refreshControl={
              <RefreshControl 
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({ refreshing: true });
                  const newPage = this.state.page + 1;
                  const idType = id;
                  getListProduct(idType, newPage)
                  .then(resProducts => {
                    this.setState({ 
                      listProduct: resProducts.concat(this.state.listProduct),
                      refreshing: false,
                      page: this.state.page + 1
                    });
                  })
                  .catch(error => console.log(error));
                }}
              />
          }
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
  container: {
    backgroundColor: '#FFF',
    shadowColor: '#2E272B',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.2,
    margin: 10,
    paddingHorizontal: 5,
    paddingBottom: 5
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  titleStyle: {
    flex: 1,
    color: '#B10D65',
    fontFamily: 'Avenir',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  },
  iconStyle: {
    width: 25,
    height: 25
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around'
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
