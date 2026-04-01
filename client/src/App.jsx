import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";

// Public Pages/Sections
import Home from './pages/Home.jsx'; 
import Hero from "./features/portfolio/Hero.jsx";
import About from "./features/portfolio/About.jsx";
import Skills from "./features/portfolio/Skills.jsx";
import Machines from "./features/portfolio/Machines.jsx";
import Certifications from "./features/portfolio/Certifications.jsx";
import Writeups from "./features/portfolio/Writeups.jsx";
import Labs from "./features/portfolio/Labs.jsx";
import Contact from "./features/portfolio/Contact.jsx";
import Resume from "./pages/Resume.jsx";

// Auth Pages
import Login from "./pages/Auth/Login.jsx";
import Register from './pages/Auth/Register.jsx'
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'
import ResetPassword from "./pages/Auth/ResetPassword.jsx";

// Detail Pages
import MachineDetails from "./pages/MachineDetail.jsx";
import WriteupDetail from "./pages/WriteupDetail.jsx";

// Dashboard Components
import DashProfile from "./pages/Dashboard/components/DashProfile.jsx";
import DashSkills from "./pages/Dashboard/components/DashSkills.jsx";
import DashMachines from "./pages/Dashboard/components/DashMachines.jsx";
import DashWriteups from "./pages/Dashboard/components/DashWriteups.jsx";
import DashCerts from "./pages/Dashboard/components/DashCerts.jsx";
import DashSocials from "./pages/Dashboard/components/DashSocials.jsx";
import DashContact from "./pages/Dashboard/components/DashContact.jsx";
import DashLabs from "./pages/Dashboard/components/DashLabs.jsx";

// Error Pages
import ErrorPage from "./pages/Error/ErrorPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public Routes with Navbar/Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/writeups" element={<Writeups />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/machines/:id" element={<MachineDetails />} />
        <Route path="/writeups/:id" element={<WriteupDetail />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard/profile" replace />} />
        <Route path="profile" element={<DashProfile />} />
        <Route path="skills" element={<DashSkills />} />
        <Route path="machines" element={<DashMachines />} />
        <Route path="writeups" element={<DashWriteups />} />
        <Route path="certs" element={<DashCerts />} />
        <Route path="socials" element={<DashSocials />} />
        <Route path="contact" element={<DashContact />} />
        <Route path="labs" element={<DashLabs />} />
      </Route>

      {/* Error Routes (Full screen, no Layout) */}
      <Route path="/501" element={<ErrorPage code="501" message="Not Implemented" desc="// requested feature is not finalized" />} />
      <Route path="/500" element={<ErrorPage code="500" message="Server Error" desc="// encryption synchronization failed" />} />
      <Route path="/403" element={<ErrorPage code="403" message="Forbidden" desc="// access denied" />} />
      <Route path="*" element={<ErrorPage code="404" message="Not Found" desc="// location does not exist in cyberspace" />} />
    </Routes>
  );
}