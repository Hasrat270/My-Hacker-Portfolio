import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar/index.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
