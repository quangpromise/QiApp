import Checkout from "@/components/Cart/Checkout";
import Head from "next/head";

//tao page check out
function CheckOutPage() {
    return (
        <>
            <Head>
                <title>Cart/checkout</title>
            </Head>
            <Checkout />
        </>
    )
}

export default CheckOutPage;