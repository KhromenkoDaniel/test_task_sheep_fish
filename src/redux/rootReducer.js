import { combineReducers } from '@reduxjs/toolkit';
import productSlice from './productSlice';

const rootReducer = combineReducers({
    products: productSlice,
});

export default rootReducer;
