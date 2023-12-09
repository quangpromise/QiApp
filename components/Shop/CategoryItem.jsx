import { useSearchParams} from "next/navigation";
import Link from "next/link";

//tao component Category item
function CategoryItem({ handleCategory, nameCategory, productList, isActive }) {
    //dung search param de get du lieu 
    const searchParams = useSearchParams();
    //neu search param bang voi category nguoi dung click va thi set hight cho category do
    const active = searchParams.get('category') === isActive
    return (
        <Link href={`/shop?category=${isActive}`} >
            <p onClick={() => handleCategory(productList)}
                className={`${active ? 'text-orange-700 font-bold ' : ''} cursor-pointer opacity-60  hover:text-orange-700 py-2 px-4 max-md:text-sm`}>
            <button>{nameCategory}</button>
            </p></Link>
    )
}

export default CategoryItem;