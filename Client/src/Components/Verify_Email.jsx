import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { IsNotEmpty } from "../ForAll";

export default function Verify_Email() {
  const [Email, SetEmail] = useState("");
  const TargetForm = useRef();
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
      if (!emailRegex.test(data.Email)) throw new Error("This email not valid !");
      worker.postMessage({ message: "VerifyEmail", data, API_URL });
    } catch (error) {
      alert(error.message);
    }
  };

  worker.onmessage = (e) => {
    try {
      const { result = null, err = null } = e.data;
      if (err) throw new Error(result.err);
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      id="VerifyEmailPage"
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
        <div className="mb-2 HideVerificationCodeField">
          <label>Enter the verification code</label>
          <input type="text" name="Code" className="form-control" />
        </div>
        <div>
          <button className="btn w-100" onClick={SendEmail}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
