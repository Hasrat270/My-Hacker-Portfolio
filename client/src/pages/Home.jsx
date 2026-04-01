import Hero from '../features/portfolio/Hero.jsx'
import About from '../features/portfolio/About.jsx'
import Skills from '../features/portfolio/Skills.jsx'
import Machines from '../features/portfolio/Machines.jsx'
import Certifications from '../features/portfolio/Certifications.jsx'
import Writeups from '../features/portfolio/Writeups.jsx'
import Labs from '../features/portfolio/Labs.jsx'
import Contact from '../features/portfolio/Contact.jsx'
import SEO from '../components/layout/SEO.jsx'

export default function Home() {
  return (
    <>
      <SEO />
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