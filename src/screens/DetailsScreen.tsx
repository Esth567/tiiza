import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../component/CustomBottom';
import BottomSheet from '../component/BottomSheet';
import ImagePicker from 'react-native-image-crop-picker';

const Details = () => {

    const [img, setImg] = useState('');

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



  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <BottomSheet show={showBottomSheet} height={220} onOuterClick={hide}>
        <View style={style.bottomSheetContent}>
          <TouchableOpacity onPress={hide} style={style.bottomSheetCloseButton}>
            <View style={{width: 30, borderWidth: 1, color: COLORS.gray, marginTop: -25}}></View>
          </TouchableOpacity>
          <Text style={{ marginVertical: -15, fontWeight: '600' }}>Choose your profile picture</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={style.imagePickerBtn} onPress={photoFromCamera}>
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
          <TouchableOpacity style={style.imagePickerBtn} onPress={photoFromGalary}>
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
          paddingTop: 20,
          marginHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={style.imageContainer}
          onPress={() => {
            setShowBottomSheet(true);
          }}
        >
          <FontAwesome name="camera" size={30} color={COLORS.gray} />
          <Text>Attach image</Text>
        </TouchableOpacity>
        <View style={style.inputContainer}>
          <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 15, marginTop: 10}}>Details</Text>
          <CustomButton title="Save report" />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  imageContainer: {
    height: 150,
    width: 150,
    borderRadius: 100,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: 500,
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: COLORS.white,
    marginTop: 20,
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
    width: '90%',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Details;
