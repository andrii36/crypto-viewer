import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

//const store = createStore(persistedReducer, applyMiddleware(thunk));
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})
const persistor = persistStore(store);

export default { store, persistor };