import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';


export interface generalSettingsState {
  isNavbarOpen: Boolean;
  isLoading: Boolean;
  isMobile: Boolean
}


const initialState: generalSettingsState = {
  isNavbarOpen: false,
  isLoading: false,
  isMobile: false,
};

export const generalSettingsSlice = createSlice({
  name: 'generalSettings',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openCloseNavbar: (state) => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    closeNavbar: (state) => {
      state.isNavbarOpen = false;
    },
    openCloseLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    closeLoading: (state) => {
      state.isLoading = false;
    },
    openLoading: (state) => {
      state.isLoading = true;
    },
    changeIsMobileState: (state) => {
      state.isMobile = !state.isMobile;
    }
  }
});

export const { 
  openCloseNavbar, 
  closeNavbar, 
  openCloseLoading, 
  closeLoading,
  openLoading,
  changeIsMobileState } = generalSettingsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGeneralSettings = (state: RootState) => state.generalSettings;
export default generalSettingsSlice.reducer;