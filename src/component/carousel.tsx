import React, { useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../constant/theme';

const data = [
    {
      id: 1,
      title: 'Iphone X',
      status: 'Stolen',
      image: require('../assets/phone7.png'),
      description: 'Color Black',
      lastseen: '3 hours ago',
      location: 'last seen at Lekki',
      // backgroundColor: '#012454',
    },
    {
      id: 2,
      title: 'Iphone X',
      status: 'Stolen',
      image: require('../assets/phone7.png'),
      description: 'Color Black',
      lastseen: '3 hours ago',
      location: 'last seen at Lekki',
    },
    {
        id: 3,
        title: 'Iphone X',
        status: 'Lost',
        image: require('../assets/phone7.png'),
        description: 'Color Black',
        lastseen: '3 hours ago',
        location: 'last seen at Lekki',
    }
  ];
  
  const CarouselComponent = (props) => {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          if (activeIndex === data.length - 1) {
            setActiveIndex(0);
            carouselRef.current.snapToItem(0);
          } else {
            setActiveIndex(activeIndex + 1);
            carouselRef.current.snapToNext();
          }
        }, 3000);
    
        return () => clearInterval(timer);
      }, [activeIndex]);
      
     
    const renderItem = ({ item, index }) => (
      <View style={[styles.card, { backgroundColor: index === 0 ? '#012454' : '#A8C2FB' }]}>
        <View style={styles.imagecontainer}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.separator} />
          <View
            style={[
              styles.subscriptionContainer2,
              { backgroundColor: index === 0 ? '#A8C2FB' : '#012454' },
              { color: index === 0 ? '#000000' : '#0000b3' },
            ]}
          >
            <Text style={styles.textContainer2}>{item.status}</Text>
          </View>
        </View>
        <Text style={[styles.cardTitle, { color: index === 0 ? '#ffffff' : '#000000' }]}>
          {item.title}
        </Text>
        <Text style={[styles.cardDescription, { color: index === 0 ? '#ffffff' : '#000000' }]}>
          {item.description}
        </Text>
        <Text style={[styles.lastseen, , { color: index === 0 ? '#ffffff' : '#000000' }]}>
          {item.lastseen}
        </Text>
        <Text style={[styles.location, { color: index === 0 ? '#ffffff' : '#000000' }]}>
          {item.location}
        </Text>
      </View>
    );
    return (
      <View style={styles.container}>
        <Carousel
         layout="default"
         ref={carouselRef}
          data={data}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  };
  
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth * 0.8;
  
  const styles = StyleSheet.create({
    imagecontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      // paddingVertical: 10,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    subscriptionContainer2: {
      height: 35,
      width: '30%',
      borderRadius: 50,
      backgroundColor: COLORS.primary,
      marginBottom: 10,
    },
    textContainer2: {
      color: COLORS.white,
      textAlign: 'center',
      paddingTop: 10,
      fontSize: 15,
      fontWeight: '600',
    },
    separator: {
      width: 30,
    },
    card: {
      backgroundColor: '#A8C2FB',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 260,
      width: '100%',
    },
    cardImage: {
      flexDirection: 'row',
      width: 100,
      height: 100,
      resizeMode: 'contain',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 10,
    },
    cardDescription: {
      fontSize: 12,
      fontWeight: 400,
      marginBottom: 8,
      textAlign: 'center',
    },
    lastseen: {
      fontSize: 12,
      fontWeight: 400,
    },
    location: {
      fontSize: 12,
      fontWeight: 500,
      marginTop: 8,
    },
    paginationContainer: {
      paddingVertical: 8,
    },
    paginationDot: {
      width: 10,
      height: 10,
      borderRadius: 8,
      marginHorizontal: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.92)',
      marginTop: 10
    },
    subscriptionContainer: {
      height: 48,
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      textAlign: 'center',
      paddingTop: 5,
      fontSize: 15,
      fontStyle: 'normal',
      fontWeight: 500,
    },
    detailsCont: {
      height: 30,
      width: '99%',
      marginTop: 15,
      borderBottomRightRadius: 20,
      textAlign: 'center'
    },
  });
  
export default CarouselComponent;
  