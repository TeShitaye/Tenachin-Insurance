import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../src/components/Home'
import Claims from "./pages/Claims";
import Policies from './pages/Policies';
import Services from './components/Services';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ClaimRequestForm from './pages/ClaimForm';


function App() {
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
  <Routes>
    <Route path='/' element=  {<Home/>} > </Route>
    <Route path='/register' element= {<RegisterPage/>} > </Route>
    <Route path='/login' element= {<LoginPage/>} > </Route>
    <Route path="/profile" element={<Profile/>} />
    <Route path='/home' element= {<Home/>} ></Route>
    <Route path="/claims" element={<Claims />} />
    <Route path="/policies" element={<Policies/>} />
    <Route path="/services" element={<Services/>} />
    <Route path="/about" element={<AboutUs/>} />
    <Route path="/settings" element={<Settings/>} />
    <Route path="/claimform" element={<ClaimRequestForm/>} />
  </Routes>
  <Footer/>
  </BrowserRouter>
    </div>

  );
}

export default App;
