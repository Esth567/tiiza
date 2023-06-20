import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChatComponent from '../component/ChatComponent';
import ChatModal from '../component/ChatModal';
import socket from '../utils/socket';
import { COLORS } from '../constant/theme';

const Chat = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const [rooms, setRooms] = useState([]);
  //👇🏻 Dummy list of rooms
 useLayoutEffect(() => {
   function fetchGroups() {
     fetch('http://192.168.43.95:5000/api/v1/customer/create/conversation')
       .then((res) => res.json())
       .then((data) => setRooms(data))
       .catch((err) => console.error(err));
   }
   fetchGroups();
 }, []);

 //👇🏻 Runs whenever there is new trigger from the backend
 useEffect(() => {
   socket.on('roomsList', (rooms) => {
     setRooms(rooms);
   });
 }, [socket]);

  return (
    <SafeAreaView>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Pressable onPress={navigation.goBack}>
            <FontAwesome name="angle-left" size={30} color={COLORS.white} />
          </Pressable>
          <Text style={styles.chatheading}>Chats</Text>
          <Pressable onPress={() => setVisible(true)}>
            <FontAwesome name="search" size={20} color={COLORS.white} />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <ChatModal setVisible={setVisible} /> : ''}
    </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
    chatheading: {
      fontSize: 19,
      fontWeight: 'bold',
      color: COLORS.white,
      flex: 1,
      marginLeft: 10
    },
    chattopContainer: {
      backgroundColor: COLORS.primary,
      height: 70,
      width: '100%',
      padding: 20,
      justifyContent: 'center',
      marginBottom: 15,
      elevation: 2,
    },
    chatheader: {
      flexDirection: 'row',
     alignItems: 'center'
    },
    chatlistContainer: {
      paddingHorizontal: 10,
    },
    chatemptyContainer: {
      width: '100%',
      height: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatemptyText: { fontWeight: 'bold', fontSize: 24, paddingBottom: 30 },
  });

  export default Chat;