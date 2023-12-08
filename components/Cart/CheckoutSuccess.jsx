function CheckoutSuccess() {
    return (
        <div className="pt-40 mb-40">
            <div className="mx-auto flex flex-col gap-4  w-2/3 p-10 border-2 border-gray-400 rounded-3xl">
                <h1 className="text-green-700 font-bold text-xl">Thank you for your order!</h1>
                <h2>Shipper will contact to you soon to confirm this order
                    <br></br>
                    If have any question, please contact customer services or chat with us to get more details
                    
                </h2>
                <div class="max-md:w-full bg-orange-500 flex text-center w-1/3 mx-auto rounded-md">
                    <div className="mx-auto flex gap-4 py-2">
                    <span className="w-5 h-5 text-center rounded-3xl border-t-2 border-l-2 animate-spin"></span>
                    <span className="text-white ">Processing...</span>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess