import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CarouselComponent from '../component/carousel';
import Card from '../component/Card';
import MyCard from '../component/Card';

const SeeallScreen =({navigation} : any)=> {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (text : any) => {
        setSearchQuery(text);
      };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}> 
    <View>
    <View style={styles.search}>
      <TextInput
        style={styles.textSearch}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="Search for an item"
      />
    </View>
    <View style={styles.categ}>
     <Text>All</Text>
     <Text>Document</Text>
     <Text>Car</Text>
     <Text>Phone</Text>
     <Text>Key</Text>
     <Text>Bag</Text>
     <Text>Laptop</Text>
    </View>
    <View style={{flexDirection: 'column'}}>
    <View style={{flexDirection: 'row'}}>
        <MyCard/>
        {/* <MyCard/> */}
    </View>
    </View>
   </View> 
   </ScrollView>

  )
}

const styles = StyleSheet.create({
    scrollViewContent:{
        flexGrow: 1,
    },
    search:{
        height: 45,
        width:'90%', 
        borderColor: 'gray', 
        borderWidth: 0, 
        backgroundColor:'#A8C2FB',
        padding: 5, 
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 10,
        
    },
    textSearch:{
       color: '#000000',
       marginLeft: 30,
       marginTop: 8,
       fontSize: 18,
    },
    categ:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      padding: 30
    }
})

export default SeeallScreen;
