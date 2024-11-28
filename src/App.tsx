import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ReportSelection from './pages/ReportSelection';
import CrimeReport from './pages/CrimeReport';
import InfrastructureReport from './pages/InfrastructureReport';
import HospitalReport from './pages/HospitalReport';
import GovernmentOfficeReport from './pages/GovernmentOfficeReport';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="report-selection" element={<ReportSelection />} />
                <Route path="crime-report" element={<CrimeReport />} />
                <Route path="infrastructure-report" element={<InfrastructureReport />} />
                <Route path="hospital-report" element={<HospitalReport />} />
                <Route path="government-office-report" element={<GovernmentOfficeReport />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;