import { hero, stats } from "../content"
import { AutoVideo } from "./AutoVideo"

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <AutoVideo
          src="/media/video/ocean.mp4"
          poster="/media/posters/ocean.jpg"
        />
        <div className="hero-shade" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">{hero.kicker}</p>
        <h1>
          {hero.line1}
          <br />
          {hero.line2}
          <br />
          <em>{hero.line3}</em>
        </h1>
        <div className="hero-waterline" />
        <p className="lede">{hero.lede}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">
            {hero.cta}
          </a>
          <a className="btn btn-ghost" href="#method">
            {hero.secondary}
          </a>
        </div>
      </div>
      <div className="stats">
        {stats.map((item) => (
          <div className="stat" key={item.label}>
            <b>
              {item.value}
              <small>{item.unit}</small>
            </b>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
