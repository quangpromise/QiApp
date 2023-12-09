import Head from "next/head";
import HomeProductList from "@/components/HomeProduct/HomeProductList";

//tao home page
function HomePage() {
    return (
    <>
            <Head>
                <title>Qi Store</title>
                <meta name='Assignment 03' content="Assignent 03 is building" />
                <link  rel="icon" href="/image/logo.jpeg" sizes="any" />
            </Head>
            <HomeProductList />
    </>
    )
}

export default HomePage;