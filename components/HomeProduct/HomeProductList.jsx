import Image from 'next/image'
import banner from '../../public/image/banner1.jpg'
import product1 from '../../public/image/product_1.png'
import product2 from '../../public/image/product_2.png'
import product3 from '../../public/image/product_3.png'
import product4 from '../../public/image/product_4.png'
import product5 from '../../public/image/product_5.png'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect} from 'react'
import { fetchProduct, setDetailPopup } from '../store/action'
import ProductPopup from './ProductPopup';
import { formattedCurrency } from '../ultis/formattedCurrency'
import { UIAction } from '../store/ui'
import Link from 'next/link'


function HomeProductList() {
    //dung selector lay trang thai show va products tu store
    const { show } = useSelector(state => state.ui)
    const { products } = useSelector(state => state.products)

    //dung dispatch de lay du lieu fetch tu store
    const dispatch = useDispatch();

    //dung effect de action dispatch
    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch])
    

    //tao ham hien thi detailpop up , dung dispatch lay product da chon
    const handleDetailPopup = (product) => {
        dispatch(setDetailPopup(product))
        dispatch(UIAction.showPopup());
    };

    //tao ham close popup
    const handleClosePopup = () => {
        dispatch(UIAction.hidePopup())
    }

    return (
        <>
            {/* neu sho thi hien thi popup va truyen prop vao pop up */}
        {show && <ProductPopup onClose={handleClosePopup} />}
        <div className="max-sm:pt-10 mx-auto pt-20 grid grid-flow-row gap-10 w-2/3 max-md:w-full max-md:text-xs max-lg:w-full">
                <div className='z-0'>
                    <div className="">
                    <Image src={banner} alt='banner'/>
                    </div>
                    <div className="absolute top-44 mx-20 max-md:text-xs max-md:top-32 max-md:ml-8 max-sm:top-14">
                        <p className="uppercase mb-3 text-md opacity-40 max-md:text-xs">New Inspiration 2023</p>
                        <h1 className="uppercase mb-3 text-3xl w-3/4 max-md:text-sm max-md:font-bold">20 % Off on new season</h1>
                        <Link href='/shop'>

                        <div  className="bg-gray-700 text-white text-center w-1/2 z-10 cursor-pointer hover:bg-opacity-80">
                            <p className="leading-10 opacity-80 hover:opacity-100 max-md:text-xs">Browser collection</p>
                        </div>

                        </Link>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="text-center uppercase ">
                        <p className="text-lg opacity-50 max-md:text-sm">Carefully created collection</p>
                        <p className="text-2xl max-md:text-md">Browse Our categories</p>
                    </div>
                    <div className="w-full grid grid-flow-col gap-4 justify-between max-md:grid-cols-2">
                        <ProductItem className='' product={product1} alt='product1'/>
                        <ProductItem className='' product={product2} alt='product2'/>
                    </div>
                    <div className="grid grid-flow-col gap-4 justify-between">
                        <ProductItem className='' product={product3} alt='product3'/>
                        <ProductItem className='' product={product4} alt='product4'/>
                        <ProductItem className='' product={product5} alt='product5'/>
                    </div>
                </div>
                <div className=''>
                    <div className="uppercase mb-4 max-sm:ml-2">
                        <p className="text-lg opacity-50 max-md:text-sm">Make the hard way</p>
                        <p className="text-2xl max-md:text-md">top trending products</p>
                    </div>
                    <div className='grid grid-cols-4 gap-4 mb-6 max-md:grid max-md:grid-cols-2'>
                        {/* lay du lieu product de hien thi danh sach san pham  */}
                        {products.map((product) => (
                            <div className='grid gap-y-2' key={product._id.$oid}>
                                <p>
                                    <img alt='Image' className='hover:opacity-40  hover:scale-110 cursor-pointer'
                                        src={product.img1} onClick={() => handleDetailPopup(product)} />
                                </p>
                                <p className='text-center font-bold text-sm mt-2'>{product.name}</p>
                                <p className='text-center opacity-60 -z-10 text-sm'>{formattedCurrency.format(product.price)} VND</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=' max-md:px-0  max-lg:px-5 grid grid-flow-col justify-between bg-gray-100 px-28 py-20 max-sm:px-2'>
                    <div>
                        <h1 className='max-md:text-sm max-md:font-bold uppercase text-xl'>Free Shipping</h1>
                        <p className='max-md:text-xs opacity-60'>Free shipping worldwide</p>
                    </div>
                     <div>
                        <h1 className='max-md:text-sm max-md:font-bold uppercase text-xl'>24 x 7 service</h1>
                        <p className='max-md:text-xs opacity-60'>Free shipping worldwide</p>
                    </div>
                    <div>
                        <h1 className='max-md:text-sm max-md:font-bold uppercase text-xl'>Festival offfer</h1>
                        <p className='max-md:text-xs opacity-60'>Free shipping worldwide</p>
                    </div>
                </div>
                <div className='grid grid-flow-col pb-16 pt-6 max-lg:px-5 max-sm:flex max-sm:flex-col max-sm:p-0 max-sm:pt-0 max-sm:text-center '>
                    <div>
                        <h1 className='text-2xl uppercase '>Let be Friends!</h1>
                        <p className='opacity-60'>Nisi nisi remport sonsequat iaboris nisi</p>
                    </div>
                    <form className='flex justify-end max-sm:mx-auto max-sm:mt-4'>
                        <input type='email' className='py-3.5 pl-3 w-1/2 max-sm:w-40  border-2 border-gray-700' required placeholder='Enter your email adrress'/><span><button className='uppercase bg-gray-700 text-white text-center cursor-pointer hover:bg-opacity-80 p-4'>Subcribe</button></span>
                    </form>
                </div>
                </div>
        </>
    )
}

export default HomeProductList;