# Tools

## Voices (`voice/`)

`lines.py` holds every radio line, by region and by what happened (pull-up, missed the door,
curb, bump, near-jackknife, slow, crash, jackknife, late, clean dock, messy dock), plus which
voice, pace and pitch each region uses.

To re-record:

1. `pip install piper-tts` and make sure `ffmpeg` is installed.
2. Download the voices into `voice/voices/` from the sherpa-onnx releases on GitHub, e.g.
   `https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-en_US-joe-medium.tar.bz2`
   (also `john-medium`, `norman-medium`, `bryce-medium`, `sam-medium`), and unpack each one.
3. From `tools/voice/`: `python3 gen2.py ../../vo`. It writes the MP3s and `voice-lines.json`
   next to `vo/`; paste that JSON into the `const RADIO=` line in `index.html`.

Only use voices whose license allows commercial use (check each MODEL_CARD).

## Tests (`tests/`)

- `solve-level.js <level number from 0> [index.html]` finds the fewest pull-ups for a level using
  the game's own physics code, with turns no sharper than 50 degrees (`HL=50`, the default).
- `human-driver.js index.html` drives each level 150 times like a new, decent and good player.
- `screenshots-3d.js` opens the game in a headless browser and saves pictures of the 3D views.
  It needs Playwright and `npm install three@0.128.0` inside `tests/`.

## Poly Haven assets (`../ph/`)

Downloaded from https://polyhaven.com (CC0) through `api.polyhaven.com` / `dl.polyhaven.org`
(send a User-Agent; plain Python urllib gets 403):

- Skies (tonemapped JPG, shrunk to 2048x1024): `kloofendal_48d_partly_cloudy_puresky` (day),
  `kloofendal_overcast_puresky` (rain, fog, snow), `industrial_sunset_02_puresky` (dusk),
  `kloppenheim_02_puresky` (night).
- Textures (1k diffuse + OpenGL normal, shrunk to 512-1024): asphalt_02, asphalt_snow,
  concrete_pavement_02, red_brick_03, brown_brick_02, beige_wall_001, factory_wall,
  container_side, painted_metal_shutter, concrete_wall_001, leafy_grass, gravel_concrete.
  `factory_wall` and `container_side` are green in the original and were turned gray so the
  game can tint them.
- Models (1k glTF, buffers embedded): concrete_road_barrier, street_lamp_01, fire_hydrant.
