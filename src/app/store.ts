import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import generalSettingsReducer from '../slices/generalSettingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    generalSettings: generalSettingsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
