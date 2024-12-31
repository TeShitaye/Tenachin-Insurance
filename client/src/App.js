import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../src/components/Home'
import Services from './components/Services';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ClaimRequestForm from './pages/ClaimForm';
import UpgradePage from './pages/Upgrade';
import PremiumProfile from './pages/Premium/PremiumProfile';
import PremiumClaimRequestForm from './pages/Premium/PremiumClaimForm';
import PremiumRegister from './pages/Premium/PremiumRegister';
import PremiumLogin from './pages/Premium/PremiumLogin';
import Telemedicine from './pages/services/Telemedicine';
import NetworkAccess from './pages/services/NetworkAcces';
import RoutineCheckups from './pages/services/RoutineCheckup';
import MaternityCare from './pages/services/MaternityCare';
import ClaimsManagement from './pages/services/ClaimManagement';
import EmergencyAssistance from './pages/services/EmergencyAssistance';
import MedicationSupport from './pages/services/MedicationSupport';
import InternationalTreatment from './pages/services/InternationalTreatement';
import AirAmbulance from './pages/services/AirAmbulance';



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
    <Route path="/premium-login" element={<PremiumLogin />} />
    <Route path="/premium-register" element={<PremiumRegister />} />
    <Route path="/services" element={<Services/>} />
    <Route path="/about" element={<AboutUs/>} />
    <Route path="/settings" element={<Settings/>} />
    <Route path="/claimform" element={<ClaimRequestForm/>} />
    <Route path="/premium-profile" element={<PremiumProfile/>} />
    <Route path="/premium-claims" element={<PremiumClaimRequestForm/>} />
    <Route path="/upgrade" element={<UpgradePage/>} />
    <Route path="/services/telemedicine" element={<Telemedicine/>} />
    <Route path="/services/network-access" element={<NetworkAccess/>}/>
    <Route path="/services/claims-management" element={<ClaimsManagement/>} />
    <Route path="/services/emergency-assistance" element={<EmergencyAssistance/>} />
    <Route path="/services/routine-checkups" element={<RoutineCheckups />} />
    <Route path="/services/medication-support" element={<MedicationSupport />} />
    <Route path="/services/maternity-care" element={<MaternityCare />} />
    <Route path="/services/international-treatment" element={<InternationalTreatment />} />
    <Route path="/services/air-ambulance" element={<AirAmbulance/>} />
  </Routes>
  <Footer/>
  </BrowserRouter>
    </div>

  );
}

export default App;
