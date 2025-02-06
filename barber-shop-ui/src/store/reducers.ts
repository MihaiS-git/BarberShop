import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, PersistConfig } from "redux-persist";

import storage from "redux-persist/lib/storage";

import cartReducer from "./cart-slice";
import appointmentsReducer from './appointment-slice'

const rootReducer = combineReducers({
  cart: cartReducer,
  appointments: appointmentsReducer
});

type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["cart", "appointments"],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export default persistedReducer;
