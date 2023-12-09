import { createSlice } from "@reduxjs/toolkit";

//tao ui slice de set trang thai show/hide popup
export const UISlice = createSlice({
    name: 'ui',
    initialState: {
        show: false,
    },
    reducers: {
        showPopup(state) {
            state.show = true
        },
        hidePopup(state) {
            state.show = false
        }
    }
})

export const UIAction = UISlice.actions;

