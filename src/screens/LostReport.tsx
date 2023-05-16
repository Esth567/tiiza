import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../constant/theme';
import { Button } from 'react-native';
import CustomButton from '../component/CustomBottom';
import BottomSheet from '../component/BottomSheet';
import DatePicker from 'react-native-date-picker';

const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;

const LostReport = ({navigation}) => {

  const Colors = [
    'red',
    'purple',
    'blue',
    'cyan',
    'green', 
    'yellow',
    'orange',
    'black',
    'white',
    'gray',
  ];


   const category = [
     { label: 'Airpod', value: '1' },
     { label: 'Bag', value: '2' },
     { label: 'Charger', value: '3' },
     { label: 'Cloth', value: '4' },
     { label: 'Document', value: '5' },
     { label: 'Flashdrive', value: '6' },
     { label: 'Headset', value: '7' },
     { label: 'Key', value: '8' },
     { label: 'Laptop', value: '9' },
     { label: 'Monitor', value: '10' },
     { label: 'Phone', value: '11' },
     { label: 'Printer', value: '12' },
     { label: 'Tablet', value: '13' },
     { label: 'Watch', value: '14' },
   ];

  
 

    const worth = [
      { label: 'N1,000-N10,000', value: '1' },
      { label: 'N10,000-N100,000', value: '2' },
      { label: 'N101,000-N1M', value: '2' },
    ];

     const report = [
      { label: 'Stolen', value: '1' },
      { label: 'Missing', value: '2' },
     ];
  
  const [item_name, setItem_name] = useState('');
  const [item_worth, setItem_worth] = useState(worth);
  const [lost_date, setLost_date] = useState('');
  const [lost_location, setLost_location] = useState('');
  const [description, setDescription] = useState('');
  const [report_type, setReport_type] = useState(report);
  const [item_color, setItem_color] = useState(0);
  const [item_type, setItem_type] = useState(category);
 const [date, setDate] = useState(new Date('01-05-2023'));
 const [open, setOpen] = useState(false);

    const [formInput, setFormInput] = useState(false);

    const onsubmit = () => {
      alert(
        '${item_name} ${item_worth} ${lost_date} ${lost_location} ${description} ${report_type} ${item_color} ${item_type}'
      );
    };

    useEffect(() => {
      setFormInput(
        item_name &&
          item_worth &&
          lost_date &&
          lost_location &&
          description &&
          report_type &&
          item_color &&
          item_type
      );

      return () => {
        setFormInput(false);
      };
    }, [
      item_name,
      item_worth,
      lost_date,
      lost_location,
      description,
      report_type,
      item_color,
      item_type,
    ]);

 

     const [showBottomSheet, setShowBottomSheet] = React.useState(false);

     const hide = () => {
       setShowBottomSheet(false);
     };

      
  return (
    <View style={styles.container}>
      <BottomSheet show={showBottomSheet} height={290} onOuterClick={hide}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={hide} style={styles.bottomSheetCloseButton}>
            <View style={{ width: 30, borderWidth: 1, color: COLORS.gray, marginTop: -25 }}></View>
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', marginBottom: 20, fontSize: 15 }}>
            Select item color
          </Text>
          <View style={styles.group}>
            {Colors.map((color, index) => {
              const isActive = item_color === index;

              return (
                <View key={color}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setItem_color(index);
                    }}
                  >
                    <View style={[styles.circle, isActive && { borderColor: color }]}>
                      <View style={[styles.circleInside, { backgroundColor: color }]} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
          <CustomButton title="Confirm" onPress={hide} />
        </View>
      </BottomSheet>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          marginHorizontal: 15,
          marginTop: 20,
        }}
      >
        <Text style={{ marginBottom: 18, fontWeight: '600', fontSize: 15 }}>
          Fill in the details about the item
        </Text>
        <View>
          <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 15 }}>Category</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={category}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item type"
            searchPlaceholder="Search..."
            item_type={item_type}
            onChange={(item) => {
              setItem_type(item.item_type);
            }}
          />
        </View>
        <View>
          <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 15 }}>Item name</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Name of the item"
            onChangeText={(item_name) => setItem_name(item_name)}
          />
        </View>
        <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 15 }}>Item worth</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          data={worth}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          item_worth={item_worth}
          onChange={(item) => {
            setItem_worth(item.item_worth);
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 15, flex: 1 }}>Report Type</Text>
          <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 15, marginRight: 30 }}>
            Color
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Dropdown
            style={styles.dropdown2}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={report}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            report_type={report_type}
            onChange={(item) => {
              setReport_type(item.report_type);
            }}
          />
          <TouchableOpacity
            style={[styles.colorBox, { backgroundColor: Colors[item_color] }]}
            onPress={() => {
              setShowBottomSheet(true);
            }}
          ></TouchableOpacity>
        </View>
        <View>
          <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 15 }}>
            Lost date and time
          </Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <TextInput
              style={styles.input}
              placeholder="DD-MM-YYYY"
              value={lost_date}
              onChangeText={setLost_date}
              placeholderTextColor="#11182744"
              editable={false}
            />
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            date={date}
            mode="datetime"
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View>
          <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 15 }}>Lost location</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="City/State"
            onChangeText={(lost_location) => setLost_location(lost_location)}
          />
        </View>
        <View>
          <Text style={{ marginBottom: 5, fontWeight: '600', fontSize: 15 }}>
            Additional information
          </Text>
          <TextInput
            style={styles.infoContainer}
            placeholder="Type..."
            onChangeText={(description) => setDescription(description)}
          />
        </View>
        <View style={{ marginBottom: 70 }}>
          <CustomButton
            title="Continue"
            onsubmit={onsubmit}
            onPress={() => navigation.navigate('Details')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LostReport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  dropdown2: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    width: '40%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemContainer: {
    height: 50,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: 'center',
  },
  inputContainer: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '400',
  },
  infoContainer: {
    height: 70,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 40,
    fontSize: 16,
    fontWeight: '400',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  colorBox: {
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    width: '20%',
    marginLeft: 130,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  bottomSheetContent: {
    padding: 40,
    alignItems: 'center',
  },
  bottomSheetText: {
    fontSize: 24,
    marginBottom: 80,
  },
  bottomSheetCloseButton: {
    backgroundColor: '',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    marginVertical: -10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
    backgroundColor: COLORS.gray,
    marginBottom: 20,
  },
  circle: {
    borderRadius: 9999,
    marginRight: 8,
    borderWidth: CIRCLE_RING_SIZE,
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    marginBottom: 12,
    borderColor: 'transparent',
  },
  circleInside: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: 'absolute',
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
