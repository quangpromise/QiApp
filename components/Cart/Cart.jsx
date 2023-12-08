import { FaGift } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import DelPopup from "./DelPopup";
import { setIdDelete } from "../store/action";
import { UIAction } from "../store/ui";
import { formattedCurrency } from "../ultis/formattedCurrency";



function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.items)
    const {show} = useSelector(state => state.ui)
    const { totalAmount } = useSelector(state => state.cart)
    const handleDeletePopup = (id) => {
        dispatch(setIdDelete(id))
        dispatch(UIAction.showPopup())
    }

    const handleClosePopup = () => {
        dispatch(UIAction.hidePopup());
    }

    return (
        <>
        {show && <DelPopup isClose={handleClosePopup}  />}
        <div className="w-2/3 mx-auto grid grid-flow-row gap-6 max-lg:w-full">
                <div className="bg-gray-100 px-20 flex flex-row justify-between pt-28 pb-16 uppercase">
                    <p className="text-4xl">Cart</p>
                    <p className="text-xl opacity-50">Cart</p>
            </div>
            <div className="grid grid-flow-row gap-y-4 mt-4">
                <h1 className="uppercase text-2xl max-lg:px-4">Shopping Cart</h1>
                <div className="flex flex-row gap-6 max-md:flex-col max-lg:px-4">
                    <div className="w-2/3 max-md:w-full">
                        <div className="grid grid-cols-6 uppercase  bg-gray-100 text-center text-md py-4">
                            <h2>Image</h2>
                            <h2>Product</h2>
                            <h2>Price</h2>
                            <h2>Quantity</h2>
                            <h2>Total</h2>
                            <h2>Remove</h2>
                        </div>
                        
                        {cart && cart.length > 0? 
                            cart.map(item => (
                                <CartItem isOpen={handleDeletePopup} item={{id:item.id, name:item.name ,quantity:item.quantity ,totalPrice:item.totalPrice,  price:item.price, image:item.image }} key={item.id}>
  
                                </CartItem>
                            ))
                            :
                            (<div className="text-center text-red-600 py-6">No Found Items!</div>)
                            
                        }
                        
                        <div className="bg-gray-100 flex justify-between p-4">
                            <Link href='/shop' className="p-4 cursor-pointer ">
                                <button className="flex leading-4 gap-3 mx-auto hover:text-orange-500"><FaLongArrowAltLeft/><span className=" text-gray-700  hover:text-orange-500">Continue shopping</span></button>
                                </Link>
                                {totalAmount > 0 && 
                            
                            <Link href='/cart/checkout' className="p-3 cursor-pointer border-2 border-gray-700">
                                <button className="flex leading-4 gap-3 mx-auto  hover:text-orange-500"><span className=" text-gray-700  hover:text-orange-500">Proceed to check out</span><FaLongArrowAltRight/></button>
                            </Link>
                            }
                        </div>
                     
                    </div>
                    <div className=" bg-gray-100 p-10 w-1/3 h-96 max-md:w-full">
                        <h2 className="uppercase text-2xl mb-4">Cart Total</h2>
                        <div className="flex flex-row justify-between py-4 border-b-2 border-b-gray-400">
                            <h3 className="uppercase text-md">subtotal</h3>
                            <p className="text-md text-gray-500">{formattedCurrency.format(totalAmount)} VND</p>
                        </div >
                        <div className="flex flex-row justify-between py-4">
                            <h3 className="uppercase text-lg">Total</h3>
                            <p className="text-gray-700 text-lg">{formattedCurrency.format(totalAmount)} VND</p>
                        </div>
                        <div>
                            <input className="border-2 border-gray-200 py-3 pl-2 w-full"
                            placeholder="Enter your counpon"
                            type='text'
                        />
                        </div>
                        <div className="bg-gray-700 text-white cursor-pointer hover:bg-opacity-80 p-3 text-center">
                            <button className="text-lg flex leading-5 gap-3 mx-auto"><FaGift />Apply Counpon</button>
                        <div/>
                     </div>
                    </div>
                </div>
            </div>
        </div>    
            
        </>
    )
}

export default Cart;