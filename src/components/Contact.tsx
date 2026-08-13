import { useState, type FormEvent } from "react"
import { brand, contact } from "../content"
import { Reveal } from "./Reveal"

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2>{contact.title}</h2>
          <p className="lede" style={{ margin: "1rem 0 1.4rem" }}>
            {contact.lede}
          </p>
          <p className="place">{brand.location}</p>
            <img
              src="/media/photos/curl-glance.jpg"
              alt={brand.ukrainian}
              style={{ width: "min(100%, 420px)", marginTop: "1.2rem" }}
            />
        </Reveal>
        <Reveal delay={0.08}>
          {sent ? (
            <p className="form-ok">
              Заявку зафіксовано в прототипі. У робочій версії вона піде
              тренеру. Дякую — Ігор відповість особисто.
            </p>
          ) : (
            <form className="form" onSubmit={onSubmit}>
              <label className="field">
                <span>{contact.fields.name}</span>
                <input name="name" required autoComplete="name" />
              </label>
              <label className="field">
                <span>{contact.fields.phone}</span>
                <input name="phone" required autoComplete="tel" type="tel" />
              </label>
              <label className="field">
                <span>{contact.fields.goal}</span>
                <select name="goal" required defaultValue="">
                  <option value="" disabled>
                    Оберіть
                  </option>
                  {contact.goals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </label>
              <button className="btn btn-primary" type="submit">
                {contact.fields.submit}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
