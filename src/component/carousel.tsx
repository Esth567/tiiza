import React, { useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../constant/theme';

const data = [
 
    {
      id: 2,
      title: 'Bag',
      status: 'Missing',
      image: require('../assets/images/bag1.jpg'),
      description: 'Color Black',
      lastseen: '3 hours ago',
      location: 'last seen at Lekki',
    },
    {
        id: 3,
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
      
     
    const renderItem = ({ item, index }) => {
      return (
        <View style={styles.card}>
          <View>
            <Image source={item.image} style={styles.cardImage} />
            <View />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={[styles.textContainer2, { color: index === 1 ? '#006000' : '#CA0C3A' }]}>
                {item.status}
              </Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.lastseen}>{item.lastseen}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
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
  const itemWidth = sliderWidth * 0.5;
  
  const styles = StyleSheet.create({
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
      fontSize: 14,
      fontWeight: 'bold',   
      marginRight: 15,
      color: COLORS.primary,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 10,
      width: itemWidth,
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
      width: itemWidth,
      height: 120,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      flex: 1,
    },
    cardDescription: {
      fontSize: 12,
      fontWeight: 400,
      marginBottom: 8,
      paddingLeft: 15,
    },
    lastseen: {
      fontSize: 12,
      fontWeight: 400,
      paddingLeft: 15,
    },
    location: {
      fontSize: 12,
      fontWeight: 500,
      marginTop: 5,
      paddingLeft: 15,
      marginBottom: 15,
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
      marginTop: 10,
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
 
  });
  
export default CarouselComponent;
  