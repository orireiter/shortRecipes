import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';


export interface authState {
  isAuthenticated: boolean | null;
}


const initialState: authState = {
  isAuthenticated: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
    unAuthenticate: (state) => {
      state.isAuthenticated = false;
  },
  }
});

export const { authenticate, unAuthenticate } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;