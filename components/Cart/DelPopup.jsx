import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/slice";
import { UIAction } from "../store/ui";

function DelPopup({ isClose }) {
    //dung dispatch de hien thi pop up va delete action
    const dispatch = useDispatch()
    //lay id da chon tu store
    const { id } = useSelector(state => state.id)

    //tao ham delete de xoa item
    const handleDeleteItem = () => {
        dispatch(cartAction.deleteItem(id))
        dispatch(UIAction.hidePopup())
    }
    return (
    <>
            {/* tao delpop up */}
            <div className="bg-black w-full h-full z-20 fixed opacity-50">
        </div>
            <div className="z-30  max-lg:-left-32 max-lg:w-2/3 max-md:w-2/3 max-md:-left-44 fixed w-2/5 top-32 flex-col left-40  ml-64 p-10 bg-white rounded border-2 border-gray-500">
                <h1 className="mb-8 text-black font-bold text-center">Are you sure to delete this item?</h1>
                <div className="flex mx-auto justify-around">
                    <button onClick={isClose} className="hover:opacity-50">Close</button>
                    <button onClick={handleDeleteItem}  className="bg-red-600 rounded border-none py-1 px-3 text-white hover:bg-red-300">Delete</button>
                </div>
                </div>
    </>
    
    )
}

export default DelPopup;