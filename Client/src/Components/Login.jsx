import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  return (
    <div id='LoginForm' className='d-flex justify-content-center align-items-center row m-0'>
      <form className='col-11 col-md-7 col-lg-6 p-3 px-sm-4 row'>
        <div className='d-flex justify-content-center'>
          <img src="/Logo.svg" className='mb-3' />
        </div>
        <div className='col-11 mx-auto'>
            <label className='form-label mb-1'>Email</label>
            <input type="email" name="Email" className='form-control'/>
        </div>
        <div className='col-11 mx-auto'>
            <label className='form-label mb-1'>Password</label>
            <input type="password" className='form-control'/>
        </div>
        <div className='col-11 mx-auto d-grid'>
          <button className='btn'>Log in</button> 
        </div>
        <div className='col-11 mx-auto text-center'>
          <span>Create a new account ?</span>
          <span> <Link to="/SignUp" id='ToSignUpPage'>Sign Up</Link> </span>
        </div>
      </form>
    </div>
  );
}
