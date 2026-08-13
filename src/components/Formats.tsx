import { formats } from "../content"
import { Reveal } from "./Reveal"

export function Formats() {
  return (
    <section className="section formats" id="formats">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">{formats.eyebrow}</p>
          <h2>{formats.title}</h2>
          <p className="lede" style={{ marginTop: "1rem" }}>
            {formats.note}
          </p>
        </Reveal>
        <div className="board">
          <div className="board-row is-head">
            <span>Пакет</span>
            <span>Ціна</span>
            <span>Склад</span>
            <span />
          </div>
          {formats.items.map((item) => (
            <div
              className={`board-row ${item.featured ? "is-feature" : ""}`}
              key={item.name}
            >
              <span>{item.name}</span>
              <b>
                {item.price} {item.unit}
              </b>
              <p>{item.detail}</p>
              <a className="btn btn-ghost board-cta" href="#contact">
                Обрати
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
