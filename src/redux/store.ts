import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "./api/baseApi"

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'



// const persistOptions = {
//     key: "auth",
//     storage,
// }

// const persistedAuth = persistReducer(persistOptions, authReducer);

export const makeStore = () => {
    return configureStore({
        reducer: {

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