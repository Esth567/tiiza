import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../constant/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({ label, iconName, error, password, onFocus = () => {}, ...props }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{ marginBottom: 15 }}>
      <View
        style={[
          style.inputContainer,
          { borderColor: error ? COLORS.red : isFocused ? COLORS.primary : COLORS.gray },
        ]}
      >
        <Icon name={iconName} style={{ fontSize: 15, color: COLORS.primary }} />
        <TextInput
          secureTextEntry={hidePassword}
          isPassword={true}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{ color: COLORS.black, flex: 1, fontSize: 15 }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 21, color: COLORS.primary }}
            name={hidePassword ? 'eye' : 'eye-slash'}
          />
        )}
      </View>
      {error && <Text style={{ color: COLORS.red, ...FONTS.body4, marginTop: 5 }}>{error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    height: 45,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default Input;
