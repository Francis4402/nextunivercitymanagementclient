import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import { baseApi } from "./api/baseApi"
// import storage from "./storage"
// import { persistReducer } from "redux-persist"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from 'redux-persist'
import storage from "./storage"


const persistOptions = {
    key: "auth",
    storage,
}

const persistedAuth = persistReducer(persistOptions, authReducer);

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: persistedAuth,
            [baseApi.reducerPath]: baseApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(baseApi.middleware),
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']