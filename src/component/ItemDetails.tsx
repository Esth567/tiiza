import { Text, View, Image, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { COLORS } from '../constant/theme';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.45);

export function ItemDetails({
  image_url,
  item_name,
  item_color,
  description,
  date_found,
  discovery_location,
  onPress,
}) {
  return (
    <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: image_url }} style={styles.cardImage} />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={styles.cardTitle}>{item_name}</Text>
          <Text style={styles.textContainer2}>{item_color}</Text>
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
        <Text style={styles.lastSeen}>{date_found}</Text>
        <Text style={styles.location}>{discovery_location}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
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
  lastSeen: {
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