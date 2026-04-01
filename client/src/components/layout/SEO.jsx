import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title = "Hasrat's Cybersecurity & Penetration Testing Portfolio", 
  description = "A cybersecurity portfolio showcasing penetration testing writeups, HTB machines, skills, and certifications.", 
  type = "website",
  name = "Hasrat Khan",
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
