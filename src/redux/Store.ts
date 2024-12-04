// import {configureStore} from '@reduxjs/toolkit';
// import authReducer from './auth/AuthSlice';
// import cartReducer from './cart/CartSlice';
//
// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         cart: cartReducer,
//     },
// });
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
//
// export default store;

import {configureStore, combineReducers} from "@reduxjs/toolkit";
import authReducer from './auth/AuthSlice';
import cartReducer from './cart/CartSlice';
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({auth: authReducer, cart: cartReducer});

const persistConfig = {
    key: "root",
    storage: storage,
    version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
