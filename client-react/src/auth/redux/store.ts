import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { AuthState } from '../../utils/types';

//key will be auth (in localstorage)
const persistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);

// Config store and add authReducer
const store = configureStore({
  reducer: persistedReducer,
  // devTools: true, //add devtools, but gotta install redux-devtools
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: true,
    serializableCheck: false
  }).concat(thunk)
});

const persistor = persistStore(store);

export {
  store,
  persistor,
}