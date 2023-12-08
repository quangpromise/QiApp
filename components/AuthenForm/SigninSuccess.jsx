function SignInSuccess() {
    return (
        <div className="pt-36 mb-40">
            <div className="max-md:w-2/3 mx-auto flex flex-col gap-4  w-1/3 p-10 border-2 border-gray-400 rounded-3xl">
                <h1 className="text-green-700 font-bold text-xl">Login is successfully</h1>
                <h2>Welcome to Qi Store</h2>
                <div class="bg-orange-500 max-lg:w-full flex text-center w-1/3 mx-auto rounded-md">
                    <div className="mx-auto flex gap-4 py-2">
                    <span className="w-5 h-5 text-center rounded-3xl border-t-2 border-l-2 animate-spin"></span>
                    <span className="text-white ">Processing...</span>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInSuccess