import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice, DetailPopupSlice, cartSlice ,getIdSlice} from "./slice";
import { UISlice } from "./ui";

//tao store cac du lieu muon truyen xuong
const store = configureStore({
    reducer: {
        products: ProductSlice.reducer,
        detailPopup: DetailPopupSlice.reducer,
        ui: UISlice.reducer,
        cart: cartSlice.reducer,
        id: getIdSlice.reducer,
    }
})

export default store;