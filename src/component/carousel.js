import React, { useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
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
          <View style={[styles.card, { backgroundColor: index === 0 ? '#012454' : '#A8C2FB'}]}>
        <View style={styles.imagecontainer}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.separator} />
          <View style={[styles.subscriptionContainer2, { backgroundColor: index === 0 ? '#A8C2FB' : '#012454'},{color: index === 0 ? '#000000' : '#0000b3'}]}>
          <Text style={styles.textContainer2}>{item.status}</Text>
          </View>
        </View>
        <Text style={[styles.cardTitle, { color: index === 0 ? '#ffffff' : '#000000'}]}>{item.title}</Text>
        <Text style={[styles.cardDescription, { color: index === 0 ? '#ffffff' : '#000000'}]}>{item.description}</Text>
        <Text style={[styles.lastseen,, { color: index === 0 ? '#ffffff' : '#000000'}]}>{item.lastseen}</Text>
        <Text style={[styles.location, { color: index === 0 ? '#ffffff' : '#000000'}]}>{item.location}</Text>
        <View style={styles.detailsCont}>
        <Text style={[styles.subscriptionContainer, { backgroundColor: index === 0 ? '#A8C2FB' : '#012454'}]}>View Details</Text>
        </View>
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
    imagecontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        // paddingVertical: 10,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    subscriptionContainer2:{
        height: 48,
        width: '38%',
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        marginBottom: 10,
  },
    textContainer2:{
      color: COLORS.white,
      textAlign: 'center',
      paddingTop: 10,
      fontSize: 18,
      fontWeight: 600,
    },
    separator: {
        width: 30,
      },
    card: {
      backgroundColor: '#A8C2FB',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: '100%',
    },
    cardImage: {
    flexDirection: 'row',
      width: 100,
      height: 150,
      resizeMode: 'contain',
      alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: 'bold',
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
        fontSize: 18,
        fontWeight: 500,
        marginBottom: 5,
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
    },
    subscriptionContainer: {
        height: 43, 
        backgroundColor: COLORS.primary,
        marginBottom: 25,
        color: COLORS.white,
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 500,
      },
      detailsCont:{
        height: 43,
        width: '99%',
        marginBottom: 13,
        borderRadius: 50,
      },
 });
  
export default CarouselComponent;
  