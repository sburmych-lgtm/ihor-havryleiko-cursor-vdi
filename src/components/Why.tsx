import { why } from "../content"
import { Reveal } from "./Reveal"

export function Why() {
  return (
    <section className="section why" id="method">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">{why.eyebrow}</p>
          <h2>{why.title}</h2>
        </Reveal>
        <div className="why-list">
          {why.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="why-item">
                <div className="why-mark">гребок {String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
