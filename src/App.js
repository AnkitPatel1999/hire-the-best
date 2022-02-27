import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/user/SignIn'
import SignUp from './components/user/SignUp'
import ForgotPassword from './components/user/ForgotPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="signin" exact element={<SignIn />}/>
      <Route path="signup"  element={<SignUp />}/>
      <Route path="forgot-password"  element={<ForgotPassword />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
