import React, { Component } from 'react';
import { 
  View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Dimensions
} from 'react-native';

import getOrderHistory from '../../api/getOrderHistory';
import getToken from '../../storage/getToken';
import icBack from '../../media/appIcon/backs.png';

const { width } = Dimensions.get('window');

class OrderItem extends Component {
  render() {
    const { orderRow } = styles;
    const { order } = this.props;
    return (
      <View style={orderRow}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Order id:</Text>
          <Text style={{ color: '#2ABB9C' }}>ORD {order.id}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>OrderTime:</Text>
          <Text style={{ color: '#C21C70' }}>{order.date_order}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Status:</Text>
          <Text style={{ color: '#2ABB9C' }}>{order.status ? 'Completed' : 'Pending'}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Total:</Text>
          <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{order.total}$</Text>
        </View>
    </View>
    );
  }
}

export default class OrderHistory extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      orderHistory: null
    };
  }

  componentDidMount() {
    getToken()
    .then(token => getOrderHistory(token))
    .then(res => {
      this.setState({ orderHistory: res });
    })
    .catch(error => console.log(error));
  }

  goBackToMain = () => {
    this.props.navigation.pop();
  }

  render() {
    const { wrapper, header, headerTitle, backIconStyle, container } = styles;
    return (
      <View style={wrapper}>
        <View style={header}>
          <View style={{ width: 30 }} />
          <Text style={headerTitle}>Order History</Text>
          <TouchableOpacity onPress={this.goBackToMain}>
            <Image source={icBack} style={backIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={container}>
          <FlatList
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            data={this.state.orderHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <OrderItem order={item} />}
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
  header: { 
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: '#34B089', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10 
  },
  headerTitle: { 
    fontFamily: 'Avenir', 
    color: '#FFF', 
    fontSize: 20 
  },
  backIconStyle: { 
    width: 30, 
    height: 30 
  },
  container: {
    flex: 10,
    justifyContent: 'center'
  },
  orderRow: {
    height: width / 3,
    backgroundColor: '#FFF',
    margin: 10,
    shadowOffset: { 
      width: 0, 
      height: 3 
    },
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around'
  }
});
