import AuthenForm from "@/components/AuthenForm/AuthenForm";
import Head from "next/head";

//tao page authentication
function Authentication() {
    return (
        <>
            <Head>
                <title>login</title>
        </Head>
        <AuthenForm />
        </>
    )
}

export default Authentication;