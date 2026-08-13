import { story } from "../content"
import { AutoVideo } from "./AutoVideo"
import { Reveal } from "./Reveal"

const media = {
  ocean: {
    type: "video" as const,
    src: "/media/video/ocean.mp4",
    poster: "/media/posters/ocean.jpg",
  },
  dragonboat: {
    type: "image" as const,
    src: "/media/photos/champion.jpg",
  },
  gym: {
    type: "image" as const,
    src: "/media/photos/training-cable.jpg",
  },
}

export function Story() {
  return (
    <section className="section story">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">{story.eyebrow}</p>
          <h2>{story.title}</h2>
        </Reveal>
      </div>
      <div className="story-beats">
        {story.beats.map((beat) => {
          const asset = media[beat.media as keyof typeof media]
          return (
            <article className="beat" key={beat.title}>
              {asset.type === "video" ? (
                <AutoVideo src={asset.src} poster={asset.poster} />
              ) : (
                <img src={asset.src} alt="" />
              )}
              <div className="beat-shade" />
              <div className="beat-copy">
                <p className="eyebrow">{beat.stroke}</p>
                <h3>{beat.title}</h3>
                <p>{beat.text}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
