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
} from 'react-native';
import React, { useState, useEffect } from 'react'
import CarouselComponent from '../component/carousel';
import { COLORS } from '../constant/theme';
import Card from '../component/Card';
import MyCard from '../component/Card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const API_ENDPOINT = 'http://192.168.43.95:5000/api/v1/fetch/lost-items';

const SeeallScreen =({navigation} : any)=> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: any) => {
      setSearchQuery(query);
    };

      useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT)
      }, []);

       const fetchData = async(url) => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setData(json.results);

          console.log(json.results);

          setIsLoading(false);
        } catch(error) {
          setError(error);
          console.log(error);
          setIsLoading(false);
        }
      }

         if (isLoading) {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          </View>
        )
      };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          marginHorizontal: 15,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Search for all items"
          clearButtonMode="always"
          style={styles.searchBox}
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onchangeText={(query) => handleSearch(query)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
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
    paddingHorizontal: 10,
    backgroundColor: '#5211',
    marginTop: 20,
  },
});

export default SeeallScreen;
