import AsyncStorage from "@react-native-async-storage/async-storage";

export default function authHeader() {
  const user = AsyncStorage.getItem('user');

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
 