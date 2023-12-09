import { formattedCurrency } from "../ultis/formattedCurrency";
function CheckoutItem(props) {
    //lay props cac item da chon de check out
    const { name, price, quantity } = props.item
    return (
        <>
            <div className="grid grid-flow-col gap-2 justify-around py-4 border-b-2 border-b-gray-300 text-sm">
                <h3 className="uppercase font-bold text-xs">{name}</h3>
                <p className="text-gray-500">{formattedCurrency.format(price)} VND</p>
                <p className="text-gray-500">x</p>
                <p className="text-gray-500">{quantity}</p>
            </div >
        </>
    );
}

export default CheckoutItem;