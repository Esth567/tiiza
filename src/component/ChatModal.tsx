import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import socket from '../utils/socket';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.95);

const ChatModal = ({ setVisible }) => {
  const [groupName, setGroupName] = useState('');

  //👇🏻 Function that closes the Modal component
  const closeModal = () => setVisible(false);

  //👇🏻 Logs the group name to the console
  const handleCreateRoom = () => {
    socket.emit('createRoom', groupName);
    closeModal();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your Group name</Text>
      <TextInput
        style={styles.modalinput}
        placeholder="Group name"
        onChangeText={(value) => setGroupName(value)}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.txt}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
          onPress={closeModal}
        >
          <Text style={styles.txt}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalbutton: {
    width: '40%',
    height: 45,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {
    color: '#fff',
  },
  container: {
    borderTopColor: '#ddd',
    width: '100%',
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 20,
    bottom: 0,
    zIndex: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalinput: {
    borderWidth: 1,
    width: ITEM_WIDTH,
    marginBottom: 15,
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ChatModal;
