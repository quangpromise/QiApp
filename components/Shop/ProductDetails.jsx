import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/action";
import { formattedCurrency } from "../ultis/formattedCurrency";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import Link from "next/link";
import { cartAction } from "../store/slice";


function ProductDetail() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { productId } = router.query
    const { products } = useSelector(state => state.products)
    const [enteredAmount, setEnteredAmount] = useState(1)
    const amountRef = useRef()

    useEffect(() => {
        dispatch(fetchProduct())
    },[dispatch])
    const productDetail = products.find(product => product._id.$oid === productId)
    const relatedProduct = products.filter(product => product.category === productDetail.category && product._id.$oid !== productId)
    const onchangeAmountHandle = () => {
        setEnteredAmount(amountRef)
    }

    const handleIncrement = () => {
        setEnteredAmount(prevAmount => prevAmount+ 1)
    }
    const handleDecrement = () => {
        if (enteredAmount < 2) {
            return;
        } else {
            setEnteredAmount(prevAmount => prevAmount - 1)
        }
    }
    const handleAddToCart = () => {
        dispatch(cartAction.addToCart({
            id: productDetail._id.$oid,
            price: +productDetail.price,
            name: productDetail.name,
            totalPrice: +productDetail.price * enteredAmount,
            quantity: enteredAmount,
            image: productDetail.img1
        }))
    }
    return (
        <>
            {productDetail &&
                <div className="w-2/3 mx-auto pt-32 pb-10 grid gap-10 max-lg:w-full">
                    <div className="flex gap-6 max-lg:flex-col ">
                        <div className="flex w-1/2 max-lg:w-full max-lg:px-4">
                            <div className="w-1/5 animate-wave-ping">
                                <img src={productDetail.img2} alt='image'/>
                                <img src={productDetail.img3} alt='image'/>
                                <img src={productDetail.img4} alt='image'/>
                                <img src={productDetail.img1} alt='image'/>
                            </div>
                            <div className="w-4/5 animate-wave-ping">
                                <img src={productDetail.img1} alt='image'/>
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-y-6 max-lg:w-full max-lg:px-4 ">
                            <h1 className="text-4xl max-md:text-lg max-md:font-bold">
                                {productDetail.name}
                            </h1>
                            <h3 className="opacity-60 text-xl max-md:text-sm">{formattedCurrency.format(productDetail.price)} VND</h3>
                            <p className="opacity-60 max-md:text-sm">{productDetail.short_desc}</p>
                            <p><span className="uppercase font-bold">Category: </span><span className="opacity-60">{productDetail.category}</span></p>
                            <div className="flex">
                                <div className="flex border-2 border-gray-200  py-1.5">
                                    <p className="pl-2 opacity-60">QUANTITY</p>
                                    <span className="text-xl not-italic flex pl-2">
                                        <IoMdArrowDropleft onClick={handleDecrement} className="text-2xl cursor-pointer hover:scale-150" />
                                        <input className="not-italic text-md leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center "
                                            type="number"
                                            min='1'
                                            max='99'
                                            ref={amountRef}
                                            disabled
                                            value={enteredAmount}
                                            onChange={onchangeAmountHandle}
                                        />
                                        <IoMdArrowDropright onClick={handleIncrement} className="text-2xl cursor-pointer hover:scale-150" />
                                    </span></div><span>
                                    <button onClick={handleAddToCart} className='py-2 bg-gray-700 text-white text-center cursor-pointer hover:bg-opacity-80 px-3 w-full'>Add to cart</button></span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full max-md:px-4 max-lg:px-4">
                        <h1 className="uppercase text-white bg-gray-700 text-center py-2 w-1/3"> Description</h1>
                        <h2 className="uppercase text-xl">Product descripton</h2>
                        <div className="opacity-60 max-md:text-sm">{productDetail.long_desc.split("\n").map((des, i) => (
<p key={i}>{des}</p>
))}</div>
                    </div>
                    <div className=" flex flex-col gap-y-4 ">
                        <h2 className="uppercase text-xl">Related Products</h2>
                        <div className="flex flex-row gap-4">
                        {relatedProduct.map(related => (
                            <Link href={`/detail/${related._id.$oid}`} key={related._id.$oid} className="w-2/12 flex flex-col gap-4 text-center">
                                <img className="hover:opacity-40 animate-wave-ping hover:scale-110" src={related.img1} alt='image'/>
                                <h2 className="text-md font-bold">{related.name}</h2>
                                <p className="opacity-50">{formattedCurrency.format(related.price)} VND</p>
                            </Link>
                        ))}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};



export default ProductDetail