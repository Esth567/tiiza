import React, { useState, useEffect } from 'react';
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
  Alert,
  ListRenderItemInfo,
} from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../component/CustomBottom';
import LostReport from './LostReport';
import images from '../constant/images';
import CarouselComponent from '../component/carousel';
import userService from '../services/user-service';
import SeeallScreen from './SeeallScreen';
import FoundReport from './FoundReport';
import SubscriptionScreen from './SubscriptionScreen';


const Dashboard = ({navigation}:any) => {


  const [modalVisible, setModalVisible] = useState(false);
   const [content, setContent] = useState('');

    useEffect(() => {
      userService.getDashboard().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const content =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(content);
        }
      );
    }, []);

    interface IUser {
    icon: string;
    name: string;
  }

  const menuItems = [
    {
      name: 'Missing items',
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

  const Item = ({ data }: { data: IUser }) => (
    <TouchableOpacity onPress={() => navigation.navigate(data.name)} style={{ alignItems: 'center', justifyContent: 'center', padding: 10}}>
      <View>{data.icon}</View>
      <Text style={{color: COLORS.white}}>{data.name}</Text>
    </TouchableOpacity>
  );


 const renderItem: ListRenderItem<IUser> = ({ item }) => <Item data={item} />;  

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 3 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
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
        <View style={style.card}></View>

        <View style={style.subscriptionContainer}>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              fontSize: 15,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}
          >
            Get the latest gist about your area
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginHorizontal: 20,
                color: COLORS.primary,
                flex: 1,
              }}
            >
              With Tiiza community
            </Text>
            <View style={{ marginRight: 20 }}>
              <Image source={images.community2} style={{ height: 65, width: 78 }} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CarouselComponent />
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
}

const style = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    height: 120,
    width: '100%',
    elevation: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  lostContainer: {
    height: 120,
    width: '49%',
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
  subscriptionContainer: {
    height: 100,
    width: '100%',
    elavation: 30,
    borderWidth: 0.5,
    borderColor: COLORS.secondary,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginBottom: 20,
  },
  seeAll: {
    marginHorizontal: 10,
    color: COLORS.black,
    fontSize: 12,
    height: 30,
    // justifyContent: 'center',
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportIcon2: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adContainer: {
    height: 250,
    width: '47%',
    elavation: 20,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
  },
  adContainer2: {
    height: 250,
    width: '47%',
    elavation: 20,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginLeft: 15,
  },
  plusBtn: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    marginHorizontal: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 16,
    paddingVertical: 3,
    paddingLeft: 20,
  },
});

export default Dashboard;