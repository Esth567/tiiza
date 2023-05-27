import React from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import socket from '../utils/socket';


const ChatModal = ({ setVisible }) => {
  const closeModal = () => setVisible(false);
  const [name, setName] = useState('');

	const handleCreateRoom = () => {
		socket.emit("createRoom", groupName);
		closeModal();
	};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your name</Text>
      <TextInput
        style={styles.modalinput}
        placeholder="Name"
        onChangeText={(value) => setName(value)}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={{ color: '#fff' }}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
          onPress={closeModal}
        >
          <Text style={{ color: '#fff' }}>CANCEL</Text>
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
    marginTop: 10,
  },
  txt: {
    color: '#fff',
  },
  container: {
    width: '100%',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ChatModal;