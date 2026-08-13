import { services } from "../content"
import { Reveal } from "./Reveal"

export function Services() {
  return (
    <section className="section services">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">{services.eyebrow}</p>
          <h2>{services.title}</h2>
        </Reveal>
        <div className="chip-row">
          {services.audience.map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="service-grid">
          {services.items.map((item) => (
            <article className="service" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="included">
          {services.included.map((item) => (
            <span key={item}>— {item}</span>
          ))}
        </div>
        <p className="limit">{services.limit}</p>
      </div>
    </section>
  )
}
