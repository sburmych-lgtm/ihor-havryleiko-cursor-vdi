import { about, brand } from "../content"
import { Reveal } from "./Reveal"

export function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about-grid">
        <Reveal>
          <figure className="about-photo">
            <img
              src="/media/photos/fullbody-gym.jpg"
              alt={`${brand.ukrainian} у залі фітнес-центру «Пляж»`}
            />
            <figcaption>{brand.location}</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <p className="eyebrow">{about.eyebrow}</p>
            <h2>{about.title}</h2>
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="about-aside">{about.aside}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
