import { proof } from "../content"
import { Reveal } from "./Reveal"

export function Proof() {
  return (
    <section className="section proof">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">{proof.eyebrow}</p>
          <h2>{proof.title}</h2>
        </Reveal>
        <div className="proof-grid">
          <Reveal>
            <figure className="proof-visual">
              <img
                src="/media/photos/champion.jpg"
                alt="Ігор Гаврилейко — чемпіонат України з веслування на човнах dragonboat"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <ul>
                {proof.titles.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="eyebrow">Курси</p>
              <ul>
                {proof.courses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <figure className="certs">
                <img
                  src="/media/photos/certificates.jpg"
                  alt="Сертифікати та навчальні матеріали Ігоря Гаврилейка"
                />
              </figure>
              <p className="note">{proof.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
