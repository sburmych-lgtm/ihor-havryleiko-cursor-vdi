import { brand, footer } from "../content"

export function Footer() {
  return (
    <footer className="footer">
      <span>
        {brand.latin} · {brand.ukrainian}
      </span>
      <span>{footer.legal}</span>
    </footer>
  )
}
