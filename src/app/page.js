'use client';

import Head from "next/head";
import { doLogin } from "@/services/Web3Service";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const { push } = useRouter();
  const [message, setMessage] = useState("");

  function btnLoginClick() {
    setMessage("Connecting with Metamask... Waiting...")
    doLogin()
    .then(wallet => push("/timeline"))
    .catch(err => {
      console.log(err);
      setMessage(err.message);
    })
  }
  
  return (
  <>
    <Head>
      <title>Xphere | Login</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
        <img src="/xphere.png" width="400" className="me-3" />
        </div>
        <div className="col-lg-6">
          
          <h1 className="titulo display-5 fw-bold lh-1 mb-3">Xphere</h1>
          <p className="lead fw-bold">Your decentralized social network.</p>
          <p className="lead mb-3">Sign in with your wallet, express your thoughts and stay updated on happenings. </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-dark btn-lg px-4 me-md-2" onClick={btnLoginClick}>
              <img src="/metamask.svg" width="64" className="me-3" />
              Connect with Metamask
            </button>
            
          </div>
          <p className="message">{message}</p>
        </div>
      </div>
    </div>
  </>
  )
}
