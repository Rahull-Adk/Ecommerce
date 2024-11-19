import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../counter/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Export AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;
