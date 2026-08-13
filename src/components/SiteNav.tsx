import { useState } from "react"
import { brand, nav } from "../content"

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className={`nav is-on ${open ? "is-open" : ""}`}>
      <a className="nav-brand" href="#top">
        <span className="nav-mark">IG</span>
        {brand.latin}
      </a>
      <nav>
        <ul className="nav-links">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="nav-cta" href="#contact">
        Запис
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : "☰"}
      </button>
    </header>
  )
}
