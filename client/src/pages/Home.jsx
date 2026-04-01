// src/pages/Home.jsx
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import Skills from '../components/sections/Skills.jsx'
import Machines from '../components/sections/Machines.jsx'
import Certifications from '../components/sections/Certifications.jsx'
import Writeups from '../components/sections/Writeups.jsx'
import Labs from '../components/sections/Labs.jsx'
import Contact from '../components/sections/Contact.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Machines />
      <Certifications />
      <Writeups />
      <Labs />
      <Contact />
    </>
  )
}