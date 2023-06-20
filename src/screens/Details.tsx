import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StatusBar,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import filter from 'lodash.filter';
import CustomButton from '../component/CustomButton';


const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.93);


const Details = ({ navigation, route }) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const { payload } = route.params;


  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://192.168.43.95:5000/api/v1/customer/fetch/found-items')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError(error);
      });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching data ...Please check your connection</Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="white-content" />
      <ScrollView
        contentContainerStyle={{
          marginTop: -2,
        }}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginBottom: 40,
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={navigation.goBack}>
              <FontAwesome name="angle-left" size={26} color={COLORS.white} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: COLORS.white,
                marginLeft: 14,
                flex: 1,
              }}
            >
              Details
            </Text>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
              }}
            >
              <FontAwesome name="bell-o" size={15} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{ marginHorizontal: 15 }}>
            <Image source={{ uri: payload.image_url }} style={styles.cardImage} />
          </View>
          <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.cardTitle}>{payload.item_name}</Text>
            <Text style={styles.textContainer2}>{payload.item_color}</Text>
          </View>
          <Text style={styles.cardDescription}>{payload.description}</Text>
          <Text style={styles.lastseen}>{payload.date_found}</Text>
          <Text style={styles.location}>{payload.discovery_location}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15,
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <FontAwesome name="phone" size={20} color={COLORS.primary} />
            <Text style={styles.phone}>{payload.phone_number}</Text>
            <Text style={{ marginRight: 10, fontSize: 14, fontWeight: 'bold' }}>Chat</Text>
             <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <FontAwesome name="whatsapp" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 50,
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 10,
    height: 220,
    width: ITEM_WIDTH,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginTop: 20   
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 15,
    flex: 1,
    marginTop: 15
  },
  textContainer2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 15,
    marginTop: 15,
    color: COLORS.primary,
  },
  cardDescription: {
    fontSize: 13,
    fontWeight: '500',
    paddingLeft: 15,
    marginTop: 15,
  },
  lastseen: {
    fontSize: 13,
    marginTop: 15,
    fontWeight: '500',
    paddingLeft: 15,
  },
  location: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
    paddingLeft: 15,
    marginBottom: 15,
  },
  phone: {
    marginLeft: 2,
    marginBottom: 10,
    flex: 1,
    fontWeight: 'bold',
  },
});

export default Details;
