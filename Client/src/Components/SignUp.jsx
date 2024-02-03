import "bootstrap/dist/css/bootstrap.min.css";

export default function SignUp() {
  return (
    <div id="SignUpForm" className="d-flex justify-content-center align-items-center row m-0">
      <form className='col-11 col-md-7 col-lg-6 p-3 px-sm-4 row'>
        <div className='d-flex justify-content-center'>
          <img src="/Logo.svg" className='mb-3' />
        </div>
        <div className="col-6">
            <label>First Name</label>
            <input type="text" name="firstname" className='form-control' />
        </div>
        <div className="col-6">
            <label>Last Name</label>
            <input type="text" name="lastname" className='form-control' />
        </div>
        <div>
            <label>Email</label>
            <input type="email" name="email" className='form-control' />
        </div>
        <div className="col-6">
            <label>Password</label>
            <input type="password" name="password" className='form-control' />
        </div>
        <div className="col-6">
            <label>Confirm password</label>
            <input type="password" className='form-control' />
        </div>
        <div className="col-9 mx-auto d-grid">
            <button className='btn'>Sign Up</button> 
        </div>
      </form>
    </div>
  );
}
