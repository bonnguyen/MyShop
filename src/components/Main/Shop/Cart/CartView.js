import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet, Image, Alert
} from 'react-native';

import getToken from '../../../../storage/getToken';
import sendOrder from '../../../../api/sendOrder';
import global from '../../../global';
import { HOST_API } from '../../../../Constants';
import { toTitleCase } from '../../../Utils';

const IMAGE_PRODUCT_PATH = HOST_API.concat('api/images/product/');

class ProductItem extends Component {
  incrQuantity = (productId) => {
    global.incrQuantity(productId);
  }

  decrQuantity = (productId) => {
    global.decrQuantity(productId);
  }

  removeProduct = (productId) => {
    global.removeProduct(productId);
  }

  render() {
    const { productStyle, mainRight, productController, textName, textPrice, productImage,
      numberOfProduct, textShowDetail, showDetailContainer } = styles;
    const { cartItem, gotoProductDetail } = this.props;
    return (
      <View style={productStyle}>
        <Image source={{ uri: `${IMAGE_PRODUCT_PATH}${cartItem.product.images[0]}` }} style={productImage} />
        <View style={[mainRight]}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={textName}>{toTitleCase(cartItem.product.name)}</Text>
            <TouchableOpacity onPress={() => this.removeProduct(cartItem.product.id)}>
              <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={textPrice}>{cartItem.product.price}$</Text>
          </View>
          <View style={productController}>
            <View style={numberOfProduct}>
              <TouchableOpacity onPress={() => this.incrQuantity(cartItem.product.id)}>
                <Text>+</Text>
              </TouchableOpacity>
              <Text>{cartItem.quantity}</Text>
              <TouchableOpacity onPress={() => this.decrQuantity(cartItem.product.id)}>
                <Text>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={showDetailContainer} onPress={() => gotoProductDetail(cartItem.product)}>
              <Text style={textShowDetail}>SHOW DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default class CartView extends Component {
  onSendOrder = async () => {
    try {
      const token = await getToken();
      const { cartArray } = this.props.screenProps;
      const arrayDetail = cartArray.map(e => ({ 
        id: e.product.id, 
        quantity: e.quantity 
      }));
      console.log(arrayDetail);
      const kq = await sendOrder(token, arrayDetail);
      if (kq === 'THEM_THANH_CONG') {
        console.log('THEM THANH CONG');
        global.resetCart();
      } else {
        console.log('THEM THAT BAI', kq);
      }
    } catch (error) {
      console.log(error);
    }
  }

  checkAndSubmitOrder = async () => {
    const token = await getToken();
    if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
      this.requestLogin();
      return;
    }
    this.onSendOrder();
  }

  requestLogin = () => {
    Alert.alert(
      'Notice',
      'You are not logged in. Please log in and try again',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sign In',
          onPress: () => this.props.navigation.navigate('AuthStack')
        }
      ],
      {
        cancelable: false
      }
    );
  }

  gotoProductDetail = (item) => {
    const { navigation } = this.props;
    navigation.push('ProductDetail', {
      product: item
    });
	}

  render() {
		const { wrapper, checkoutButtonWrapper, checkoutButton, checkoutTitle } = styles;
    const { cartArray } = this.props.screenProps;
		const arrTotal = cartArray.map(e => e.product.price * e.quantity);
    const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
		const flatList = (
			<View style={wrapper}>
        <FlatList
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          data={cartArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ProductItem cartItem={item} gotoProductDetail={this.gotoProductDetail} />}
        />
        <View style={checkoutButtonWrapper}>
          <TouchableOpacity style={checkoutButton} onPress={() => this.checkAndSubmitOrder()}>
            <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
          </TouchableOpacity>
        </View>
			</View>
		);

    return (
      <View style={wrapper}>
				{ cartArray.length ? flatList : null }
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: '#DFDFDF'
  },
  checkoutButtonWrapper: {
    backgroundColor: '#9A9A9A'
  },
	checkoutButton: {
		height: 50,
		margin: 10,
		backgroundColor: '#2ABB9C',
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	checkoutTitle: {
		color: '#FFF',
		fontSize: 15,
		fontWeight: 'bold',
		fontFamily: 'Avenir'
	},
	productStyle: {
		flexDirection: 'row',
		margin: 10,
		padding: 10,
		backgroundColor: '#FFFFFF',
		borderRadius: 2,
		shadowColor: '#3B5458',
		shadowOffset: {
      width: 0,
      height: 3
    },
		shadowOpacity: 0.2
	},
	productImage: {
		width: imageWidth,
		height: imageHeight,
		flex: 1,
		resizeMode: 'center'
	},
	mainRight: {
		flex: 3,
		justifyContent: 'space-between'
	},
	productController: {
		flexDirection: 'row'
	},
	numberOfProduct: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	textName: {
		paddingLeft: 20,
		color: '#A7A7A7',
		fontSize: 20,
		fontWeight: '400',
		fontFamily: 'Avenir'
	},
	textPrice: {
		paddingLeft: 20,
		color: '#C21C70',
		fontSize: 20,
		fontWeight: '400',
		fontFamily: 'Avenir'
	},
	textShowDetail: {
		color: '#C21C70',
		fontSize: 10,
		fontWeight: '400',
		fontFamily: 'Avenir',
		textAlign: 'right',
	},
	showDetailContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}
});
