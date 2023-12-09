import Image from "next/image";

//tao component product Item
function ProductItem({product ,alt}) {
    return (
        <Image className='hover:opacity-40 hover:scale-110 cursor-pointer' src={product}  alt={alt}/>
    )
}

export default ProductItem