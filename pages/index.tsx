import React, {useContext, useEffect} from "react";
import Head from 'next/head'
import Sticky from "../components/sticky"
import {Context} from "../store";
import {getNotes} from "../store/apis";
export default function Home() {
    const { dispatch }: any = useContext(Context);
    useEffect(() => {
        getNotes(dispatch);
    }, [])

    return (
        <div>
            <Head>
                <title>Sticky App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Sticky/>
        </div>
    )
}
