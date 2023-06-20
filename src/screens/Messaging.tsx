import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import MessageComponent from '../component/MessageComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../utils/socket';


const Messaging = ({ route, navigation }) => {

    const [chatMessages, setChatMessages] = useState([
      {
        id: '1',
        text: 'Hello guys, welcome!',
        time: '07:50',
        user: 'Tomer',
      },
      {
        id: '2',
        text: 'Hi Tomer, thank you! 😇',
        time: '08:50',
        user: 'David',
      },
    ]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');

    //👇🏻 Access the chatroom's name and id
    const { name, id } = route.params;

    //👇🏻 This function gets the username saved on AsyncStorage
    const getUserId = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id');
        if (value !== null) {
          setUser(value);
        }
      } catch (e) {
        console.error('Error while loading username!');
      }
    };

    //👇🏻 Sets the header title to the name chatroom's name
    useLayoutEffect(() => {
      navigation.setOptions({ title: name });
      getUserId();
    }, []);

    /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
    const handleNewMessage = () => {
      const hour =
        new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;

      const mins =
        new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;

      console.log({
        message,
        user,
        timestamp: { hour, mins },
      });
    };

    return (
      <View style={styles.messagingscreen}>
        <View style={[styles.messagingscreen, { paddingVertical: 15, paddingHorizontal: 10 }]}>
          {chatMessages[0] ? (
            <FlatList
              data={chatMessages}
              renderItem={({ item }) => <MessageComponent item={item} user={user} />}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            ''
          )}
        </View>

        <View style={styles.messaginginputContainer}>
          <TextInput style={styles.messageinput} onChangeText={(value) => setMessage(value)} />
          <Pressable style={styles.messagingbuttonContainer} onPress={handleNewMessage}>
            <View>
              <Text style={{ color: '#f2f0f1', fontSize: 16 }}>SEND</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  messagingscreen: {
    flex: 1,
  },
  messagingbuttonContainer: {
    width: '20%',
    backgroundColor: 'green',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 45,
  },
  messaginginputContainer: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  messageinput: {
    borderWidth: 0.5,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    height: 50,
  },
});

export default Messaging;