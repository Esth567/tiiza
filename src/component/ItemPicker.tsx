import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';

const ItemPicker = () => {
  const [choosenLabel, setChoosenLabel] = useState('Native');
  const [choosenIndex, setChoosenIndex] = useState('2');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/*Picker with multiple chose to choose*/}
        {/*selectedValue to set the preselected value if any*/}
        {/*onValueChange will help to handle the changes*/}
        <Picker
          selectedValue={choosenLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel(itemValue);
            setChoosenIndex(itemIndex);
          }}
        >
          <Picker.Item label="Item type" value="Item type" />
          <Picker.Item label="React" value="React" />
          <Picker.Item label="Worth of Item" value="Worth of Item" />
          <Picker.Item label="How" value="How" />
          <Picker.Item label="are" value="are" />
          <Picker.Item label="you" value="you" />
        </Picker>
        {/*Text to show selected picker value*/}
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Selected Value: {choosenLabel}</Text>
        {/*Text to show selected index */}
        <Text style={styles.text}>Selected Index: {choosenIndex}</Text>
      </View>
    </SafeAreaView>
  );
};


export default ItemPicker;
