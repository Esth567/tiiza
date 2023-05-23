import React from 'react';
import { View, StyleSheet,Text} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { COLORS } from '../constant/theme';



const MyCard = () => {
    const data = [
        {
          id: 1,
          title: 'Iphone X',
          status: 'Stolen',
          image: require('../assets/phone7.png'),
          description: 'Color Black',
          lastseen: '3 hours ago',
          location: 'last seen at Lekki',
          details: 'Find Me'
          // backgroundColor: '#012454',
        },
        {
          id: 2,
          title: 'Necklace and ear ring',
          status: 'Stolen',
          image: require('../assets/phone8.png'),
          description: 'Color Black',
          lastseen: '3 hours ago',
          location: 'last seen at Lekki',
          details: 'Find Me'
        },
        {
            id: 3,
            title: 'Bag',
            status: 'Found',
            image: require('../assets/bag.png'),
            description: 'Color Yellow',
            lastseen: '1 week ago',
            location: 'last seen at car park',
            details: 'Am found'
        }
      ];
  return (
      <View style={styles.container}>
        {data.map(card => (
      <Card style={styles.card} key={card.id}>
         <View style={styles.imagecontainer}>
        <Card.Cover style={styles.image} source={card.image} />
        <View style={styles.subscriptionContainer2}>
          <Text style={styles.textContainer2}>{card.status}</Text>
          </View>
         </View>
         <View>
         <Card.Content>
        <Text style={styles.cardTitle}>{card.title}</Text>
        <Text style={styles.cardDescription}>{card.description}</Text>
        <Text style={styles.lastseen}>{card.lastseen}</Text>
        <Text style={styles.location}>{card.location}</Text>
        </Card.Content>
        <View style={styles.detailsCont}>
        <Text style={styles.subscriptionContainer}>{card.details}</Text>
        </View>
          </View>
      </Card>
       ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // flexWrap: 'wrap',
    // width: '100%'
    },
    card: {
    //  flex: 5,
    height: 300,
    width: '100%',
    backgroundColor: '#A8C2FB',
    marginVertical:10,
  },
  image:{
    width: 80,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#A8C2FB',
  },
  imagecontainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
},
  subscriptionContainer2:{
    height: 48,
    width: '38%',
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    marginRight: 10,
 
},
textContainer2:{
    color: COLORS.white,
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 600,
  },
  detailsCont:{
    backgroundColor: COLORS.primary,
    height: 50,
    width: '99%',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 7,
  },
  subscriptionContainer: {
  
    color: COLORS.white,
    textAlign: 'center',
    paddingTop: 2,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 500,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 8,
    marginTop: 15,
  },
  cardDescription: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 8,
    textAlign: 'left',
  },
  lastseen: {
      fontSize: 18,
      fontWeight: 400,
  },
  location: {
      fontSize: 16,
      fontWeight: 500,
      marginBottom: 5,
      marginTop: 8,
  },
});

export default MyCard;






















// import React, { useState, useEffect, useRef} from 'react';
// import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
// import { COLORS } from '../constant/theme';

// const data = [
//     {
//       id: 1,
//       title: 'Iphone X',
//       status: 'Stolen',
//       image: require('../assets/phone7.png'),
//       description: 'Color Black',
//       lastseen: '3 hours ago',
//       location: 'last seen at Lekki',
//       // backgroundColor: '#012454',
//     },
//     {
//       id: 2,
//       title: 'Iphone X',
//       status: 'Stolen',
//       image: require('../assets/phone7.png'),
//       description: 'Color Black',
//       lastseen: '3 hours ago',
//       location: 'last seen at Lekki',
//     },
//     {
//         id: 3,
//         title: 'Iphone X',
//         status: 'Lost',
//         image: require('../assets/phone7.png'),
//         description: 'Color Black',
//         lastseen: '3 hours ago',
//         location: 'last seen at Lekki',
//     }
//   ];
  
// //   const Card =({item,props}) => {

// //      <View style={styles.card}>
// //         <View style={styles.imagecontainer}>
// //             <Image source={item.image} style={styles.cardImage} />
// //             <View style={styles.separator} />
// //             <Text style={styles.cardText}>{item.title}</Text>
// //             <Text style={styles.cardText}>{item.status}</Text>
// //             <Text style={styles.cardText}>{item.description}</Text>
// //             <Text style={styles.cardText}>{item.lastseen}</Text>
// //             <Text style={styles.cardText}>{item.location}</Text>
// //         </View>
// //         </View>
// //   }
// //   const styles = StyleSheet.create({
// //     card: {
// //       backgroundColor: '#fff',
// //       borderRadius: 5,
// //       padding: 10,
// //       margin: 10,
// //       shadowColor: '#000',
// //       shadowOffset: { width: 0, height: 2 },
// //       shadowOpacity: 0.8,
// //       shadowRadius: 2,
// //       elevation: 5,
// //     },
// //     cardText: {
// //       fontSize: 16,
// //     },
// //   });
  

// //   export default Card


// const Card = (item) => {
//     return (
//       <View style={styles.card}>
//         <Text style={styles.cardText}>{item.title}</Text>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     card: {
//       backgroundColor: '#fff',
//       borderRadius: 5,
//       padding: 10,
//       margin: 10,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.8,
//       shadowRadius: 2,
//       elevation: 5,
//     },
//     cardText: {
//       fontSize: 16,
//     },
//   });
  
//   export default Card;