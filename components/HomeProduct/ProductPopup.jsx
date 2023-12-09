import { useSelector } from "react-redux";
import { formattedCurrency } from "../ultis/formattedCurrency";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";

//tao component product popup
function ProductPopup({ onClose }) {
    //dung selector de lay du lieu product da chon trong popup
    const { detailPopup } = useSelector(state => state.detailPopup)
    return (
        <>
            {/* tao man hinh popup */}
        <div className="fixed w-full h-full z-40 bg-black bg-opacity-50" onClick={onClose}>
        </div>
            <div className="max-lg:left-28 max-lg:grid max-lg:grid-cols-1 max-md:w-3/4 max-md:top-20 max-md:left-10 max-md:p-1 max-md:grid max-md:grid-cols-1 z-50  w-2/3 bg-white top-36 left-60 fixed grid grid-cols-2 gap-5 p-10">
                <div className="max-md:w-40 max-md:mx-auto max-lg:w-40">
                    <img src={detailPopup.img1} alt={detailPopup.name} />
                </div>
                <div className="flex flex-col gap-y-4 pl-10">
                    <div className="cursor-pointer flex -mt-10 justify-end -mr-10 max-md:mr-0 " onClick={onClose}>
                    <IoIosClose className="text-4xl opacity-60 hover:opacity-100 max-md:-mt-36 max-lg:-mt-44" />
                    </div>
                    <h1 className="max-md:mt-8 text-2xl max-md:text-md">{detailPopup.name}</h1>
                    <p className="text-md opacity-60 max-md:text-sm">{formattedCurrency.format(detailPopup.price)} VND</p>
                    <p className="text-sm opacity-40 max-md:text-xm">{detailPopup.short_desc}</p>
                    <Link onClick={onClose} href={`/detail/${detailPopup._id.$oid}`} className="w-1/3 bg-gray-700 text-white cursor-pointer hover:bg-opacity-80 py-2 max-md:mb-10">
                        <button  className="flex gap-2 leading-5 mx-auto max-md:text-xs"><span><FaCartArrowDown /></span>View Detail</button>
                    </Link>
                </div>
            </div>
        
        </>
        
    )
};

export default ProductPopup;