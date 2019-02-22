import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import Home from './Home/Home';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Contact from './Contact/Contact';

import icHomeTabSelected from '../../../media/appIcon/home.png';
import icHomeTab from '../../../media/appIcon/home0.png';
import icCartTabSelected from '../../../media/appIcon/cart.png';
import icCartTab from '../../../media/appIcon/cart0.png';
import icSearchTabSelected from '../../../media/appIcon/search.png';
import icSearchTab from '../../../media/appIcon/search0.png';
import icContactTabSelected from '../../../media/appIcon/contact.png';
import icContactTab from '../../../media/appIcon/contact0.png';

class IconWithBadge extends Component {
  render() {
    const {
      viewIconWithBadgeStyle, iconWithBadgeStyle, viewNumberOfBadgeStyle, textNumberOfBadgeStyle
    } = styles;
    const { source, badgeCount } = this.props;
    return (
      <View style={viewIconWithBadgeStyle} >
        <Image source={source} style={iconWithBadgeStyle} />
        { badgeCount > 0 && (
          <View style={viewNumberOfBadgeStyle}>
            <Text style={textNumberOfBadgeStyle}>{badgeCount}</Text>
          </View>
        )}
      </View>
    );
  }
}

const AppTabNavigator = createBottomTabNavigator(
  {
    Home,
    Cart,
    Search,
    Contact
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            if (focused) {
              iconName = icHomeTabSelected;
            } else {
              iconName = icHomeTab;
            }
            break;
          case 'Cart':
            if (focused) {
              iconName = icCartTabSelected;
            } else {
              iconName = icCartTab;
            }
            return <IconWithBadge source={iconName} badgeCount={screenProps.cartArray.length} />;
          case 'Search':
            if (focused) {
              iconName = icSearchTabSelected;
            } else {
              iconName = icSearchTab;
            }
            break;
          case 'Contact':
          default:
            if (focused) {
              iconName = icContactTabSelected;
            } else {
              iconName = icContactTab;
            }
            break;
        }
        return <IconWithBadge source={iconName} badgeCount={0} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#34B089'
    },
  }
);

export default AppTabNavigator;

const styles = StyleSheet.create({
  viewIconWithBadgeStyle: {
    width: 28,
    height: 28,
    marginTop: 5
  },
  iconWithBadgeStyle: {
    width: 25,
    height: 25
  },
  viewNumberOfBadgeStyle: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'blue',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  textNumberOfBadgeStyle: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  }
});
