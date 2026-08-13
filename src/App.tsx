import { About } from "./components/About"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { Formats } from "./components/Formats"
import { Hero } from "./components/Hero"
import { Media } from "./components/Media"
import { Proof } from "./components/Proof"
import { Services } from "./components/Services"
import { SiteNav } from "./components/SiteNav"
import { Story } from "./components/Story"
import { WakeLine } from "./components/WakeLine"
import { Why } from "./components/Why"

export default function App() {
  return (
    <>
      <a className="skip-link" href="#top">
        До змісту
      </a>
      <SiteNav />
      <main>
        <Hero />
        <WakeLine />
        <About />
        <WakeLine />
        <Why />
        <Story />
        <Services />
        <Formats />
        <Media />
        <Proof />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
