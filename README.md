# Dock Backer

A truck backing game. You back a reefer trailer into docks, stalls and loading zones in
16 levels in real-world kinds of places, down to a limestone cave under Kansas City, from a grocery warehouse to a Brooklyn curb, with pull-ups,
appointment times, weather and a yard radio guy who lets you hear about it.

Play it: https://claude.ai/artifact/6mYuMU7RH767BtWEkmiU54 (private; share it from the page's Share menu)

## What's here

| Path | What it is |
|---|---|
| `index.html` | The whole game: one page, no install. Open it through a web server (not as a file) so the voices and 3D pictures load. |
| `vo/` | The yard radio lines, one MP3 per line (251 lines, 13 regional accent voices from ElevenLabs). |
| `ph/` | 3D skies, textures and street props from Poly Haven. |
| `models/` | The truck, trailer and car models from Sketchfab, shrunk for phones. |
| `snd/` | Recorded truck sounds: engine loops, reverse beeper, air brakes, dock bump, rain, city and highway background. |
| `tools/voice/` | The script that writes and records the radio lines. |
| `tools/tests/` | The test drivers that prove each level can be finished and set the pars, plus a 3D screenshot check. |

To try it on a computer: `npx serve .` (or `python3 -m http.server`) in this folder, then open the address it prints.

## Levels

| # | Place | Par (pull-ups) | Appointment |
|---|---|---|---|
| 1 | Grocery DC, Straight Back | 0 | none |
| 2 | Grocery DC, Offset Start | 1 | none |
| 3 | Grocery DC, Alley Dock | 1 | none |
| 4 | Truck stop, I-40, Overnight Spot | 1 | 2:30 |
| 5 | Atlanta, GA, Drop Yard | 1 | 2:30 |
| 6 | Brooklyn, NY, Curbside Delivery | 2 | 3:00 |
| 7 | Iowa, Farm Co-op | 1 | 3:00 |
| 8 | Los Angeles, CA, Produce Market | 2 | 2:30 |
| 9 | Miami, FL, Port Warehouse | 2 | 3:00 |
| 10 | Kansas City, MO, Intermodal Ramp | 3 | 3:30 |
| 11 | Denver, CO, Snowed-In DC | 3 | 3:30 |
| 12 | Dallas, TX, Store Dock | 3 | 3:30 |
| 13 | Chicago, IL, Alley Back-In | 5 | 4:00 |
| 14 | Brooklyn, NY, Warehouse Bay | 5 | 4:00 |
| 15 | Kansas City, MO, Underground Warehouse | 4 | 4:30 |
| 16 | Seattle, WA, Seafood Pier | 5 | 4:30 |

Pars come from `tools/tests/solve-level.js`, which searches for the fewest pull-ups using only
gentle turns (no sharper than 50 degrees). Easy levels get par = best + 1, the street levels best + 2.
Levels are ordered by that fewest-pull-ups number, so each level needs at least as many as the one before
(Kenny asked that the cave come just before Seattle, which stays the final level).

## Credits and licenses

Everything here may be used in a game that is sold.

- **Skies, textures, barrier, street lamp and fire hydrant:** [Poly Haven](https://polyhaven.com), CC0.
- **Radio voices:** recorded with [ElevenLabs](https://elevenlabs.io) on a paid (Starter) plan, which allows
  commercial use of the audio, including Voice Library voices. Voices: Hank Harvey (grocery DC), Pauly (Brooklyn),
  Jedediah (South, truck stop), Drag Jackson (Atlanta), David - Deep Southern Cowboy (Texas), Jerry B - California Surfer Dude (LA), Alvarez - Cuban-American (Miami),
  Chicago Mike (Chicago), Albert - Midwest trucker (Kansas City, the caves), Bart (Iowa), John Morgan (Denver),
  Matthew - Laid-Back Surfer (Seattle). Keep the account on a paid plan when recording new lines.
  The older Piper voices (`joe` CC0, `john`, `norman`, `bryce` public domain, `sam` Apache 2.0) remain a free fallback.
- **Truck sounds:** Joseph Sardin, BigSoundBank.com, CC0 (engine 0967 and 1145, reverse beep 1298,
  pneumatic brake 1490, door slam 0103 for the dock bump, rain on concrete 1289, street 2372, highway 0122).
  Cut into seamless loops and leveled for the game.
- **3D engine:** three.js r128 (MIT), loaded from a CDN.
- **Fonts:** Big Shoulders Display, IBM Plex Sans, IBM Plex Mono (SIL Open Font License), from Google Fonts.
- **Truck (levels 1-9):** "Semi Truck Baked" (https://sketchfab.com/3d-models/semi-truck-baked-3e8c5275aeab487fa37d227ce0bd1a9a)
  by 3DE_Study, CC BY 4.0. Repainted per level.
- **Long-hood truck (levels 10-16):** "semi truck" (https://sketchfab.com/3d-models/semi-truck-2df714a51f65471eb54fe226cdab53d0)
  by taeemtasbi, CC BY 4.0. Painted and fitted for the game.
- **Trailer:** "53’ Reefer Trailer" (https://sketchfab.com/3d-models/53-reefer-trailer-904c9af9277d410c98c395fd9f8f9250)
  by mcskinssketchfab, CC BY 4.0.
- **Cars:** "Generic passenger car pack" (https://sketchfab.com/3d-models/generic-passenger-car-pack-20f9af9b8a404d5cb022ac6fe87f21f5)
  by Comrade1280, CC BY 4.0.
- CC BY 4.0 allows selling the game as long as these credits stay (they are also on the Levels menu).
- Buildings, the dashboard and everything else were drawn for this game.
