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



const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.45);

const image_url =
  '"http://localhost:5000/uploads/lost_and_found/found/basseyesth@gmail.com';

const ItemsFound = ({ navigation }) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState([]);
  const [error, setError] = useState(null);
  const [fullPayload, setFullPayload] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (text) => {
    if (text) {
      const newData = fullPayload.filter(function (item) {
        const itemData = item.item_name ? item.item_name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setPayload(newData);
      setSearch(text);
    } else {
      setPayload(fullPayload);
      setSearch(text);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = (item) => {
    fetch('http://192.168.43.95:5000/api/v1/customer/fetch/found-items')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setFullPayload(res.payload);
        setPayload(res.payload);
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

  const renderItem = ({ item }) => (
    <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9} onPress={() => navigation.navigate('Details', { payload: item})} >
      <View style={styles.card}>
       <Image source={{ uri: item.image_url }} style={styles.cardImage} />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text
            style={styles.cardTitle}
          >
            {item.item_name}
          </Text>
          <Text style={styles.textContainer2}>{item.item_color}</Text>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.location}>{item.discovery_location}</Text>
      </View>
    </TouchableHighlight>
  );

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
              Items Found
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
        <View style={styles.searchBox}>
          <FontAwesome name="search" size={20} color={COLORS.gray} style={{ marginLeft: 10 }} />
          <TextInput
            placeholder="Search for all lost, found items"
            clearButtonMode="always"
            style={styles.textSearch}
            autoCapitalize="none"
            autoCorrect={false}
            value={search}
            underlineColorAndroid="transparent"
            onChangeText={(text) => handleSearch(text)}
          />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <FlatList
            data={payload}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item) => item.item_id.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    marginBotom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    height: 45,
    width: '100%',
    backgroundColor: '#5211',
    padding: 5,
    marginTop: 20,
    borderRadius: 10,
  },
  textSearch: {
    color: '#000000',
    marginTop: 8,
    fontSize: 15,
    marginHorizontal: 10,
  },
  categ: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  searchBox: {
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    marginBottom: 30,
    marginVertical: -20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 10,
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
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    flex: 1,
  },
  textContainer2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 15,
    color: COLORS.primary,
  },
  cardDescription: {
    fontSize: 13,
    fontWeight: '500',
    paddingLeft: 10,
    marginTop: 10,
  },
  lastseen: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: '500',
    paddingLeft: 10,
  },
  location: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
});

export default ItemsFound;
