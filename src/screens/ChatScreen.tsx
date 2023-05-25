import React, { useLayoutEffect, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChatComponent from '../component/ChatComponent';
import ChatModal from '../component/ChatModal';
import socket from '../utils/socket';

const Chat = () => {

  const [rooms, setRooms] = useState([]);
  const [visible, setVisible] = useState(false);

  	useLayoutEffect(() => {
		function fetchUsers() {
			fetch("http://localhost:4000/api")
				.then((res) => res.json())
				.then((data) => setRooms(data))
				.catch((err) => console.error(err));
		}
		fetchUsers();
	}, []);

  useEffect(() => {
    socket.on('roomsList', (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  const handleCreateName = () => setVisible(true);
return (
  <SafeAreaView style={styles.chatscreen}>
    <View style={styles.chattopContainer}>
      <View style={styles.chatheader}>
        <Text style={styles.chatheading}>Chats</Text>
        <Pressable onPress={handleCreateName}>
          <Feather name="edit" size={24} color="green" />
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
    {visible ? <Modal setVisible={setVisible} /> : ''}
  </SafeAreaView>
);
  };

  const styles = StyleSheet.create({
    chatscreen: {
      backgroundColor: '#F7F7F7',
      flex: 1,
      padding: 10,
      position: 'relative',
    },
    chatheading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'green',
    },
    chattopContainer: {
      backgroundColor: '#F7F7F7',
      height: 70,
      width: '100%',
      padding: 20,
      justifyContent: 'center',
      marginBottom: 15,
      elevation: 2,
    },
    chatheader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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