import { createSlice } from "@reduxjs/toolkit";

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

