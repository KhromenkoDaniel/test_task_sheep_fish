import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        return await fetch('https://fakestoreapi.com/products').then((res) => res.json());
    } catch (error) {
        console.error(error);
    }
});
export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async () => {
    try {
        return await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5').then((res) => res.json());
    } catch (error) {
        console.error(error);
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        changeCurrency: {
            toggle: false,
            currency: {},
        },
    },
    reducers: {
        addProduct: (state, action) => {
            state.items.push(action.payload);
        },
        deleteProduct: (state) => {
            state.items.pop();
        },
        changeCurrency: (state) => {
            state.changeCurrency.toggle = !state.changeCurrency.toggle;
        },
        addItemsFromStorage: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCurrency.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.changeCurrency.currency = action.payload;
            })
            .addCase(fetchCurrency.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addProduct , deleteProduct , changeCurrency, addItemsFromStorage} = productSlice.actions;

export default productSlice.reducer;
