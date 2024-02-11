import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const TargetForm = useRef();
  const worker = new Worker("/src/Components/AuthWorker.js");
  const API_URL = import.meta.env.VITE_API_URL;
  const redirect = useNavigate();

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const LoginHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(TargetForm.current));
    worker.postMessage({ message: "LoginToAccount", data, API_URL });
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
    <div id='LoginForm' className='d-flex justify-content-center align-items-center row m-0'>
      <form ref={TargetForm} className='col-11 col-md-7 col-lg-6 p-3 px-sm-4 row'>
        <div className='d-flex justify-content-center'>
          <img src="/Logo.svg" className='mb-3' />
        </div>
        <div className='col-11 mx-auto'>
            <label className='form-label mb-1'>Email</label>
            <input type="email" name="Email" className='form-control'/>
        </div>
        <div className='col-11 mx-auto'>
            <label className='form-label mb-1'>Password</label>
            <input type="password" name='Password' className='form-control'/>
        </div>
        <div className='col-11 mx-auto d-grid'>
          <button onClick={LoginHandler} className='btn'>Log in</button> 
        </div>
        <div className='col-11 mx-auto text-center'>
          <span>Create a new account ?</span>
          <span> <Link to="/SignUp" id='ToSignUpPage'>Sign Up</Link> </span>
        </div>
        <div className='col-11 mx-auto text-center'>
          <span>Are forgot your password ?</span>
          <span> <Link to="/forgotPassword" id='ToForgotPasswordPage'>Forgot</Link> </span>
        </div>
      </form>
    </div>
  );
}
