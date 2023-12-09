function SignUpNofi() {
    return (
        // tao man hinh thong bao thanh cong khi dang ky 
        <div className="pt-36 mb-40">
            <div className="mx-auto flex flex-col gap-4  w-2/3 p-10 border-2 border-gray-400 rounded-3xl">
                <h1 className="text-green-700 font-bold text-xl">Congratulation!</h1>
                <h2>Thanks for being awesome!
                    We have received your account resgister and would like to thank you for writing to us. Please waitting just moment to direct to Login Screen.
                    <br></br>
                    <br></br>

                    [Qi Store]</h2>
                <div class="bg-orange-500 flex text-center w-1/3 mx-auto max-md:w-full rounded-md" disabled>
                    <div className="mx-auto flex gap-4 py-2">
                    <span className="w-5 h-5 text-center rounded-3xl border-t-2 border-l-2 animate-spin"></span>
                    <span className="text-white ">Processing...</span>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpNofi