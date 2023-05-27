import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../component/CustomBotton';

const SubscriptionScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          marginHorizontal: 15,
        }}
      >
        <View style={style.container}>
          <View style={{ marginBottom: 10 }}>
            <View style={{ marginHorizontal: 15 }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  fontWeight: '700',
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                Tiiza minor promo
              </Text>
              <Text style={{ color: COLORS.white, fontSize: 12, marginTop: 3, fontWeight: '700' }}>
                Search item worth N1,000 - N10,000 within 2weeks
              </Text>
              <Text style={{ color: COLORS.white, fontWeight: '700', fontSize: 17, marginTop: 10 }}>
                Free
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  Tiiza community search
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  Limited to your state
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  No extension of days if the item is not found within 2weeks
                </Text>
              </View>
            </View>
            <View style={style.btn}>
              <Text style={{ color: COLORS.white, fontWeight: '700' }}>Subscribe</Text>
            </View>
          </View>
        </View>
        <View style={style.container}>
          <View style={{ marginBottom: 20 }}>
            <View style={{ marginHorizontal: 15 }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  fontWeight: '700',
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                Tiiza Real promo
              </Text>
              <Text style={{ color: COLORS.white, fontSize: 12, marginTop: 3, fontWeight: '700' }}>
                Search item worth N10,000 - N100,000 within a month
              </Text>
              <Text style={{ color: COLORS.white, fontWeight: '700', fontSize: 17, marginTop: 10 }}>
                N2,500
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  Tiiza community search
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  Not limited to state state
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  Extension of 1 week if the item is not found within 2weeks
                </Text>
              </View>
            </View>
            <View style={style.btn}>
              <Text style={{ color: COLORS.white, fontWeight: '700' }}>Subscribe</Text>
            </View>
          </View>
        </View>
        <View style={style.container1}>
          <View style={{ marginTop: 10 }}>
            <View style={{ marginHorizontal: 15 }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                Tiiza Real plus promo
              </Text>
              <Text style={{ color: COLORS.white, fontSize: 12, marginTop: 3, fontWeight: '700' }}>
                Search item worth N10,000 - N100,000 within 2weeks
              </Text>
              <Text style={{ color: COLORS.white, fontWeight: '700', fontSize: 17, marginTop: 10 }}>
                N5,000
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  Tiiza community search
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  Not limited to your state
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  Contact search
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  General search
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <FontAwesome name="check" color={COLORS.white} />
                <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                  No extension of days if the item is not found
                </Text>
              </View>
            </View>
            <View style={style.btn}>
              <Text style={{ color: COLORS.white, fontWeight: '700' }}>Subscribe</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <View style={style.container2}>
            <View style={{ marginTop: 10 }}>
              <View style={{ marginHorizontal: 15 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.white,
                    fontWeight: '700',
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Tiiza Lite promo
                </Text>
                <Text
                  style={{ color: COLORS.white, fontSize: 12, marginTop: 3, fontWeight: '700' }}
                >
                  Search item worth N101,000 - N 1m within 2weeks
                </Text>
                <Text
                  style={{ color: COLORS.white, fontWeight: '700', fontSize: 17, marginTop: 10 }}
                >
                  N25,000
                </Text>
                <View style={{ flexDirection: 'row', marginTo: 10 }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Tiiza community search
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Not limited to your state
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Cntact search
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    General search
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Life search
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    No extension of days if the item is not found
                  </Text>
                </View>
              </View>
              <View style={style.btn}>
                <Text style={{ color: COLORS.white, fontWeight: '700' }}>Subscribe</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 50 }}>
          <View style={style.container2}>
            <View style={{ marginTop: 20 }}>
              <View style={{ marginHorizontal: 15 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.white,
                    fontWeight: '700',
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Tiiza Lite plus promo
                </Text>
                <Text
                  style={{ color: COLORS.white, fontSize: 12, marginTop: 3, fontWeight: '700' }}
                >
                  Search item worth N101,000 - N 1M within 2weeks
                </Text>
                <Text
                  style={{ color: COLORS.white, fontWeight: '700', fontSize: 17, marginTop: 10 }}
                >
                  N50,000
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Tiiza community search
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Not limited to your state
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Contact search
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    General search
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Life search
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <FontAwesome name="check" color={COLORS.white} />
                  <Text style={{ marginLeft: 10, color: COLORS.white, fontSize: 12 }}>
                    Extension of 1week if the item is not found within 2weeks
                  </Text>
                </View>
              </View>
              <View style={style.btn}>
                <Text style={{ color: COLORS.white, fontWeight: '700' }}>Subscribe</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: 201,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    width: '100%',
    marginTop: 15,
  },
  btn: {
    height: 35,
    backgroundColor: COLORS.primary,
    width: '100%',
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    height: 220,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    width: '100%',
    marginTop: 15,
  },
  container2: {
    height: 240,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    width: '100%',
    marginTop: 20,
  },
});

export default SubscriptionScreen;
