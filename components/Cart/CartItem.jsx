import { formattedCurrency } from "../ultis/formattedCurrency";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/slice";
import Link from "next/link";

function CartItem(props) {
    //lay du lieu props tu Cart
    const { name, quantity, totalPrice, price, id, image } = props.item;

    //tao isOpen de xac nhan mo? delte Popup
    const isOpen = props.isOpen;

    //use dispatch de lay id item muon delete
    const dispatch = useDispatch()

    //tao ham de tang item muon them vao
    const handleAddItem = () => {
        dispatch(cartAction.addItems({
            id, price, name
        }))
    };

    //tao ham de giam item 
    const handleRemoveItem = () => {
        dispatch(cartAction.removeItem(id))
    }

    return (

        //hien thi item
        <div className="grid grid-cols-6 uppercase pt-8 text-center text-md py-4 ">
            <Link href={`/detail/${id}`}>
                <img src={image} width={10} height={10} alt="Image" className="w-20 " />
            </Link>
            <p className="font-bold text-sm max-sm:text-xs">{name}</p>
            <p className="opacity-60 max-sm:text-xs">{formattedCurrency.format(price)} VND</p>
            <p className="flex mx-auto gap-2 mt-3 max-sm:gap-0 max-sm:mt-1"><IoMdArrowDropleft onClick={handleRemoveItem}
                className="text-xl cursor-pointer hover:scale-150" />
                <span className="leading-5 max-sm:text-sm max-sm:not-italic">{quantity}</span>
                <IoMdArrowDropright onClick={handleAddItem} className="text-xl cursor-pointer hover:scale-150" />
            </p>
            <p className="opacity-60 max-sm:text-xs">{formattedCurrency.format(totalPrice)} VND</p>
            <p className="mx-auto "><RiDeleteBin5Line onClick={() => isOpen(id)} className="text-xl max-sm:text-sm cursor-pointer text-red-600 mt-3 hover:text-red-300" /></p>
        </div>
    );
}
export default CartItem