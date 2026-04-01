import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar/index.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
