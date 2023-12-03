import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    user: null,
    userInfo: {
      name: '',
      email: '',
      phone: '',
      photo: '',
      gender: '',
      born_date: '',
      location: {},
      skills: [],
    },
    isLoading: true,
    isSignout: false,
  };

  export const UserKey = 'user';

const loginUser = async (action: any) => {
  await AsyncStorage.setItem(UserKey, JSON.stringify(action));
};

let state: any = {};

export const isSignedIn = () => {
  AsyncStorage.getItem(UserKey)
    .then(res => {
      if (res !== null) {
        state = res;
      } else {
        state = initialState;
      }
    })
    .catch(err => console.log(err));
};

state = state || initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    restoreToken: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = {...state.userInfo, ...action.payload};
    },
    signin: (state, action) => {
      state.isSignout = false;
      state.user = action.payload;
      loginUser(action.payload);
    },
    signout: state => {
      state.isSignout = true;
      state.user = null;
    },
  },
});

export const {restoreToken, saveUserInfo, signin, signout} = authSlice.actions;
export default authSlice.reducer;