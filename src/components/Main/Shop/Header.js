import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions
} from 'react-native';
import { DrawerActions } from 'react-navigation';

import global from '../../global';
import searchProduct from '../../../api/searchProduct';
import icLogo from '../../../media/appIcon/ic_logo.png';
import icMenu from '../../../media/appIcon/ic_menu.png';

const { height } = Dimensions.get('window');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.isUnmounted = true;
    this.state = {
      isDrawerOpen: false,
      txtSearch: ''
    };
  }

  componentDidMount() {
    this.isUnmounted = false;
    const defaultGetStateForAction = this.props.navigation.router.getStateForAction;
    this.props.navigation.router.getStateForAction = (action, state) => {
      switch (action.type) {
        case 'Navigation/OPEN_DRAWER':
        case 'Navigation/DRAWER_OPENED':
          if (!this.isUnmounted) {
            this.setState({ isDrawerOpen: true });
          }
          break;
        case 'Navigation/CLOSE_DRAWER':
        case 'Navigation/DRAWER_CLOSED':
          if (!this.isUnmounted) {
            this.setState({ isDrawerOpen: false });
          }
          break;
        default:
          break;
      }
      return defaultGetStateForAction(action, state);
    };
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  onSearch = () => {
    this.gotoSearch();
    const { txtSearch } = this.state;
    searchProduct(txtSearch)
    .then(res => {
      global.setArraySearch(res);
    })
    .catch(error => console.log(error));
  }

  gotoSearch = () => {
    this.props.navigation.navigate('Search');
  }

  openLeftMenu = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  closeLeftMenu = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  openOrCloseLeftMenu = () => {
    const { isDrawerOpen } = this.state;
    if (isDrawerOpen) {
      this.closeLeftMenu();
    } else {
      this.openLeftMenu();
    }
  }

  render() {
    const { wrapper, row, iconStyle, titleStyle, textInput } = styles;
    return (
      <View style={wrapper}>
        <View style={row}>
          <TouchableOpacity onPress={this.openOrCloseLeftMenu}>
            <Image style={iconStyle} source={icMenu} />
          </TouchableOpacity>
          <Text style={titleStyle} numberOfLines={1}>Wearing a Dress</Text>
          <Image style={iconStyle} source={icLogo} />
        </View>
        <TextInput
          style={textInput}
          placeholder="What do you want to buy?"
          underlineColorAndroid="transparent"
          value={this.state.txtSearch}
          onChangeText={text => this.setState({ txtSearch: text })}
          onFocus={() => this.gotoSearch()}
          onSubmitEditing={() => this.onSearch()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height / 8,
    backgroundColor: '#34B089',
    padding: 10,
    justifyContent: 'space-around'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    height: height / 23,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingVertical: 0
  },
  titleStyle: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Avenir',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  },
  iconStyle: {
    width: 25,
    height: 25
  }
});
