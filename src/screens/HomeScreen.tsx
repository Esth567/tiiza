import React from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 10 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="ddark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          marginHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={style.reportContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginHorizontal: 10,
                  paddingTop: 50,
                  color: COLORS.black,
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginRight: 70
                }}
              >
                Create Advert for Lost items
              </Text>
              <View style={style.reportIcon}>
                <TouchableOpacity
                  style={style.reportIcon2}
                  onPress={() => {
                    navigation.navigate('Create Ad');
                  }}
                >
                  <FontAwesome name="plus" size={28} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                marginHorizontal: 10,
                color: COLORS.black,
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10
              }}
            >
              and items found
            </Text>
            <Text
              style={{
                marginHorizontal: 12,
                color: COLORS.black,
                fontSize: 12,
              }}
            >
              Click on the plus icon to report a lost or found item
            </Text>
          </View>
        </View>
        <View style={style.subscriptionContainer}>
          <Text
            style={{
              marginHorizontal: 10,
              paddingTop: 10,
              color: COLORS.white,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Go Tiiza
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              paddingTop: 10,
              color: COLORS.white,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Upgrade to Tiiza and get
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              color: COLORS.white,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            the atmost search result
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              marginHorizontal: 10,
              color: COLORS.black,
              fontSize: 14,
              fontWeight: '600',
              flex: 1,
              marginBottom: 20
            }}
          >
            Missing item
          </Text>
          <Text style={{ marginHorizontal: 10, color: COLORS.black, fontSize: 12 }}>See all</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={style.adContainer}></View>
          <View style={style.adContainer2}></View>
        </View>        
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  reportContainer: {
    height: 150,
    width: '100%',
    elavation: 20,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginBottom: 10,
  },
  subscriptionContainer: {
    height: 100,
    width: '100%',
    elavation: 20,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportIcon2: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adContainer: {
    height: 250,
    width: '47%',
    elavation: 20,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
  },
   adContainer2: {
    height: 250,
    width: '47%',
    elavation: 20,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginLeft: 15
  },
});

export default HomeScreen;