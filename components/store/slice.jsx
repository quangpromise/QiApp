import { createSlice } from "@reduxjs/toolkit";
import { saveToStorage,getFromStorage } from "../ultis/validate";

//tao slice du lieu de import products
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

//tao slice de import du lieu tu product da chon den detail
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

//tao slice de import du lieu den cart secton
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: getFromStorage('items') ? getFromStorage('items') : [], // lay du lieu tu localstorage
        totalQuantity: getFromStorage('totalQuantity') ? getFromStorage('totalQuantity') : 0, // lay du lieu tu localstorage
        totalAmount: getFromStorage('totalAmount') ? getFromStorage('totalAmount') : 0, // lay du lieu tu localstorage
    },
    reducers: {

        //tao action them item den cart tai details
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity = state.totalQuantity + newItem.quantity
            //neu item chua ton tai thi push item moi; vao 
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
                //luu du lieu xuong storage
                saveToStorage('items', state.items)
                saveToStorage('totalQuantity', state.totalQuantity)
                saveToStorage('totalAmount', state.totalAmount)
            } else {
                existingItem.quantity = existingItem.quantity + newItem.quantity
                existingItem.totalPrice = existingItem.totalPrice + newItem.totalPrice
                state.totalAmount = state.totalAmount + newItem.totalPrice
                //luu du lieu xuong storage
                saveToStorage('items', state.items)
                saveToStorage('totalQuantity', state.totalQuantity)
                saveToStorage('totalAmount', state.totalAmount)
            }
        },
        //tao action de them item tai cart
        addItems(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            //neu item co id chua chon thi thuc hien action push item do vao
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
                //luu du lieu xuong storage
                saveToStorage('items', state.items)
                saveToStorage('totalQuantity', state.totalQuantity)
                saveToStorage('totalAmount', state.totalAmount)
            //neu item dang ton tai thi thuc hien action them so luong va gia ca
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
                state.totalAmount = state.totalAmount + existingItem.price 
                // luu du lieu xuong storage
                saveToStorage('items', state.items)
                saveToStorage('totalQuantity', state.totalQuantity)
                saveToStorage('totalAmount', state.totalAmount)
            }

        },

        //tao action de giam item tai cart
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            //neu item === 1 thi khi giam se xoa item do
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
                state.totalAmount = state.totalAmount - existingItem.price
                //luu du lieu xuong storage
                saveToStorage('items', state.items)
                saveToStorage('totalQuantity', state.totalQuantity)
                saveToStorage('totalAmount', state.totalAmount)
            //item lon hon 1 thi se giam quantity 1 
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
                state.totalAmount = state.totalAmount - existingItem.price;
                //luu du lieu xuong storage
                saveToStorage('items', state.items)
                saveToStorage('totalQuantity', state.totalQuantity)
                saveToStorage('totalAmount', state.totalAmount)
            }
        },

        //tao action xoa item do khoi cart
        deleteItem(state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id);
            state.items = state.items.filter(item => item.id !== id)
            state.totalQuantity = state.totalQuantity - existingItem.quantity;
            state.totalAmount = state.totalAmount - (existingItem.price * existingItem.quantity)
                //luu du lieu xuong storage
            saveToStorage('items', state.items)
            saveToStorage('totalQuantity', state.totalQuantity)
            saveToStorage('totalAmount', state.totalAmount)
        },
        //tao action clearcart khi checkout hoac log out
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0
                //luu du lieu xuong storage
            localStorage.removeItem('items')
            localStorage.removeItem('totalQuantity')
            localStorage.removeItem('totalAmount')
        }
    }
})


//tao sclice de lay item muon delete
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

//export cac slice de tao action
export const productAction = ProductSlice.actions;
export const detailPopupAction = DetailPopupSlice.actions;
export const cartAction = cartSlice.actions;
export const getIdAction = getIdSlice.actions