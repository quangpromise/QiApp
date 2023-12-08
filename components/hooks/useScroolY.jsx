import { useState, useEffect } from "react";

//tạo function useScroll để lắng nghe sự kiện khi người dùng scroll
export function useScrollY() {
    const [scrollY , setScrollY] = useState(0);

    const handleScrollY = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        setScrollY(scrollY)
    };
    useEffect(() => {
        handleScrollY();
        window.addEventListener('scroll', handleScrollY);
        return () => {
            window.removeEventListener('scroll', handleScrollY);
        }
    }, [])

    return ([scrollY])
}