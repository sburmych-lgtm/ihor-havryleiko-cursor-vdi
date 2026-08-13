# Igor Gavrileyko — Cursor VDI prototype

Premium personal-trainer website prototype for **Ігор Гаврилейко** (Igor Gavrileyko).  
Built as a WDI-assisted qualification run. **WDI core was not modified.**

## How to run locally

```bash
cd "G:\01_PROJECTS\Web Design\ihor_havryleiko_fitnesstrainer\Proto\Cursor_VDI"
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/).

Production build:

```bash
npm run build
npm run preview
```

## Branch

`proto-cursor-vdi`

Git was initialized **inside this folder** because the trainer project had no dedicated repository. Parent folders were not used.

## GitHub

https://github.com/sburmych-lgtm/ihor-havryleiko-cursor-vdi

## Live site (Vercel)

Railway CLI/MCP stayed unauthorized, so the prototype is hosted on Vercel Hobby instead:

**https://ihor-havryleiko-trainer.vercel.app**

Local copy remains at this folder. Run `npm run dev` for http://localhost:5173/.

## Final verdict

**PROTOTYPE_READY_FOR_HUMAN_REVIEW** (not a release, not a WCAG claim, not a WDI gate closure).

The site is a complete Ukrainian single-page prototype: Poseidon cinematic intro into a canoe hero, about, method, three-stroke story, services, pricing board, media, proof, consultation mock.

## Known limitations

- Consultation form does not send mail.
- No phone/email in the supplied dataset.
- No authorized client before/after photos — not invented.
- Logo files are photographs; gold mark was converted to a transparent PNG for the intro.
- Mixed UAH / USD pricing is copied from the trainer dataset, not normalized.
- Large source videos are copied into `public/media/video` for the prototype; MOV files were converted locally to short MP4 clips.
- Playwright MCP browser lane was used for live reference + first visual pass; later IDE browser MCP dropped. Playwright CLI captured `screenshots/`.
- Motion+ example **source** was unavailable (not signed in). Free Motion docs/examples were used. Public Motion+ demos exist: [staggered bento](https://motion.dev/ui/sections/react-bento-staggered), [toast stack](https://examples.motion.dev/react/toast-stack), [screenshot scroll reveal](https://motion.dev/ui/components/screenshot-scroll-reveal). Full source is a [Motion+](https://motion.dev/plus) benefit.

## WDI artifacts

See `wdi/` and:

- `WDI_USAGE_REPORT.md`
- `BUILD_TRACE.md`
- `ASSET_SOURCES.md`
