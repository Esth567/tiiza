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
import CustomButton from '../component/CustomButton';
import LostReport from './ReportLostItems';
import images from '../constant/images';
import CarouselComponent from '../component/carousel';
import userServices from '../services/authServices';
import SeeallScreen from './LostItems';
import FoundReport from './FoundReport';
import SubscriptionScreen from './SubscriptionScreen';
import Carousel from 'react-native-snap-carousel';
import FoundDetail from './FoundDetails';

const WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(WIDTH * 0.73);

const HEIGHT = Dimensions.get('window').height * 5;

const Dashboard = ({ navigation }: any) => {
  const [selectedId, setSelectedId] = useState<string>();

  type ItemData = {
    id: string;
    name: string;
  };

  const DATA: ItemData[] = [
    {
      id: '1',
      name: 'Lost Items',
      icon: <FontAwesome name="list-alt" size={18} color={COLORS.primary} />,
    },
    {
      id: '2',
      name: 'Items Found',
      icon: <FontAwesome name="handshake-o" size={18} color={COLORS.primary} />,
      onPress: () => {
        navigation.navigate(ItemsFound);
      },
    },
    {
      id: '3',
      name: 'Report Found Items',
      icon: <FontAwesome name="archive" size={18} color={COLORS.primary} />,
      onPress: () => {
        navigation.navigate('ReportLostItems');
      },
    },
    {
      id: '4',
      name: 'Report Lost Items',
      icon: <FontAwesome name="bug" size={18} color={COLORS.primary} />,
      onPress: () => {
        navigation.navigate('ReportLostItems');
      },
    },
    {
      id: '6',
      name: 'Stealing alarm',
      icon: <FontAwesome name="exclamation-triangle" size={18} color={COLORS.primary} />,
    },
    {
      id: '5',
      name: 'Location',
      icon: <FontAwesome name="location-arrow" size={20} color={COLORS.primary} />,
    },
  ];

  type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  };

  const Item = ({ item, onPress }: ItemProps) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
      <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
        {item.icon}
      </View>
      <Text
        style={{
          textAlign: 'center',
          flexWrap: 'wrap',
          fontSize: 12,
          paddingTop: 8,
          marginBottom: 10,
          color: COLORS.primary,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

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
            <TouchableOpacity>
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
              <FontAwesome name="bell-o" size={15} color={COLORS.black} />
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
        <View style={style.card}>
          <Text style={style.textStyle}>In togetherness we achieve greateness</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={style.containerCard}>
            <FlatList
              data={DATA}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={Item}
              keyExtractor={(item) => item.id.toString()}
              extraData={selectedId}
              style={{ marginTop: 15 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={style.card2}>
          <Text style={style.textStyle}>Lost and found items</Text>
        </View>
        <CarouselComponent />
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
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card2: {
    height: 35,
    width: ITEM_WIDTH / 0.8,
    backgroundColor: COLORS.primary,
    marginBottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
  containerCard: {
    height: 150,
    width: ITEM_WIDTH,
    elevation: 7,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginTop: 3,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});

export default Dashboard;
