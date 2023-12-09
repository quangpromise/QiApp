
import logo from '../../public/image/logo.jpeg'
import Image from 'next/image';
import { FaCartArrowDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useScrollY } from "../hooks/useScroolY";
import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import { getFromStorage } from "../ultis/validate";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { useState ,useEffect} from 'react';
import { cartAction } from '../store/slice';
import { IoMenu } from "react-icons/io5";


//tao component cho header
function Header() {
    //tao trang thai khi click tang hoac giam item thi cart button animation
    const [btnHighlighted, setBtnHighlighted] = useState(false)
    //dung seletocr lay items va total quantity tu store
    const { items, totalQuantity } = useSelector(state => state.cart)

    //dung dispatch de action clear item tu store khi nguoi dung check out
    const dispatch = useDispatch()

    //dung Effect de set trang thai khi tang giam item thi animation
    useEffect(() => {
        if (items.length === 0) {
            return;
        }     
        setBtnHighlighted(true);
        const timer = setTimeout(() => {
            setBtnHighlighted(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    //dung scrollY tu hook de set trang thai navbar khi scroll 
    const [scrollY] = useScrollY()

    //dung router de dieu huong'
    const router = useRouter()

    //tao ham logout 
    const handleLogOut = () => {
        //xoa nguoi dung hien tai khi log out
        localStorage.removeItem('currentUser');
        router.push('/auth?mode=login');
        dispatch(cartAction.clearCart())
    }

    //tao useractive khi login
    const userActive = getFromStorage('currentUser')
    return (
        // tao navbar khi scroll xuong thi sex thay doi man hinh cua text va backgound navbar
        <div className={`fixed  z-10  w-full  ${scrollY > 80 ? 'bg-black bg-opacity-80' : 'bg-white'}`}>
            <div className='group relative mx-auto'>
            <IoMenu className={`max-sm:text-2xl  max-sm:cursor-pointer mx-auto hidden max-sm:block ${scrollY > 80 && 'text-white'}`} />
                
            <div className="max-sm:bg-black max-sm:pb-2 max-sm:hidden max-sm:h-auto max-sm:drop-shadow-sm max-sm:bg-opacity-80 max-sm:absolute max-sm:group-hover:block  max-sm:text-center flex pt-5 -mb-5 w-2/3 mx-auto justify-between italic  text-xl max-lg:w-full max-lg:px-8 max-md:text-sm max-md:gap-0">
            <div className="max-sm:text-center flex gap-7 max-sm:-mt-4 max-sm:flex-col max-sm:gap-2 max-sm:mb-4">
                <Link href='/' className="cursor-pointer text-orange-400 hover:scale-125">Home</Link>
                <Link href='/shop' className={`cursor-pointer hover:scale-125 max-sm:text-white ${scrollY > 80 && 'text-white'}`}>Shop</Link>
            </div>
            <div><Image src={logo} alt='logo' className='max-sm:text-white max-md:hidden rounded-xl -mt-3' width={50} height={50}/></div>
            <div className='flex gap-3 max-sm:flex-col max-sm:gap-2 max-sm:mx-auto'>
                    <Link href='/cart'
                        // neu trang thai la highlight thi them animation cho cart button
                        className={`${btnHighlighted ? `animate-wave-bump ` : ''}max-sm:text-white max-sm:mx-auto max-md:px-1 sm:text-left cursor-pointer leading-5 text-justify border-2 border-black rounded-xl -mt-2 py-2 mb-8 px-2 flex gap-1 hover:scale-125 ${scrollY > 80 && 'text-white'}`}>
                        <FaCartArrowDown className={`${scrollY > 80 ? 'text-white' : 'text-slate-500'}`} />
                        <p className=''>Cart <span className='bg-black  rounded-3xl text-md py-1 font-bold text-white not-italic  px-2'>{totalQuantity}</span></p></Link>
                    {userActive  ?
                    <>
                        <div className="max-sm:text-white  max-sm:-mt-8 flex gap-1 leading-5 max-sm:mx-auto"><FaUser className={`${scrollY > 80 ? 'text-white' : 'text-slate-500'}`} /><p className={`${scrollY > 80 && 'text-white'}`}>{userActive.fullname}</p><AiFillCaretDown className={`${scrollY > 80 ? 'text-white' : 'text-slate-500'}`}/></div>
                        <div onClick={handleLogOut} className={`max-sm:text-white cursor-pointer leading-5 flex gap-1 hover:scale-125 ${scrollY > 80 && 'text-white'} max-sm:mx-auto`}><p>(Logout)</p></div>
                        </>
                    : <Link href='/auth?mode=login' className={`max-sm:text-white max-sm:mx-auto max-sm:-mt-8 cursor-pointer leading-5 flex gap-1 hover:scale-125 ${scrollY > 80 && 'text-white'} animate-pulse`}><FaUser className={`${scrollY > 80 ? 'text-white' : 'text-slate-500'}`} /><p>Login</p></Link>
                    
                    }
            </div>
                </div>
            </div>
        </div>
    )
}

export default Header;