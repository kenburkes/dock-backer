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
- The Cab view shows the inside of the cab: dashboard gauges (RPM, MPH, air, fuel), gear (D/N/R)
  and a steering wheel that turns with the truck. The Spotter stands up high at the door.
- Mirrors (Kenny: they must be usable like a real driver's): a tall flat mirror with a convex
  spot mirror under it on each side, aimed so the trailer side runs down the inner edge, and they
  follow the trailer as it swings (like the mirror tracking in truck simulators).
- Real models from Sketchfab (CC BY 4.0, credited in README and the Levels menu): the cabover
  tractor (levels 1-8, repainted per level with a color matrix), the long-hood tractor (levels 9-11:
  black Big Sleeper, pearl-white Show Truck; front wheels cut out so they steer; squeezed a little
  lengthwise to keep the shared driving footprint), the reefer trailer, and the car pack. They load
  in the background; the drawn shapes show until they arrive. Sketchfab needs the hosts
  media.sketchfab.com and sketchfab-prod-media.s3.amazonaws.com allowed; the API token is a network
  secret on the `dock-backer` environment.
- Shipping yards: taller dock walls with canopy, door number plates, dock lights, safety posts,
  concrete aprons, yard light towers, a drop lot beyond the fence, neighbor warehouses and tree
  lines; Miami adds container stacks, ship-to-shore cranes and water.
- City streets (Brooklyn, Chicago): storefronts with made-up shop signs (no brands), awnings,
  open-bar fire escapes, parking signs, trash cans, newspaper boxes, mailboxes, a skyline.
- Real sounds from BigSoundBank (CC0): diesel idle and under-load loops blended by throttle and
  pitched by RPM, reverse beeper, air brakes, dock bump, rain, city or highway background.
  The synthesized sounds stay as the fallback until the files load.
- Truck speed (Kenny: level 3 felt slow): 5.5 m/s forward (about 12 mph), 1.8 m/s reverse (about
  4 mph). Physics runs at true speed even when the phone drops frames, and the 3D view lowers
  shadows and sharpness on its own if the phone keeps struggling.
- Zone levels (Brooklyn curb, truck stop, Atlanta stall): the HUD shows a checklist of what is
  still missing (trailer in, tractor in, straight, stopped). Kenny parked between the lines on
  Brooklyn and got nothing, so the zone check has a little slack.

## Next

1. ElevenLabs accent voices for all radio lines (Starter plan for commercial use), same lines as
   `tools/voice/lines.py`. Waiting on Kenny's key.
2. Phone play-test: 3D speed, mirrors, appointment times, level difficulty.
3. Sharing the game with driver friends (Kenny decides when).
4. Kenny should reset the Sketchfab token (it was once typed in the chat).
