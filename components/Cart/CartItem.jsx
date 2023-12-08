import { formattedCurrency } from "../ultis/formattedCurrency";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/slice";
import Image from "next/image";

function CartItem(props ) {
    const { name, quantity, totalPrice, price, id, image } = props.item;

    const isOpen = props.isOpen;

    const dispatch = useDispatch()

    const handleAddItem = () => {
        dispatch(cartAction.addItems({
            id, price, name
        }))
    };

    const handleRemoveItem = () => {
        dispatch(cartAction.removeItem(id))
    }

    return (
        <div className="grid grid-cols-6 uppercase pt-8 text-center text-md py-4">
            <p>
                <img src={image} width={10} height={10} alt="Image" className="w-20 " />
            </p>
            <p className="font-bold text-sm">{name}</p>
            <p className="opacity-60">{formattedCurrency.format(price)} VND</p>
            <p className="flex mx-auto gap-2 mt-3"><IoMdArrowDropleft onClick={handleRemoveItem} className="text-xl cursor-pointer hover:scale-150" /><span className="leading-5">{quantity}</span><IoMdArrowDropright onClick={handleAddItem}  className="text-xl cursor-pointer hover:scale-150" /></p>
            <p className="opacity-60">{formattedCurrency.format(totalPrice)} VND</p>
            <p className="mx-auto"><RiDeleteBin5Line onClick={() => isOpen(id)} className="text-xl cursor-pointer text-red-600 mt-3 hover:text-red-300" /></p>
        </div>
    );
}
export default CartItem