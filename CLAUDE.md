# Dock Backer

A truck backing game. Owner: Kenny (non-technical; explain in plain language, no jargon).
Read README.md first. The whole game is `index.html`; it is published as a claude.ai artifact:
https://claude.ai/artifact/6mYuMU7RH767BtWEkmiU54 (publish updates to that same link, with the
`vo/` and `ph/` files alongside the page).

## Rules

- It must feel realistic to truck drivers: real terms (pull-ups, G.O.A.L., DH, saw-tooth docks,
  drop yard, blind side / sight side), real driving physics. Pull-ups are fine and expected.
- No real brand names, logos or look-alikes for trucks, trailers, stores or companies.
- Every outside asset (art, models, voices, sounds) must allow commercial use; record its license
  in README.md. Poly Haven (CC0) is the source for skies, textures and props so far.
- Keep it working on a phone: portrait layout, touch controls, files sized for phones
  (skies 2048x1024, textures 512-1024, models embedded as one .gltf).
- Artifacts only serve common web file types (.jpg .png .mp3 .json .js ...), not `.bin`: embed
  model buffers in the .gltf as data URIs and publish the .gltf as application/json.
- Pars are set by the test driver (`tools/tests/solve-level.js`), never guessed. Re-run it after
  changing a level layout or the truck size.
- All trucks share one footprint for driving; nicer trucks are a look only, so pars stay fair.
- When a decision is made, add it to this file in the same change.

## Decisions so far

- Name: Dock Backer. Separate project from New MC Load Board.
- 11 levels, easiest to hardest (see README). Appointment windows from level 4 on.
- Trucks upgrade by level: Old Day Cab, Fleet Sleeper, Owner-Operator Mid-Roof, Big Sleeper,
  Long-Hood Show Truck.
- Yard radio: a heckler per region (yard, Brooklyn, South, Texas, LA, Miami, Chicago); every
  region has its own lines, no repeats. Kenny's lines: "This must be amateur night" and
  "Ain't no pie-eating contest!" belong to the grocery warehouse guy.
- Views: Overhead, Cab (with side mirrors), Spotter, and the flat Map. Kenny likes the views and
  wants a real (not toy-like) 3D look.

## Next

1. Real vehicle models from Sketchfab (free, CC BY or CC0, unbranded, credited in README). The
   Sketchfab API token is saved as a network secret on the `dock-backer` cloud environment; the
   first one saved was rejected as invalid and Kenny is re-copying it.
2. ElevenLabs accent voices for all radio lines (Starter plan for commercial use), same lines as
   `tools/voice/lines.py`.
3. Phone play-test: 3D speed, appointment times, level difficulty.
