import Image from "next/image";
import banner from '../../public/image/banner1.jpg'
import { useSearchParams } from "next/navigation";
import { isEmail, isNotEmpty, hasMinLength, saveToStorage, getFromStorage } from '../ultis/validate'
import {  useRef, useState } from "react";
import { useRouter } from "next/router";
import SignUpNofi from "./SignUpNofi";
import SignInSuccess from "./SigninSuccess";

//tao component Authen
function AuthenForm() {
    //tao hook state hien thong  bao signup/ login thanh cong
    const [signupSuccess, setSignupSuccess] = useState(false)
    const [signInSuccess, setSignInSuccess] = useState(false)

    //dung search Param de search mode login/ singup
    const searchParams = useSearchParams()

    //set trang thai la login hay chua de render form input
    const isLogin = searchParams.get('mode') === 'login';

    //useRoute de dieu huong
    const router = useRouter()
    

    //tao cac truong input du lieu
    const [enteredFullName, setEnteredFullname] = useState('') 
    const [enteredEmail, setEnteredEmail] = useState('') 
    const [enteredPassword, setEnteredPassword] = useState('') 
    const [enteredPhone, setEnteredPhone] = useState('') 

    //dung ref lang nghe su kien
    const fullnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef()
    

    //tao cac ham onChange nhan du lieu thay doi
    const handleOnchangeFullname = () => {
        setEnteredFullname(fullnameRef.current.value)
    }

    const handleOnchangeEmail = () => {
        setEnteredEmail(emailRef.current.value)
    }

    const handleOnchangePassword = () => {
        setEnteredPassword(passwordRef.current.value)
    }

    const handleOnchangePhone = () => {
        setEnteredPhone(phoneRef.current.value)
    }

    
    //tao hook state de set thong bao loi~
    const [fullnameInValid, setFullNameInValid] = useState(false)
    const [emailInValid , setEmailInValid] = useState(false)
    const [passwordInValid , setPasswordInValid] = useState(false)
    const [phoneInValid, setPhoneInValid] = useState(false)
    const [userIsExist, setUserIsExist] = useState(false)
    const [accountInValid, setAccountInValid] = useState(false)
    
    //tao userArr lay du lieu nguoi dung tu` localstorage
    const userArr = getFromStorage('userArr') ? getFromStorage('userArr') : [];
    

    //tao function dang ky user
    const handleSignUp = (e) => {
        e.preventDefault()
        let isValidate = true;
        
        //tao validate du lieu neu nguoi dung nhap khong dung
        if (!isNotEmpty(enteredFullName)) {
            setFullNameInValid(true);
            isValidate = false;
            return
        } else {
            setFullNameInValid(false)
        }

        if (!isNotEmpty(enteredEmail) || !isEmail(enteredEmail)) {
            setEmailInValid(true);
            isValidate = false;
            return
        } else {
            setEmailInValid(false)
        }

        if (!isNotEmpty(enteredPassword) || !hasMinLength(enteredPassword, 8)) {
            setPasswordInValid(true);
            isValidate = false;
            return
        } else {
            setPasswordInValid(false)
        }

        if (!isNotEmpty(enteredPhone) || !hasMinLength(enteredPhone, 9)) {
            setPhoneInValid(true);
            isValidate = false;
            
        } else {
            setPhoneInValid(false)
        }

        userArr.forEach(user => {
            if (enteredEmail === user.email) {
                setUserIsExist(true);
                isValidate = false;
                return
            }
        })
       

        //validate hop le neu nguoi dung nhap dung thong tin
        if (isValidate) {
            userArr.push({
                fullname: enteredFullName,
                email: enteredEmail,
                password: enteredPassword,
                phone: enteredPhone
            })
            saveToStorage('userArr', userArr)
            setSignupSuccess(true)
            setTimeout(() => {
                setSignupSuccess(false)
                e.target.reset()
                router.push('/auth?mode=login')
                setUserIsExist(false)
            }, 3000)
                

        }
    };
    //tao ham xu ly dang nhap
    const handleSignIn = (e) => {
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        let isValidate = true

        //validate du lieu neu nguoi` dung nhap thong tin khong chinh xac
        if (!isNotEmpty(enteredEmail) || !isEmail(enteredEmail)) {
            setEmailInValid(true);
            isValidate = false;
            return
        } else {
            setEmailInValid(false)
        }

        if (!isNotEmpty(enteredPassword)) {
            setPasswordInValid(true);
            isValidate = false;
            return
        } else {
            setPasswordInValid(false)
        }

        //xu ly du lieu sau khi thong tin hop le
        if (isValidate) {

            const user = userArr.find(item => item.email === enteredEmail && item.password === enteredPassword)
            if (!user) {
                setAccountInValid(true)
            } else {
                setAccountInValid(false)
                saveToStorage('currentUser', user)

                setSignInSuccess(true)

                setTimeout(() => {
                    router.push('/shop')                    
                    setSignInSuccess(false)
                    e.target.reset()
                }, 2000)

            }
        }
    }

    //ham` swtich giua login va sign up
    const switchToSignIn = () => {
        router.push('/auth?mode=login')
        setEnteredEmail('');
        setEnteredPassword('')
        setEmailInValid(false)
        setPasswordInValid(false)
        setUserIsExist(false)
    }
    //ham` swtich giua login va sign up

    const switchToSignUp = () => {
        router.push('/auth?mode=signup')
        setEnteredFullname('');
        setEnteredEmail('');
        setEnteredPassword('')
        setEnteredPhone('')
        setFullNameInValid(false)
        setEmailInValid(false)
        setPasswordInValid(false)
        setPhoneInValid(false)
        setAccountInValid(false)
    }
    return (
        <>
            
            {/* hien thi man hinh thanh cong khi dang nhap hoac dang ky  */}
            {signupSuccess && <SignUpNofi />}
            {signInSuccess && <SignInSuccess />}
            {/* neu chua dang nhap hoac dang ky thi hien thi form  */}
            {!signInSuccess && !signupSuccess && <div className="max-md:h-screen text-gray-500 relative w-2/3 mx-auto max-lg:w-full">
                <div className="">
                    <Image draggable='false' className="" src={banner} alt="banner" />
                    <Image draggable='false' className="" src={banner} alt="banner" />
                    <Image draggable='false' className="" src={banner} alt="banner" />
                    
                </div>
                {/* tao form hien thi giua login va sign up */}
                <form onSubmit={isLogin ? handleSignIn : handleSignUp} className=" max-lg:left-40 max-md:text-sm max-md:left-16 max-md:top-20 max-md:w-3/4 shadow-lg shadow-gray-500/50 left-60  p-8 gap-4 absolute w-2/4 top-32 text-black text-xl grid grid-flow-row bg-white rounded">
                    <h1 className="text-4xl  text-center mb-8">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
                    {accountInValid && <p className="text-red-500 text-center">Email/password is wrong</p>}
                        <div className="grid grid-flow-row gap-4">
                        {!isLogin &&
                            <div className="flex flex-col">
                                <input className="border-2 border-gray-200 py-5 pl-4" 
                                    placeholder="Full Name"
                                    id='full-name'
                                    type='text'
                                    name='full-name'
                                    ref={fullnameRef}
                                    onChange={handleOnchangeFullname}
                                />
                                {fullnameInValid && <p className="text-red-600 mt-2">Please input a valid full name</p>}
                            
                            </div>
                        }
                        <div className="flex flex-col">
                        <input  className="border-2 border-gray-200 py-5 pl-4" 
                            placeholder="Email"
                            id='email'
                            type='email'
                            name='email'
                            ref={emailRef}
                            onChange={handleOnchangeEmail}

                            />
                            {emailInValid && <p className="text-red-600 mt-2">Please input a valid email</p>}
                            {userIsExist && <p className="text-red-600 mt-2">This email is registed</p>}


                        </div>
                        <div className="flex flex-col">
                        <input className="border-2 border-gray-200 py-5 pl-4" 
                            placeholder="Password"
                            id='password'
                            type='password'
                            name='password'
                            ref={passwordRef}
                            onChange={handleOnchangePassword}
                            />
                            {passwordInValid && <p className="text-red-600 mt-2">The password have to more than 8 letters</p>}
                        </div >
                        {!isLogin &&
                            <div className="flex flex-col">
                                <input className="border-2 border-gray-200 py-5 pl-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                placeholder="Phone"
                                id='phone'
                                type='number'
                                name='phone'
                                ref={phoneRef}
                                onChange={handleOnchangePhone}                    
                                />
                                {phoneInValid && <p className="text-red-600 mt-2">The phone should be more than 9 number</p>}
                            </div>
                        } 
                        </div >
                        <div>
                            <button className="uppercase text-lg bg-gray-700 text-white cursor-pointer hover:bg-opacity-80 p-4 text-center w-full">{isLogin ? 'Sign In' :  'Sign Up'}</button>
                    </div>
                    
                    <div className="mt-4 mx-auto flex gap-x-2">{isLogin ? 'Create an account ?' : 'Login?'}<p  onClick={isLogin ? switchToSignUp : switchToSignIn } className="text-blue-700 cursor-pointer">{isLogin ? 'Sign Up' : 'Click'}</p></div>
                </form>
        </div>
        }
        </>
    )
};

export default AuthenForm;