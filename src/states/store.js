import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './stateSlice';

// Combinar los reducers en un solo objeto
const rootReducer = combineReducers({
  user: userReducer,
});

// Configurar la tienda de Redux
const store = configureStore({
  reducer: rootReducer,
});

export default store;
