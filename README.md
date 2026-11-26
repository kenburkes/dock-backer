# Dock Backer

A truck backing game. You back a reefer trailer into docks, stalls and loading zones in
11 real-world kinds of places, from a grocery warehouse to a Brooklyn curb, with pull-ups,
appointment times, weather and a yard radio guy who lets you hear about it.

Play it: https://claude.ai/artifact/6mYuMU7RH767BtWEkmiU54 (private; share it from the page's Share menu)

## What's here

| Path | What it is |
|---|---|
| `index.html` | The whole game: one page, no install. Open it through a web server (not as a file) so the voices and 3D pictures load. |
| `vo/` | The yard radio lines, one MP3 per line (152 lines, 7 regional voices). |
| `ph/` | 3D skies, textures and street props from Poly Haven. |
| `tools/voice/` | The script that writes and records the radio lines. |
| `tools/tests/` | The test drivers that prove each level can be finished and set the pars, plus a 3D screenshot check. |

To try it on a computer: `npx serve .` (or `python3 -m http.server`) in this folder, then open the address it prints.

## Levels

| # | Place | Par (pull-ups) | Appointment |
|---|---|---|---|
| 1 | Grocery DC, Straight Back | 0 | none |
| 2 | Grocery DC, Offset Start | 1 | none |
| 3 | Grocery DC, Alley Dock | 1 | none |
| 4 | Truck stop on I-40, Overnight Spot | 1 | 2:30 |
| 5 | Atlanta, Drop Yard | 1 | 2:30 |
| 6 | Los Angeles, Produce Market (saw-tooth docks) | 2 | 2:30 |
| 7 | Brooklyn, Curbside Delivery | 2 | 3:00 |
| 8 | Miami, Port Warehouse | 2 | 3:00 |
| 9 | Dallas, Store Dock (blind side) | 3 | 3:30 |
| 10 | Chicago, Alley Back-In | 5 | 4:00 |
| 11 | Brooklyn, Warehouse Bay (blind side) | 5 | 4:00 |

Pars come from `tools/tests/solve-level.js`, which searches for the fewest pull-ups using only
gentle turns (no sharper than 50 degrees). Easy levels get par = best + 1, the street levels best + 2.

## Credits and licenses

Everything here may be used in a game that is sold.

- **Skies, textures, barrier, street lamp and fire hydrant:** [Poly Haven](https://polyhaven.com), CC0.
- **Radio voices:** recorded with [Piper](https://github.com/rhasspy/piper) using the voices
  `joe` (CC0), `john`, `norman`, `bryce` (public domain) and `sam` (Apache 2.0).
- **Truck sounds:** Joseph Sardin, BigSoundBank.com, CC0 (engine 0967 and 1145, reverse beep 1298,
  pneumatic brake 1490, door slam 0103 for the dock bump, rain on concrete 1289, street 2372, highway 0122).
  Cut into seamless loops and leveled for the game.
- **3D engine:** three.js r128 (MIT), loaded from a CDN.
- **Fonts:** Big Shoulders Display, IBM Plex Sans, IBM Plex Mono (SIL Open Font License), from Google Fonts.
- Trucks, trailers, cars, buildings and everything else were drawn for this game.
