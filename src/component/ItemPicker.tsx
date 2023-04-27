import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

const ItemPicker = () => {
  const [choosenValue, setChoosenValue] = useState(2);
  const [choosenIndex, setChoosenIndex] = useState(1);
  const [data, setData] = useState([]);

  useEffect(()=>{
    //GET request
    fetch('http://localhost:5000//customer/fetch/lost-items', {
      method: 'GET',
      //Request Type
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success
        //alert(JSON.stringify(responseJson));
        // console.log(responseJson);
        setData(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/*Picker with multiple chose to choose*/}
        {/*selectedValue to set the preselected value if any*/}
        {/*onValueChange will help to handle the changes*/}
        <Picker
          selectedValue={choosenValue}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenValue(itemValue);
            setChoosenIndex(itemIndex);
          }}>
          {
            data.map(item =>{
              return <Picker.Item value={item.id} label={item.title} />    
            })
          }
        </Picker>
        {/*Text to show selected picker value*/}
        <Text style={styles.text}>
          Selected Value: {choosenValue}
        </Text>
        {/*Text to show selected index */}
        <Text style={styles.text}>
          Selected Index: {choosenIndex}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default ItemPicker;