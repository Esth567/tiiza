import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatComponent = ({ item }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState({});

  //👇🏻 Retrieves the last message in the array from the item prop
  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      id: item.id,
      name: item.name,
    });
  };

  return (
    <Pressable style={styles.chat} onPress={handleNavigation}>
      <FontAwesome name="person-circle" size={45} color="black" style={{ marginRight: 15 }} />

      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.messagetxt}>
            {messages?.text ? messages.text : 'Tap to start chatting'}
          </Text>
        </View>
        <View>
          <Text style={{ opacity: 0.5 }}>{messages?.time ? messages.time : 'now'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chat: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 80,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  messagetxt: {
    fontSize: 14,
    opacity: 0.7,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default ChatComponent;
