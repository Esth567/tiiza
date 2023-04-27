import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import CarouselComponent from '../component/carousel';
import { COLORS } from '../constant/theme';
import Card from '../component/Card';
import MyCard from '../component/Card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const API_ENDPOINT = 'http://localhost:5000//customer/fetch/found-items';

const SeeallScreen =({navigation} : any)=> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query : any) => {
        setSearchQuery(query);
      };

      useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT)
      }, []);

      const fetchData = async(uri) => {
        try {
          const response = await fetch(uri);
          const json = await response.json();
          setData(json.result);

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

      if (error) {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Error fetching data... Please check your connection</Text>
          </View>
        )
      };
           
           
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TextInput 
             placeholder="Search for all items" 
             clearButtonMode='always'
             style={style.searchBox}
             autoCapitalize='none' 
             autoCorrect={false}
             value={searchQuery}
             unchangeText={(query) => handleSearch(query)}
             />
            <TouchableOpacity>
              <FontAwesome name="search" size={18} />
            </TouchableOpacity>
            <FlatList 
             data={data}
             keyExtractor={(item) => item.login.email}
            />
          <View style={styles.categ}>
            <Text>All</Text>
            <Text>Document</Text>
            <Text>Car</Text>
            <Text>Phone</Text>
            <Text>Key</Text>
            <Text>Bag</Text>
            <Text>Laptop</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <MyCard />
              {/* <MyCard/> */}
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    marginHorizontal: 10,
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
    fontSize: 18,
  },
  categ: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
