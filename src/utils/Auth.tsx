import axios from "axios";

export const forgetPassword = async email => {
  try {
    const {data} = await client.post('/user/forgot-password',{email});
    return{date};
  } catch (error) {
    return catchError(error);
  }
};

export const VerifyEmail = async (otp, userId) => {
  try {
    const { data } = await axios.post('http://192.168.43.95:5000/api/customer/validate-otp', {
      otp,
      userId,
    });
    return{date};
  } catch (error) {
    return catchError(error);
  }
};