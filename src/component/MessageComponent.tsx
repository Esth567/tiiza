import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function MessageComponent({ item, user }) {
  const status = item.user !== user;

  return (
    <View>
      <View
        style={
          status ? styles.mmessageWrapper : [styles.mmessageWrapper, { alignItems: 'flex-end' }]
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="person-circle-o" size={30} color="black" style={styles.mavatar} />
          <View
            style={status ? styles.msg : [styles.msg, { backgroundColor: 'rgb(194, 243, 194)' }]}
          >
            <Text>{item.text}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 40 }}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mmessageWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  msg: {
    maxWidth: '50%',
    backgroundColor: '#f5ccc2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
});
