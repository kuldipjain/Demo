import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SingUp from './signup/index';
import LoginForm from './login/Login';
import Dashboard from './dashboard/Dashboard';
import SuccessDynamic from './common/success-dynamic';
import SuccessEconomic from './common/success-economic';
import SuccessPrime from './common/success-prime';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SingUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success-dynamic" element={<SuccessDynamic />} />
          <Route path="/success-economic" element={<SuccessEconomic />} />
          <Route path="/success-prime" element={<SuccessPrime />} />

          </Routes>
          </Router>
    </div>
  );
}

export default App;
