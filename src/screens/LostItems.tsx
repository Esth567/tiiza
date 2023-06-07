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
} from 'react-native';
import React, { useState, useEffect } from 'react'
import CarouselComponent from '../component/carousel';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.45);

const APP_URL = 'http://localhost:5000/api/v1/fetch/found-items';

const LostItems =({navigation} : any)=> {
  type ItemData = {
    id: string;
    title: string;
  };

  const DATA: ItemData[] = [
    {
      id: 1,
      title: 'Bag',
      status: 'Missing',
      image: require('../assets/images/bag1.jpg'),
      description: 'Color Black',
      lastseen: '3 hours ago',
      location: 'last seen at Lekki',
    },
    {
      id: 2,
      title: 'Envelope',
      status: 'Found',
      image: require('../assets/images/envelop.jpg'),
      description: 'Color Black',
      lastseen: '3 hours ago',
      location: 'last seen at Lekki',
    },
    {
      id: 2,
      title: 'IphoneX',
      status: 'Missing',
      image: require('../assets/images/phone2.jpg'),
      description: 'Color Black',
      lastseen: '3 hours ago',
      location: 'last seen at Lekki',
    },
  ];


  const renderItem = ({item}) => (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Image source={{ uri: item.image_url }} style={styles.cardImage} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={styles.cardTitle}>{item.item_name}</Text>
        <Text style={[styles.textContainer2, { color: index === 1 ? '#006000' : '#CA0C3A' }]}>
          {item.report_type}
        </Text>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.lastseen}>{item.lost_date}</Text>
      <Text style={styles.location}>{item.lost_location}</Text>
    </TouchableOpacity>
  );

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: any) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(APP_URL);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);

      console.log(json.results);
    } catch (error) {
      setError(error);
      console.log(error);
    }
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
      <ScrollView>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginBottom: 40,
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
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
              Lost and found
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
            value={searchQuery}
            onchangeText={(query) => handleSearch(query)}
          />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => (item.payload.item_id)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginBottom: 20,
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
    width: ITEM_WIDTH,
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    fontSize: 12,
    fontWeight: 400,
    paddingLeft: 10,
    marginTop: 10,
  },
  lastseen: {
    fontSize: 12,
    fontWeight: 400,
    paddingLeft: 10,
  },
  location: {
    fontSize: 12,
    fontWeight: 500,
    marginTop: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
});

export default LostItems;
