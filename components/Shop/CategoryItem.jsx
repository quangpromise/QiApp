import { useSearchParams} from "next/navigation";
import Link from "next/link";

function CategoryItem({ handleCategory, nameCategory, productList,isActive }) {
    const searchParams = useSearchParams();
    const active = searchParams.get('category') === isActive
    return (
        <Link href={`/shop?category=${isActive}`} ><p  onClick={() => handleCategory(productList)} className={`${active ? 'text-orange-700 font-bold ' : ''} cursor-pointer opacity-60  hover:text-orange-700 py-2 px-4 max-md:text-sm`}>
            <button>{nameCategory}</button>
            </p></Link>
    )
}

export default CategoryItem;