import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCont}>
        <Icon name="left" size={30} color="#4F8EF7" />
      <Text style={styles.name}>Mike Okiere</Text>
        </View>
      <Text style={styles.status}>Active</Text>
        </View> 
        <View style={styles.firstChat}>
            <Text>Hi Please the item with you is for me, 
                how do i get it back from you?
            </Text>
        </View> 
            <Text style={styles.time}>02:13 Pm</Text>
            <View style={styles.secChat}>
                <Text style={styles.secText}>Hi, please provide evidence that the item is yours</Text>
            </View>
            <Text style={styles.time2}>02:13 Pm</Text>
            <View style={styles.inputContainer}>
           <TextInput style={styles.input} placeholder="Type a message"/> 
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        },

        header: {
        height: 150,
        backgroundColor: '#012454',
        alignItems: 'center',
        justifyContent: 'center',
        },
        name:{
            // marginLeft: 60,
            alignItems: 'center',
            marginTop: 55,
            fontSize: 24,
            color: '#fff',
            fontWeight: 'normal',
        },
        status:{
            fontSize: 16,
            color: '#fff',
            fontWeight: 'normal',
        },
        firstChat:{
            height: 71,
            width: 250,
            backgroundColor: '#A8C2FB',
            marginTop: 50,
            marginLeft: 10,
            padding: 15,
            borderBottomStartRadius: 15,
            borderTopRightRadius: 30,
            borderBottomRightRadius: 15,
        },
        time:{
            fontSize: 12,
            color: '#464545',
            fontWeight: 'normal',
            marginLeft: 10,
            marginTop: 10,
        },
        secChat:{
            height: 71,
            width: 250,
            backgroundColor: '#012454',
            marginTop: 30,
            marginLeft: 150,
            padding: 16,
            borderBottomStartRadius: 15,
            borderTopLeftRadius: 30,
            borderBottomRightRadius: 15,
        },
        time2:{
            fontSize: 12,
            color: '#464545',
            fontWeight: 'normal',
            marginLeft: 340,
            marginTop: 10,
        },
        secText:{
            color: '#fff',
        },
        input:{
            height: 50,
            width: 350,
            backgroundColor: '#bbcef8',
            marginLeft: 30,
            padding: 16,   
        },
        inputContainer:{
           flex: 1,
           justifyContent: 'flex-end',
           marginBottom: 60 
        },
        iconCont:{
            marginRight: 120,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 100,
            alignItems: 'center',
           

        }

})

export default ChatScreen