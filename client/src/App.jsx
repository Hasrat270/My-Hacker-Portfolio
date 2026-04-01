import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar/index.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Skills from "./components/sections/Skills.jsx";
import Machines from "./components/sections/Machines.jsx";
import Certifications from "./components/sections/Certifications.jsx";
import Writeups from "./components/sections/Writeups.jsx";
import Contact from "./components/sections/Contact.jsx";
import Resume from "./pages/Resume.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import MachineDetails from "./pages/MachineDetail.jsx";
import WriteupDetail from "./pages/WriteupDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./components/layout/Footer.jsx";
import Labs from "./components/sections/Labs.jsx";


export default function App() {
  const location = useLocation();
  const hideNavbar =
    ["/login", "/dashboard"].includes(location.pathname) ||
    location.pathname.startsWith("/reset-password");

  const hideFooter =
    ["/login", "/dashboard"].includes(location.pathname) ||
    location.pathname.startsWith("/reset-password");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Skills />
              <Machines />
              <Certifications />
              <Writeups />
              <Labs/>
              <Contact />
            </>
          }
        />
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
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/writeups/:id" element={<WriteupDetail />} />
        <Route path="/machines/:id" element={<MachineDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/501"
          element={<NotFound code="501" message="Not implemented" />}
        />
        <Route
          path="/500"
          element={<NotFound code="500" message="Server error" />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}
