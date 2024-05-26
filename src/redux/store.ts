import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export type Dispatch = typeof store.dispatch;
const useDispatch = useAppDispatch.withTypes<Dispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
