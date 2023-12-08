import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from "../store/action";
import { useEffect, useState, useRef } from "react";
import { formattedCurrency } from "../ultis/formattedCurrency";
import CategoryItem from "./CategoryItem";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md"; 
import Link from "next/link";

function ShopSection() {
    const [keyword, setKeyword] = useState(undefined)
    const keywordRef = useRef()
    const [showCategory, setShowCategory] = useState(false)
    const [category, setCategory] = useState([])
    const { products } = useSelector(state => state.products)
    const iphoneList = products.filter(product => product = product.category === 'iphone')
    const ipadList = products.filter(product => product = product.category === 'ipad')
    const airpodList = products.filter(product => product = product.category === 'airpod')
    const watchList = products.filter(product => product = product.category === 'watch')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct())
    },[dispatch])
    const handleCategory = (category) => {
        setCategory(category)
        setShowCategory(true)
    }

 
    function handleKeyword() {
        setKeyword(keywordRef.current.value)
    }
 
    
    const searchKeyword = products.filter(product => product.name.toLowerCase().includes(keyword))


    return (
        <>
            <div className="w-2/3 mx-auto grid grid-flow-row gap-6 max-lg:w-full">
                <div className="bg-gray-100 px-20 flex flex-row justify-between pt-28 pb-16 uppercase">
                    <p className="text-4xl">Shop</p>
                    <p className="text-xl opacity-50">Shop</p>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="w-1/4">
                        <h1
                            className="text-2xl uppercase pb-4 max-md:font-bold max-md:text-sm">Categories</h1>
                        <div>
                            <h1 className="max-md:text-sm uppercase bg-black text-xl text-white py-2 px-4">Apple</h1>
                            <CategoryItem handleCategory={handleCategory} isActive='all' nameCategory='All' productList={products}></CategoryItem>
                            <div className="grid grid-flow-row">
                                <h1 className="max-md:text-sm uppercase text-xl bg-gray-100 py-2 px-4">Iphone & Mac</h1>
                                <CategoryItem handleCategory={handleCategory} isActive='iphone' nameCategory='Iphone' productList={iphoneList} />
                                <CategoryItem handleCategory={handleCategory} isActive='ipad' nameCategory='Ipad' productList={ipadList} />
            
                                <CategoryItem handleCategory={handleCategory} isActive='macbook' nameCategory='Macbook' productList={[]} />
                            </div>
                            <div className="grid grid-flow-row">
                                <h1 className="max-md:text-sm uppercase text-xl bg-gray-100 py-2 px-4">Wireless</h1>
                                <CategoryItem handleCategory={handleCategory} isActive='airpod' nameCategory='Airpod' productList={airpodList} />
                                <CategoryItem handleCategory={handleCategory} isActive='watch' nameCategory='Watch' productList={watchList} />
                            </div>
                            <div className="grid grid-flow-row">
                                <h1 className="max-md:text-sm uppercase text-xl bg-gray-100 py-2 px-4">Others</h1>
                                <CategoryItem handleCategory={handleCategory} isActive='mouse' nameCategory='Mouse' productList={[]} />
                                <CategoryItem handleCategory={handleCategory} isActive='keyboard' nameCategory='Keyboard' productList={[]} />
                                <CategoryItem handleCategory={handleCategory} isActive='other' nameCategory='Other' productList={[]} />
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="flex justify-between">
                            <input ref={keywordRef} onChange={handleKeyword} placeholder="Enter Search Here!" className="border-2 border-gray-400 rounded w-2/6 pl-4 py-2 max-md:w-1/2" />
                            <select className="border-2 border-gray-500 max-md:text-sm">
                                <option className="px-2">
                                    Defaul sorting
                                </option>
                            </select>
                        </div>

                        <div
                            className="grid grid-cols-3 p-4 text-center gap-y-4 max-lg:grid-cols-2">

                            {/* {searchKeyword.length > 0 && searchKeyword !== undefined ? searchKeyword.map(product => (
                                <Link href={`/detail/${product._id.$oid}`}
                                    key={product._id.$oid} className="grid grid-flow-row gap-2 ani">
                                    <img src={product.img1} className="hover:opacity-40  hover:scale-110 cursor-pointer animate-wave-ping" />
                                    <h1 className="text-md px-4 font-bold">{product.name}</h1>
                                    <p className="text-md opacity-50">{formattedCurrency.format(product.price)} VND</p>
                                </Link>))
                            : */}

                            {showCategory ? category.map(product => (
                                <Link href={`/detail/${product._id.$oid}`}
                                    key={product._id.$oid} className="grid grid-flow-row gap-2 ani">
                                    <img src={product.img1} className="hover:opacity-40  hover:scale-110 cursor-pointer animate-wave-ping" alt='image'/>
                                    <h1 className="text-md px-4 font-bold">{product.name}</h1>
                                    <p className="text-md opacity-50">{formattedCurrency.format(product.price)} VND</p>
                                </Link>
                            )) :
                            products.map(product => (
                            <Link href={`/detail/${product._id.$oid}`}
                                key={product._id.$oid} className="grid grid-flow-row gap-2 ani">
                                <img src={product.img1} className="hover:opacity-40  hover:scale-110 cursor-pointer animate-wave-ping" alt='image'/>
                                <h1 className="text-md px-4 font-bold">{product.name}</h1>
                                <p className="text-md opacity-50">{formattedCurrency.format(product.price)} VND</p>
                            </Link>
                            ))}

                        </div>
                        <div className="flex flex-col gap-2 my-10">
                            <div className="flex justify-end leading-5">
                                <span className="bg-gray-200 px-2 py-2 cursor-pointer">
                                    <MdKeyboardDoubleArrowLeft className="text-xl max-md:text-sm" />
                                </span>
                                <span className="bg-gray-700 px-4 py-2 not-italic text-white cursor-pointer max-md:text-xs">1</span>
                                <span className="bg-gray-200 px-2 py-2 cursor-pointer">
                                    <MdKeyboardDoubleArrowRight className="text-xl max-md:text-sm" />
                                </span>
                            </div>
                            <div className="flex justify-end">
                                <p className="opacity-50 max-md:text-xs">Showing 1-9 of 9 results</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopSection