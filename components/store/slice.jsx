import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        importProduct(state, action) {
            state.products = action.payload.products
        }
    }
});

export const DetailPopupSlice = createSlice({
    name: 'detailPopup',
    initialState: {
        detailPopup: [],

    },
    reducers: {
        importDetailPopup(state, action) {
            state.detailPopup = action.payload.detailPopup
        }
    }
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {
        updateCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItems(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: +newItem.price,
                    name: newItem.name,
                    image: newItem.image
                })
                state.totalAmount = state.totalAmount + newItem.price
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
                state.totalAmount = state.totalAmount + existingItem.price 
            }

        },
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity = state.totalQuantity + newItem.quantity
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    totalPrice: newItem.totalPrice,
                    name: newItem.name,
                    image: newItem.image
                })
                state.totalAmount = state.totalAmount + newItem.totalPrice
            } else {
                existingItem.quantity = existingItem.quantity + newItem.quantity
                existingItem.totalPrice = existingItem.totalPrice + newItem.totalPrice
                state.totalAmount = state.totalAmount + newItem.totalPrice
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
                state.totalAmount = state.totalAmount - existingItem.price
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
                state.totalAmount = state.totalAmount - existingItem.price
            }
        },
        deleteItem(state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id);
            state.items = state.items.filter(item => item.id !== id)
            state.totalQuantity = state.totalQuantity - existingItem.quantity;
            state.totalAmount = state.totalAmount - (existingItem.price * existingItem.quantity)
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0
        }
    }
})



export const getIdSlice = createSlice({
    name: 'id',
    initialState: {
        id: null
    },
    reducers: {
        importId(state, action) {
            state.id = action.payload.id
        }
    }
})


export const productAction = ProductSlice.actions;
export const detailPopupAction = DetailPopupSlice.actions;
export const cartAction = cartSlice.actions;
export const getIdAction = getIdSlice.actions