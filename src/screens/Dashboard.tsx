import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Dimensions,
  Alert,
  ListRenderItemInfo,
} from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../component/CustomBotton';
import LostReport from './LostReport';
import images from '../constant/images';
import CarouselComponent from '../component/carousel';
import userServices from '../services/authServices';
import SeeallScreen from './SeeallScreen';
import FoundReport from './FoundReport';
import SubscriptionScreen from './SubscriptionScreen';
import Carousel from 'react-native-snap-carousel';

const WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(WIDTH * 0.75);

const HEIGHT = Dimensions.get('window').height * 5;

const Dashboard = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const isCarousel = React.useRef(null);

  const menuItems = [
    {
      name: 'All lost/found items',
      onPress: () => {
        navigation.navigate('seeAll');
      },
    },
    {
      name: 'Items found',
      onPress: () => {
        navigation.navigate('seeAll ');
      },
    },
    {
      name: 'My galary',
      onPress: () => {
        navigation.navigate(galary);
      },
    },
    {
      name: 'FoundReport',
      onPress: () => {
        navigation.navigate(FoundReport);
      },
    },
    {
      name: 'Subscription',
      onPress: () => {
        navigation.navigate(SubscriptionScreen);
      },
    },
    {
      name: 'LostReport',
      onPress: () => {
        navigation.navigate(LostReport);
      },
    },
  ];

  const advert = [
    {
      image:
        'https://th.bing.com/th/id/OIP.Ze7wEUKDUsO07emkEW8kWgAAAA?w=316&h=180&c=7&r=0&o=5&pid=1.7',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 3 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 15,
          marginHorizontal: 15,
        }}
      >
        <View style={style.header}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <FontAwesome name="bars" size={19} color={COLORS.black} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: COLORS.black,
                marginLeft: 15,
              }}
            >
              Welcome,
            </Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesome name="bell-o" size={18} color={COLORS.black} />
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 10,
                  height: 7,
                  width: 7,
                  backgroundColor: COLORS.red,
                  borderRadius: 5,
                }}
              ></View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          {advert.map(({ image, index }) => (
            <View key={index}>
              <Image source={{ uri: image }} style={style.image} />
            </View>
          ))}
        </View>
        <View style={style.card2}>
          <Text style={style.textStyle}>Lost and found items</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CarouselComponent />
        </View>
        <View style={style.card}>
          <Text style={style.textStyle}>In togetherness we achieve greateness</Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={style.modalView}>
            {menuItems.map(({ name, icon, onPress }) => (
              <TouchableOpacity onPress={onPress} key={name} style={style.item}>
                <View>{icon}</View>
                <Text style={style.itemText}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    height: 70,
    width: ITEM_WIDTH,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    marginBottom: 50,
    justifyContent: 'center',
  },
  lostContainer: {
    height: 120,
    width: ITEM_WIDTH,
    elavation: 20,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginBottom: 10,
  },
  foundContainer: {
    height: 120,
    width: '49%',
    elavation: 20,
    borderRadius: 20,
    backgroundColor: '#fff5dd',
    marginBottom: 10,
    marginLeft: 10,
  },
  cardContainer2: {
    width: ITEM_WIDTH,
    borderRadius: 20,
  },
  modalView: {
    marginTop: 50,
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    height: 220,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 5,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    color: COLORS.primary,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 165,
    borderRadius: 20,
  },
  card2: {
    height: 35,
    width: ITEM_WIDTH,
    backgroundColor: COLORS.primary,
    marginBottom: 7,
    justifyContent: 'center',
  },
});

export default Dashboard;
