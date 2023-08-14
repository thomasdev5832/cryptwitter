"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addTweet } from "@/services/Web3Service";

export default function NewTweet() {
    
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const {push} = useRouter();

    function btnPublishClick() {
        setMessage("Sending your thought to blockchain... waiting...");
        addTweet(text)
            .then(result => {
                setText("");
                setMessage("Your thought has been sent. Wait for the update.");
            })
            .catch(err => {
                setMessage(err.message);
                console.error(err);
            })
    }

    useEffect(() => {
        const wallet = localStorage.getItem("wallet");
        if(!wallet) push("/");
    }, [])

    return (
        <>
            <div className="top">
                <div className="left">
                    <img src="/xphere.png" className="brand" />
                </div>
                <div className="blocktop">
                    <h1>Welcome!</h1>
                    <p>What's going on?</p>
                </div>
                <textarea className="text-area form-control my-3" value={text} onChange={evt => setText(evt.target.value)} ></textarea>
                <div>
                    <input type="button" onClick={btnPublishClick} className="btn-grad" value="Spread your thoughts." />
                </div>
                <p className="message">{message}</p>
            </div>


        </>
    )
}