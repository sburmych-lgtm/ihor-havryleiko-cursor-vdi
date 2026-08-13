import { useCallback, useState } from "react"
import { About } from "./components/About"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { Formats } from "./components/Formats"
import { Hero } from "./components/Hero"
import { IntroReveal } from "./components/IntroReveal"
import { Media } from "./components/Media"
import { Proof } from "./components/Proof"
import { Services } from "./components/Services"
import { SiteNav } from "./components/SiteNav"
import { Story } from "./components/Story"
import { WakeLine } from "./components/WakeLine"
import { Why } from "./components/Why"

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])

  return (
    <>
      <a className="skip-link" href="#top">
        До змісту
      </a>
      <IntroReveal onDone={finishIntro} />
      <SiteNav visible={introDone} />
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
