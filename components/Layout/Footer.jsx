function Footer() {
    return (
        <div className="bg-black text-white italic mt-4">
            <div className="mx-auto w-2/3 py-12 grid grid-cols-3 gap-x-28 max-md:mx-0 max-md:flex">
                <div className="flex-col">
                    <h1 className="max-md:text-sm text-xl mb-5 uppercase">Customer Services</h1>
                    <div className="flex-col text-sm max-md:text-xs ">
                        <p className="mb-1 opacity-60 hover:opacity-100 ">
                            <a href='#'>Help & Contact Us</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Returns & Refunds</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Online Stores</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Terms & Coditions</a>
                        </p>
                    </div>
                </div>
                <div className="flex-col">
                    <h1 className="max-md:text-sm text-xl mb-5 uppercase">Company</h1>
                    <div className="text-sm flex-col gap-4 max-md:text-xs">
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>What we Do</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Available Services</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Latest Posts</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>FAQs</a>
                        </p>
                    </div>
                </div>
                <div className="flex-col">
                    <h1 className="max-md:text-sm text-xl mb-5 uppercase">Social Media</h1>
                    <div className="text-sm flex-col gap-4 max-md:text-xs">
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Twitter</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Instagram</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Facebook</a>
                        </p>
                        <p className="mb-1 opacity-60 hover:opacity-100">
                            <a href='#'>Pinterest</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;