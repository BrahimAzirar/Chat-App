import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const TargetForm = useRef();
  const Com_pss = useRef();
  const API_URL = import.meta.env.VITE_API_URL;
  const worker = new Worker("/src/Components/AuthWorker.js");
  const redirect = useNavigate();

  useEffect(() => {
    document.title = "SignUp Page";
  }, []);

  const SignUp = (e) => {
    e.preventDefault();
    const data = { ...Object.fromEntries(new FormData(TargetForm.current)), Email_Verified: false };
    worker.postMessage({ message: "CreateAccount", data, API_URL });
  };

  worker.onmessage = (e) => {
    try {
      const { result = null, err = null } = e.data;
      if (err) throw new Error(result.err);
      redirect(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div id="SignUpForm" className="d-flex justify-content-center align-items-center row m-0">
      <form ref={TargetForm} className='col-11 col-md-7 col-lg-6 p-3 px-sm-4 row'>
        <div className='d-flex justify-content-center'>
          <img src="/Logo.svg" className='mb-3' />
        </div>
        <div className="col-6">
            <label>First Name</label>
            <input type="text" name="FirstName" className='form-control' />
        </div>
        <div className="col-6">
            <label>Last Name</label>
            <input type="text" name="LastName" className='form-control' />
        </div>
        <div>
            <label>Email</label>
            <input type="email" name="Email" className='form-control' />
        </div>
        <div className="col-6">
            <label>Password</label>
            <input type="password" name="Password" className='form-control' />
        </div>
        <div className="col-6">
            <label>Confirm password</label>
            <input type="password" ref={Com_pss} className='form-control' />
        </div>
        <div className="col-9 mx-auto d-grid">
            <button className='btn' onClick={SignUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
