import { configureStore} from "@reduxjs/toolkit";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import flashMessageReducer from "../../src/Components/FlashMessage/flashMessageSlice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
}

const persistedReducer = persistCombineReducers(
    persistConfig,
    {
        user: userReducer,
        flashMessage: flashMessageReducer,
        // project: projectReducer,
    }
);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
