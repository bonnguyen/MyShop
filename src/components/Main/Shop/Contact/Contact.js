import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import icPhone from '../../../../media/appIcon/phone.png';
import icMail from '../../../../media/appIcon/mail.png';
import icMessage from '../../../../media/appIcon/message.png';
import icLocation from '../../../../media/appIcon/location.png';
import DataFake from '../../../../fake/Data';

export default class Contact extends Component {
  render() {
    const { mapContainer, wrapper, infoContainer, rowInfoContainer, imageStyle, infoText } = styles;
    const { userInfo } = DataFake;
    return (
      <View style={wrapper}>
        <View style={mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 16.078622,
              longitude: 108.211521,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}
          >
          <Marker
            coordinate={{ latitude: 16.078622, longitude: 108.211521 }}
            title={'MyShop'}
            description={userInfo.address}
          />
          </MapView>
        </View>
        <View style={infoContainer}>
          <View style={rowInfoContainer}>
            <Image source={icLocation} style={imageStyle} />
            <Text style={infoText}>{userInfo.address}</Text>
          </View>
          <View style={rowInfoContainer}>
            <Image source={icPhone} style={imageStyle} />
            <Text style={infoText}>{userInfo.phone}</Text>
          </View>
          <View style={rowInfoContainer}>
            <Image source={icMail} style={imageStyle} />
            <Text style={infoText}>{userInfo.email}</Text>
          </View>
          <View style={[rowInfoContainer, { borderBottomWidth: 0 }]}>
            <Image source={icMessage} style={imageStyle} />
            <Text style={infoText}>{userInfo.phone}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    backgroundColor: '#DBDBD8' 
  },
  map: {
    flex: 1, 
    alignSelf: 'stretch', 
    width: undefined,
    zIndex: -1,
  },
  mapStyle: {
    width: width - 40,
    height: 230,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { 
      width: 0, 
      height: 3 
    },
    shadowOpacity: 0.2
  },
  infoContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
    marginTop: 0,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { 
      width: 0, 
      height: 3 
    },
    shadowOpacity: 0.2
  },
  rowInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D6D6D6'
  },
  imageStyle: {
    width: 30,
    height: 30
  },
  infoText: {
    fontFamily: 'Avenir',
    color: '#AE005E',
    fontWeight: '500'
  }
});
