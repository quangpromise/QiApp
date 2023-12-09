import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import { formattedCurrency } from "../ultis/formattedCurrency";
import { useState, useRef } from "react";
import { isEmail, isNotEmpty, hasMinLength } from '../ultis/validate'
import { cartAction } from "../store/slice";
import CheckoutSuccess from "./CheckoutSuccess";
import { useRouter } from "next/router";

function Checkout() {
    //tao du lieu xac nhan check out thanh cong
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    //dung selecter lay du lieu items va totalAmount tu store
    const { items, totalAmount } = useSelector(state => state.cart);
    //dung dispatch lay function clearCart tu store
    const dispatch = useDispatch()

    //dung router dieu huong khi checkout thanh cong
    const router = useRouter()

    //tao cac truong input
    const [enteredFullName, setEnteredFullname] = useState('') 
    const [enteredEmail, setEnteredEmail] = useState('') 
    const [enteredAddress, setEnteredAddress] = useState('') 
    const [enteredPhone, setEnteredPhone] = useState('') 

    //tao ref lay du lieu input
    const fullnameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef()

    //tao cac function onchange khi thay doi input
    const handleOnchangeFullname = () => {
        setEnteredFullname(fullnameRef.current.value)
    }

    const handleOnchangeEmail = () => {
        setEnteredEmail(emailRef.current.value)
    }

    const handleOnchangeAddress = () => {
        setEnteredAddress(addressRef.current.value)
    }

    const handleOnchangePhone = () => {
        setEnteredPhone(phoneRef.current.value)
    }

    //tao cac truong valid hien thi thong bao loi
    const [fullnameInValid, setFullNameInValid] = useState(false)
    const [emailInValid , setEmailInValid] = useState(false)
    const [addressInValid , setAddressInValid] = useState(false)
    const [phoneInValid, setPhoneInValid] = useState(false)

    // tao ham khi click nut place order 
    const handleCheckout = (e) => {
        e.preventDefault()
        let isValidate = true;
        //validate kiem tra loi khi input
        if (!isNotEmpty(enteredFullName)) {
            setFullNameInValid(true);
            isValidate = false;
            return
        } else {
            setFullNameInValid(false)
        }

        if (!isNotEmpty(enteredEmail) || !isEmail(enteredEmail) ) {
            setEmailInValid(true);
            isValidate = false;
            return
        } else {
            setEmailInValid(false)
        }

        
        if (!isNotEmpty(enteredPhone) || !hasMinLength(enteredPhone, 9) ) {
            setPhoneInValid(true);
            isValidate = false;
        } else {
            setPhoneInValid(false)
        }

        if (!isNotEmpty(enteredAddress)) {
            setAddressInValid(true);
            isValidate = false;
            return
        } else {
            setAddressInValid(false)
        }

        //action khi validate thanh cong
        if (isValidate) {
            setCheckoutSuccess(true)
            setTimeout(() => {
                router.push('/shop')
                setCheckoutSuccess(false)
                e.target.reset()
                dispatch(cartAction.clearCart())
            },2000)
        }        
    }
    
    return (
        <>
            {/* neu check out thanh cong thi hien thi man hinh success */}
            {checkoutSuccess ? <CheckoutSuccess /> :          
                // hien thi check out screen
            <div className="w-2/3 mx-auto grid grid-flow-row gap-6 max-lg:w-full">
                <div className="max-sm:py-20 max-sm:pb-10 bg-gray-100 px-20 flex flex-row justify-between pt-28 pb-16 uppercase">
                    <p className="text-4xl max-md:text-lg max-md:font-bold max-sm:px-10 max-sm:-ml-20">Checkout</p>
                    <div className="text-xl uppercase flex gap-3 max-md:text-xs">
                        <Link href='/' className="hover:opacity-70">Home</Link>
                        <span>/</span>
                        <Link className="hover:opacity-70" href='/cart'>Cart</Link>
                        <span>/</span>
                        <p className="opacity-50">Checkout</p>
                    </div>
                </div>
                <div className="grid grid-flow-row gap-y-4 mt-4 max-lg:px-4 max-md:w-full">
                        <h1 className="uppercase text-2xl mb-3">Billing Details</h1>
                        
                    <div className="flex flex-row gap-6 max-md:flex-col ">
                        <form onSubmit={handleCheckout} className="w-2/3 max-md:w-full">
                            <div className="grid grid-flow-row gap-4 text-sm ">
                                <div className="flex flex-col gap-2">
                                    <label className="opacity-60 ">FULL NAME:</label>
                                    <input className="border-2 border-gray-200 py-3 pl-4"
                                        placeholder="Enter Your Full Name Here!"
                                        type='text'
                                        id='full-name'
                                        name='full-name'
                                        ref={fullnameRef}
                                        onChange={handleOnchangeFullname}
                                        />
                                        {/* //hien thi thong bao loi khi input khong hop le */}
                                    {fullnameInValid && <p className="text-red-600 mt-2">Please input a valid full name</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="opacity-60">EMAIL:</label>
                                    <input className="border-2 border-gray-200 py-3 pl-4"
                                        placeholder="Enter Your Email Here!"
                                        id='email'
                                        type='email'
                                        name='email'
                                        ref={emailRef}
                                        onChange={handleOnchangeEmail}
                                        />

                                        {/* //hien thi thong bao loi khi input khong hop le */}                                      
                                    {emailInValid && <p className="text-red-600 mt-2">Please input a valid email</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="opacity-60">PHONE NUMBER:</label>
                                    <input className="border-2 border-gray-200 py-3 pl-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="Enter Your Phone Number Here!"
                                        type='number'
                                        id='phone'
                                        name='phone'
                                        ref={phoneRef}
                                        onChange={handleOnchangePhone}
                                        />

                                        {/* //hien thi thong bao loi khi input khong hop le */}              
                                    {phoneInValid && <p className="text-red-600 mt-2">The phone should be more than 9 number</p>}
                                    
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="opacity-60">ADDRESS:</label>
                                    <input className="border-2 border-gray-200 py-3 pl-4"
                                        placeholder="Enter Your Your Address Here!"
                                        
                                        id='address'
                                        type='address'
                                        name='address'
                                        ref={addressRef}
                                        onChange={handleOnchangeAddress}
                                        />
                                        {/* //hien thi thong bao loi khi input khong hop le */}                                       
                                    {addressInValid && <p className="text-red-600 mt-2">Please input a valid address</p>}
                                </div>
                            </div>
                            
                                <button className="max-md:w-1/3 uppercase text-sm bg-gray-700 text-white cursor-pointer hover:bg-opacity-80 p-2 text-center w-1/5 mt-6">Place order</button>
                      
                        </form>
                        <div className=" bg-gray-100 p-5 w-1/3 max-md:w-full">
                                <h2 className="uppercase text-2xl mb-4">Your order</h2>
                                {/* hien thi danh sach item order, neu khong thi hien thi item not found */}
                            {items && items.length > 0 ?
                                items.map(item => (
                                    <CheckoutItem item={{ id: item.id, name: item.name, quantity: item.quantity, price: item.price }} key={item.id}>
                                    </CheckoutItem>
                                ))
                                :
                                (<div className="text-center text-red-600 py-6">Item not found!</div>)
                            
                            }
                            <div className="flex flex-row justify-between text-lg py-4">
                                <h3 className="uppercase">Total</h3>
                                <p className="text-gray-700">{formattedCurrency.format(totalAmount)} VND</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            }
        </>
    );
}

export default Checkout;