import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../component/CustomButton';
import BottomSheet from '../component/BottomSheet';
import ImagePicker from 'react-native-image-crop-picker';
import FoundReport from './FoundReport';

const FoundDetail = () => {
  const DATA = [
    { id: 1, name: 'Item Name' },
    { id: 1, name: 'Date Found' },
    { id: 1, name: 'PickUp Place' },
    { id: 1, name: 'Location Found' },
    { id: 1, name: 'Description' },
    { id: 1, name: 'Color' },
    { id: 1, name: 'Item Type' },
  ];

  const [data, setData] = useState(DATA);

  const [img, setImg] = useState('');
  const [visible, setVisible] = useState(false);
  const [localFile, setLocalFile] = useState(null);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [uploadSucceeded, setUploadSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    item_name: '',
    date_found: '',
    pickup_location: '',
    discovery_location: '',
    description: '',
    item_color: '',
    item_type: '',
  });

  const [showBottomSheet, setShowBottomSheet] = React.useState(false);

  const hide = () => {
    setShowBottomSheet(false);
  };

  const photoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
    }).then((img) => {
      console.log(img.path);
      setImg(img.path);
    });
  };

  const photoFromGalary = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((img) => {
      console.log(img.path);
      setImg(img.path);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 20, marginTop: 25 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>{item.name}</Text>
      </View>
    );
  };

  headerComponent = () => {
    return (
      <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 17, fontWeight: 'bold' }}>
        Details
      </Text>
    );
  };

  const handleChange = (evnt) => {
    const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value });
    setFormInput(newInput);
  };

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    const checkEmptyInput = !Object.values(formInput).every((res) => res === '');
    if (checkEmptyInput) {
      const newData = (data) => [...data, formInput];
      setDetailsData(newData);
      dispatch(
        lostItem(
          item_name,
          item_worth,
          lost_date,
          lost_location,
          description,
          report_type,
          item_color,
          item_type
        )
      )
        .then((res) => {
          console.log(res);
          setFormInput(emptyInput);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <BottomSheet show={showBottomSheet} height={220} onOuterClick={hide}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={hide} style={styles.bottomSheetCloseButton}>
            <View style={{ width: 30, borderWidth: 1, color: COLORS.gray, marginTop: -25 }}></View>
          </TouchableOpacity>
          <Text style={{ marginVertical: -15, fontWeight: '600' }}>
            Choose your profile picture
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.imagePickerBtn} onPress={photoFromCamera}>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 14,
                color: COLORS.white,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Choose from camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imagePickerBtn} onPress={photoFromGalary}>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 14,
                color: COLORS.white,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Choose from galary
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 40,
          marginHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            setShowBottomSheet(true);
          }}
        >
          <FontAwesome name="camera" size={30} color={COLORS.gray} />
          <Text>Attach image</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            ListHeaderComponent={headerComponent}
            keyExtractor={(DATA) => DATA.id}
          />
        </View>
        <CustomButton title="Save report" handleSubmit={handleSubmit} handleChange={handleChange} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: 20,
  },
  inputContainer: {
    height: 380,
    width: '90%',
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    elevation: 20,
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
  imagePickerBtn: {
    height: 40,
    width: '70%',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemDetails: {
    padding: 15,
  },
  txt_item: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default FoundDetail;
