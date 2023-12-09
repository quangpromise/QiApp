
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
        <div className={`fixed z-10  w-full ${scrollY > 80 ? 'bg-black bg-opacity-80' : 'bg-white'}`}>
            <div className="flex pt-5 -mb-5 w-2/3 mx-auto justify-between italic  text-xl max-lg:w-full max-lg:px-8 max-md:text-sm max-md:gap-0">
            <div className="flex gap-7 ">
                <Link href='/' className="cursor-pointer text-orange-400 hover:scale-125">Home</Link>
                <Link href='/shop' className={`cursor-pointer hover:scale-125 ${scrollY > 80 && 'text-white'}`}>Shop</Link>
            </div>
                <div><Image src={logo} alt='logo' className='max-md:w-0 rounded-xl -mt-3' width={50} height={50}/></div>
            <div className='flex gap-3 '>
                    <Link href='/cart'
                        // neu trang thai la highlight thi them animation cho cart button
                        className={`${btnHighlighted ? `animate-wave-bump ` : ''} max-md:px-1  cursor-pointer leading-5 text-justify border-2 border-black rounded-xl -mt-2 py-2 mb-8 px-2 flex gap-1 hover:scale-125 ${scrollY > 80 && 'text-white'}`}>
                        <FaCartArrowDown className={`${scrollY > 80 ? 'text-white' : 'text-slate-500'}`} />
                        <p>Cart <span className='bg-black rounded-3xl text-md py-1 font-bold text-white not-italic  px-2'>{totalQuantity}</span></p></Link>
                    {userActive  ?
                    <>
                        <div className="flex gap-1 leading-5"><FaUser className={`${scrollY > 80 ? 'text-white' : 'text-slate-500'}`} /><p className={`${scrollY > 80 && 'text-white'}`}>{userActive.fullname}</p><AiFillCaretDown className={`${scrollY > 80 ? 'text-white' : 'text-slate-500'}`}/></div>
                        <div onClick={handleLogOut} className={`cursor-pointer leading-5 flex gap-1 hover:scale-125 ${scrollY > 80 && 'text-white'}`}><p>(Logout)</p></div>
                        </>
                    : <Link href='/auth?mode=login' className={`cursor-pointer leading-5 flex gap-1 hover:scale-125 ${scrollY > 80 && 'text-white'} animate-pulse`}><FaUser className={`${scrollY > 80 ? 'text-white' : 'text-slate-500'}`} /><p>Login</p></Link>
                    
                    }
            </div>
            </div>
        </div>
    )
}

export default Header;