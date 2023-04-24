import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Input from '../component/Input';
import CustomButton from '../component/CustomBottom';

const CreateReport = ({navigation}) => {

  const [selectCategory, setSelectCategory] = React.useState(1);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          marginHorizontal: 15,
        }}
      >
        <View style={style.reportContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                marginHorizontal: 20,
                color: COLORS.white,
                fontSize: 15,
                fontWeight: '700',
                flex: 1,
              }}
            >
              Lost item
            </Text>
            <Text
              style={{ marginHorizontal: 20, color: COLORS.white, fontSize: 15, fontWeight: '500' }}
            >
              Found item
            </Text>
          </View>
        </View>
        <Text style={{ color: COLORS.black, fontSize: 12, marginBottom: 10 }}>
          Kindly provide details of the missing items
        </Text>
        <Text style={{ color: COLORS.black, fontSize: 15, fontWeight: '500', marginBottom: 2 }}>
          Category
        </Text>
        <View style={style.inputContainer}>
          <TextInput placeholder="Item type" style={{ flex: 1 }} />
          <TouchableOpacity>
            <FontAwesome name="caret-down" size={18} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 2,
              flex: 1,
            }}
          >
            Item
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 2,
              marginRight: 30,
            }}
          >
            Worth of item
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={style.inputContainer2}>
            <TextInput placeholder="1000-10,000" style={{ flex: 1 }} />
            <TouchableOpacity>
              <FontAwesome name="caret-down" size={18} />
            </TouchableOpacity>
          </View>
          <View style={style.inputContainer2}>
            <TextInput placeholder="1000-10,000" style={{ flex: 1 }} />
            <TouchableOpacity>
              <FontAwesome name="caret-down" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 2,
            }}
          >
            Additional information
          </Text>
          <TextInput style={style.infoContainer} placeholder="Type...." />
        </View>
        <Text style={{ color: COLORS.black, fontSize: 15, fontWeight: '500', marginBottom: 2 }}>
          Missing date and time
        </Text>
        <View style={style.inputContainer}>
          <TextInput placeholder="Select date and time" style={{ flex: 1 }} />
          <TouchableOpacity>
            <FontAwesome name="calendar-check-o" size={18} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 2,
              flex: 1,
            }}
          >
            Color
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 2,
              marginRight: 30,
            }}
          >
            Report type
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={style.inputContainer2}>
            <TextInput placeholder="Select color" style={{ flex: 1 }} />
            <TouchableOpacity>
              <FontAwesome name="caret-down" size={18} />
            </TouchableOpacity>
          </View>
          <View style={style.inputContainer2}>
            <TextInput placeholder="Stolen" style={{ flex: 1 }} />
            <TouchableOpacity>
              <FontAwesome name="caret-down" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: COLORS.black, fontSize: 15, fontWeight: '500', marginBottom: 2 }}>
            Missing location
          </Text>
          <View style={style.inputContainer}>
            <TextInput placeholder="Item type" style={{ flex: 1 }} />
            <TouchableOpacity>
              <FontAwesome name="caret-down" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <CustomButton title="Continue"   onPress={() => {navigation.navigate('Details')}} />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  reportContainer: {
    height: 42,
    width: '100%',
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 18,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#5211',
    marginBottom: 10,
  },
  infoContainer: {
    height: 70,
    borderRadius: 18,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#5211',
  },
  inputContainer2: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 18,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: '#5211',
    width: '45%',
    marginBottom: 10,
  },
});

export default CreateReport;