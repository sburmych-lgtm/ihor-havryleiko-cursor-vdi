import { media } from "../content"
import { AutoVideo } from "./AutoVideo"
import { Reveal } from "./Reveal"

export function Media() {
  return (
    <section className="section media" id="media">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">{media.eyebrow}</p>
          <h2>{media.title}</h2>
        </Reveal>
        <div className="film">
          {media.clips.map((clip) => (
            <figure className="clip" key={clip.src}>
              <AutoVideo src={clip.src} poster={clip.poster} />
              <span>{clip.label}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
