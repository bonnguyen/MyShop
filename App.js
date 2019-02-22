import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createSwitchNavigator, createAppContainer, SafeAreaView } from 'react-navigation';

import global from './src/components/global';

import AppStack from './src/components/AppStack';
import AuthStack from './src/components/AuthStack';
import AuthLoading from './src/components/AuthLoading';

import getCart from './src/storage/getCart';
import saveCart from './src/storage/saveCart';

import refreshToken from './src/api/refreshToken';

StatusBar.setHidden(true);

const AppSwitch = createSwitchNavigator({
  AppStack,
  AuthStack,
  AuthLoading
}, {
  initialRouteName: 'AppStack' // Default is 'AuthLoading'
});

const AppContainer = createAppContainer(AppSwitch);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartArray: []
    };
    global.addProductToCart = this.addProductToCart.bind(this);
    global.incrQuantity = this.incrQuantity.bind(this);
    global.decrQuantity = this.decrQuantity.bind(this);
    global.removeProduct = this.removeProduct.bind(this);
    global.resetCart = this.resetCart.bind(this);
  }

  componentDidMount() {
    getCart()
    .then(cartArray => {
      this.setState({
        cartArray
      });
    });

    // auto refresh token
    setInterval(refreshToken, 30000);
  }

  addProductToCart(product) {
    const isExist = this.state.cartArray.some(e => e.product.id === product.id);
    if (isExist) return false;
    this.setState(
      { cartArray: this.state.cartArray.concat({ product, quantity: 1 }) },
      () => saveCart(this.state.cartArray)
    );
  }

  incrQuantity(productId) {
    const newCartArray = this.state.cartArray.map(e => {
      if (e.product.id !== productId) return e;
      return { product: e.product, quantity: e.quantity + 1 };
    });
    this.setState({ cartArray: newCartArray },
      () => saveCart(this.state.cartArray)
    );
  }

  decrQuantity(productId) {
    const newCartArray = this.state.cartArray.map(e => {
      if (e.product.id !== productId || e.quantity === 1) return e;
      return { product: e.product, quantity: e.quantity - 1 };
    });
    this.setState({ cartArray: newCartArray },
      () => saveCart(this.state.cartArray)
    );
  }

  removeProduct(productId) {
    const newCartArray = this.state.cartArray.filter(e => e.product.id !== productId);
    this.setState({ cartArray: newCartArray },
      () => saveCart(this.state.cartArray)
    );
  }

  resetCart() {
    const newCartArray = [];
    this.setState({ cartArray: newCartArray },
      () => saveCart(this.state.cartArray)
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppContainer screenProps={{ cartArray: this.state.cartArray }} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
