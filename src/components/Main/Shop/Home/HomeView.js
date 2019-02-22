import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
import initData from './../../../../api/initData';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      products: []
    };
  }

  componentDidMount = () => {
    initData()
    .then(resJSON => {
      this.setState({
        types: resJSON.type,
        products: resJSON.product
      });
    });
  }

  render() {
    const { wrapper } = styles;
    const { navigation } = this.props;
    return (
      <ScrollView style={wrapper} showsVerticalScrollIndicator={false}>
        <Collection navigation={navigation} />
        <Category navigation={navigation} types={this.state.types} />
        <TopProduct navigation={navigation} topProducts={this.state.products} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DBDBD8'
  }
});
