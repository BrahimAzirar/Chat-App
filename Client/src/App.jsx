import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Account from './Components/Account/Account';
import ForgotPassword from './Components/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Account' element={<Account />} />
        <Route path='/forgotPassword' element={<ForgotPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;