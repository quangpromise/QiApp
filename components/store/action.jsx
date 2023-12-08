import { productAction , detailPopupAction, getIdAction } from "./slice";
const URL = 'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

export const fetchProduct = () => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch(URL)

            if (!res.ok) {
                throw new Error ('Fetch is failed')
            };

            const data = await res.json();
            return data
        }
        try {
            const dataProduct = await sendRequest()
            dispatch(productAction.importProduct({
                products: dataProduct
            }))
        } catch (error) {
            return error.message
        }
    }
}

export const setDetailPopup = (product) => dispatch => {
    dispatch(detailPopupAction.importDetailPopup({
        detailPopup: product || null 
    }))
}

export const setIdDelete = (id) => dispatch => {
    dispatch(getIdAction.importId({
        id: id  || null
    }))
}