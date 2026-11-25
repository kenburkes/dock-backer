import json, subprocess, sys, os, wave
from piper import PiperVoice, SynthesisConfig
sys.path.insert(0,'.'); from lines import LINES, VOICES, SAY
OUT=sys.argv[1]; os.makedirs(OUT,exist_ok=True)
voices={}
def voice(v):
  if v not in voices: voices[v]=PiperVoice.load(f'voices/vits-piper-en_US-{v}/en_US-{v}.onnx')
  return voices[v]
manifest={}
for region,kinds in LINES.items():
  v,speed,pitch=VOICES[region]; manifest[region]={}
  for kind,lines in kinds.items():
    manifest[region][kind]=[]
    for i,text in enumerate(lines):
      say=text
      for a,b in SAY.items(): say=say.replace(a,b)
      tmp='tmp.wav'
      with wave.open(tmp,'wb') as w: voice(v).synthesize_wav(say,w,syn_config=SynthesisConfig(length_scale=1/speed,noise_scale=.7,noise_w_scale=.9))
      sr=voice(v).config.sample_rate; name=f'{region}-{kind}-{i}.mp3'
      af=f"asetrate={int(sr*pitch)},aresample={sr},atempo={1/pitch:.4f},highpass=f=320,lowpass=f=3300,acompressor=threshold=0.12:ratio=6:attack=5:release=60,volume=2.2,alimiter=limit=0.9"
      subprocess.run(['ffmpeg','-loglevel','error','-y','-i',tmp,'-af',af,'-ac','1','-ar','22050','-b:a','40k',f'{OUT}/{name}'],check=True)
      manifest[region][kind].append([text,name])
json.dump(manifest,open(os.path.join(OUT,'..','voice-lines.json'),'w'),ensure_ascii=False)
print('lines',sum(len(x) for r in manifest.values() for x in r.values()))
