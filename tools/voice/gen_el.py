# Records every radio line with ElevenLabs accent voices (Starter plan or higher: commercial use allowed).
# Usage, from tools/voice/:  python3 gen_el.py ../../vo
# The key is sent by the cloud environment's network settings; on your own computer set ELEVEN_API_KEY.
# Raw recordings are kept in el_raw/ so a re-run only pays for lines that changed.
import json, os, sys, subprocess, hashlib, urllib.request, concurrent.futures as cf
sys.path.insert(0,'.'); from lines import LINES
OUT=sys.argv[1]; RAW='el_raw'; os.makedirs(OUT,exist_ok=True); os.makedirs(RAW,exist_ok=True)
KEY=os.environ.get('ELEVEN_API_KEY','proxy-injected')
# region -> (ElevenLabs voice library id, name, stability, style)
EL_VOICES={
 'yard':('KvaCHcJoMXfOzwtsULOZ','Hank Harvey - Gruff, Rugged and Wise',.35,.5),
 'nyc':('OBLxU3DhFiBOh33EeRvi','Pauly - Brooklyn Wise Guy',.35,.55),
 'south':('Cb8NLd0sUB8jI4MW2f9M','Jedediah - Inviting and Rich (US Southern)',.4,.45),
 'texas':('0hh7H4ZVAtaGpm1VZyEN','David - Deep, Southern, Cowboy',.4,.45),
 'la':('rHWSYoq8UlV0YIBKMryp','Jerry B - California Surfer Dude',.35,.55),
 'miami':('Wia9gUZ4UI6MNGxAiEyR','Alvarez - Cuban-American, Reflective',.35,.5),
 'chicago':('erLaZvTFBCJD969knK8N','Chicago Mike - Tour Guide Storyteller',.35,.5),
 'mountain':('ruirxsoakN0GWmGNIo04','John Morgan - Gritty, Rugged Cowboy',.4,.45),
 'northwest':('CyU7Wdw4NycpZBXgjUWM','Matthew - Laid-Back, Friendly Surfer',.4,.45),
 'farm':('ckk9cEUbwIlVMpF26AhK','Bart - Confident, Friendly Midwest Male',.4,.45),
 'kc':('py1hFZJmmpGQEahpRuaE','Albert - Midwest trucker narrator',.4,.45),
 'atlanta':('SHiZvifpX6NOyojATxRy','Drag Jackson - deep, raspy Southern voice',.4,.5),
 'cave':('py1hFZJmmpGQEahpRuaE','Albert - Midwest trucker narrator',.4,.45),
}
SAY={"G.O.A.L.":"goal"}
MODEL='eleven_multilingual_v2'
def record(region,kind,i,text):
  vid,_,stab,style=EL_VOICES[region]; say=text
  for a,b in SAY.items(): say=say.replace(a,b)
  h=hashlib.sha1(f'{vid}|{MODEL}|{stab}|{style}|{say}'.encode()).hexdigest()[:16]; raw=f'{RAW}/{h}.mp3'
  if not os.path.exists(raw):
    body=json.dumps({'text':say,'model_id':MODEL,'voice_settings':{'stability':stab,'similarity_boost':.8,'style':style,'use_speaker_boost':True}}).encode()
    req=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format=mp3_44100_128',data=body,headers={'xi-api-key':KEY,'Content-Type':'application/json'})
    for attempt in range(4):
      try: data=urllib.request.urlopen(req,timeout=90).read(); break
      except Exception as e:
        if attempt==3: raise
        import time; time.sleep(3*(attempt+1))
    open(raw,'wb').write(data)
  name=f'{region}-{kind}-{i}.mp3'
  # a light two-way radio sound, then small files for phones
  af="silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,highpass=f=260,lowpass=f=3800,acompressor=threshold=0.15:ratio=4:attack=5:release=80,volume=1.6,alimiter=limit=0.9"
  subprocess.run(['ffmpeg','-loglevel','error','-y','-i',raw,'-af',af,'-ac','1','-ar','22050','-b:a','48k',f'{OUT}/{name}'],check=True)
  return name
jobs=[(r,k,i,t) for r,kinds in LINES.items() for k,lines in kinds.items() for i,t in enumerate(lines)]
only=set(sys.argv[2].split(',')) if len(sys.argv)>2 else None
if only: jobs=[j for j in jobs if j[0] in only]
with cf.ThreadPoolExecutor(3) as ex: names=list(ex.map(lambda j:record(*j),jobs))
manifest={}
for r,kinds in LINES.items():
  manifest[r]={k:[[t,f'{r}-{k}-{i}.mp3'] for i,t in enumerate(lines)] for k,lines in kinds.items()}
json.dump(manifest,open(os.path.join(OUT,'..','voice-lines.json'),'w'),ensure_ascii=False)
print('recorded',len(names),'lines')
