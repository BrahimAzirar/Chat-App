import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { IsNotEmpty } from "../ForAll";

export default function ForgotPassword() {
  const [Index, setIndex] = useState(0);
  const [Email, SetEmail] = useState("");
  const [Code, setCode] = useState("");
  const TargetForm = useRef();
  const Code_verfication = useRef();
  const API_URL = import.meta.env.VITE_API_URL;
  const worker = new Worker("/src/Components/AuthWorker.js");
  //   const redirect = useNavigate();

  useEffect(() => {
    document.title = "Email Verification Page";
  }, []);

  const SendEmail = (e) => {
    e.preventDefault();
    try {
      const data = { Email };
      const mess = IsNotEmpty(data, "The email field is empty");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (mess) throw new Error(mess);
      if (!emailRegex.test(data.Email))
        throw new Error("This email not valid !");
      worker.postMessage({ message: "VerifyEmail", data, API_URL });
    } catch (error) {
      alert(error.message);
    }
  };

  const SendVerificationCode = (e) => {
    e.preventDefault();
    try {
      const data = { Email, Code };
      const mess = IsNotEmpty(data, "The verification code field is empty");
      if (mess) throw new Error(mess);
      worker.postMessage({ message: "SendVerificationCode", data, API_URL });
    } catch (error) {
      alert(error.message);
    }
  };

  const TargetFunction = (e) => {
    const functions = [SendEmail, SendVerificationCode];
    functions[Index](e);
  };

  worker.onmessage = (e) => {
    try {
      const { result = null, err = null, message = null } = e.data;
      result
      if (err) throw new Error(err);
      if (message === "Email is verified") {
        Code_verfication.current.classList.remove("HideComponents");
        setIndex(1);
      }
      else if (message === "Code is verified") {
        const ele = Array.form(document.getElementsByClassName("HideComponents"));
        ele.ForEach(item => item.classList.remove("HideComponents"));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      id="ForgotPasswordPage"
      className="d-flex justify-content-center align-items-center row m-0"
    >
      <form
        ref={TargetForm}
        className="col-11 col-md-7 col-lg-6 p-3 px-sm-4 row"
      >
        <div className="d-flex justify-content-center">
          <img src="/Logo.svg" className="mb-3" />
        </div>
        <div className="mb-2">
          <label>Enter your email</label>
          <input
            type="text"
            name="Email"
            className="form-control"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </div>
        <div ref={Code_verfication} className="mb-5 HideComponents">
          <label>Enter the verification code</label>
          <input
            type="text"
            name="Code"
            className="form-control"
            value={Code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="mb-2 HideComponents">
          <label>Enter password</label>
          <input type="text" name="Password" className="form-control" />
        </div>
        <div className="mb-5 HideComponents">
          <label>Comfirm password</label>
          <input type="text" className="form-control" />
        </div>
        <div>
          <button className="btn w-100" onClick={TargetFunction}>Send</button>
        </div>
      </form>
    </div>
  );
}
