const fs=require('fs');
const html=fs.readFileSync(process.argv[2],'utf8');
const a=html.indexOf('const DEG='), b=html.indexOf('function physics');
const G=new Function('sfx',html.slice(a,b)+`;return {LEVELS,DOORS,rect,check,measure,TOL,MAXD,DEG,L2,VR,wrap,
  setLevel(i){L=LEVELS[i];obstacles=L.park.map(d=>({door:d,poly:rect(DOORS[d],WALLY-.15-TR,-Math.PI/2,L2+TF,TR,THW)}));cones=L.cones.map(([x,y])=>({x,y,hit:false}));},
  conesHit(){return cones.filter(c=>c.hit).length}, resetCones(){cones.forEach(c=>c.hit=false)}, get L(){return L}}`)(()=>{});
const {DEG,MAXD,wrap}=G, L2=G.L2, speed=Math.abs(G.VR);
let seed=1; const rnd=()=>{seed=(seed*16807)%2147483647; return seed/2147483647;};
const mv=(t,dir,d,ds)=>{t.x+=dir*Math.cos(t.th)*ds; t.y+=dir*Math.sin(t.th)*ds; t.th+=dir*ds/4*Math.tan(d); t.ph+=dir*ds/L2*Math.sin(t.th-t.ph);};
function safe(t){G.resetCones(); const r=G.check(t); return !r.crash&&!G.conesHit();}
function trial(lvl, s){
  G.setLevel(lvl); const L=G.L, door=G.DOORS[L.door];
  const [x,y,ang]=L.start; let t={x,y,th:ang*DEG,ph:ang*DEG};
  const gainErr=1+(rnd()-.5)*s.gain, ds=.05; let pulls=0, d=0;
  for(let phase=0;phase<30;phase++){
    // reverse with the steady-driver aim, but late and a bit off
    const dt=ds/speed, lag=Math.round(s.delay*(0.7+rnd()*.6)/dt), q=[]; let bad=false;
    for(let i=0;i<3000;i++){
      const m=G.measure(t,L.door), lat=m.rx-door+(rnd()-.5)*s.eye, phErr=wrap(t.ph+Math.PI/2);
      const desPh=Math.max(-.5,Math.min(.5,.15*lat)), hitchDes=Math.max(-.8,Math.min(.8,2*gainErr*(phErr-desPh)));
      q.push(Math.max(-MAXD,Math.min(MAXD,4*(wrap(t.th-t.ph)-hitchDes))));
      const want=q.length>lag?q.shift():d; d+=Math.max(-s.rate*dt,Math.min(s.rate*dt,want-d));
      // a person looks ahead and stops before hitting something
      const look={...t}; let danger=false; for(let k=0;k<s.look/ds;k++){mv(look,-1,d,ds); if(!safe(look)){danger=true;break;}}
      if(danger||Math.abs(wrap(t.th-t.ph))>65*DEG){bad=true;break;}
      mv(t,-1,d,ds); G.resetCones(); const r=G.check(t);
      if(r.crash||G.conesHit()) return {res:'crash',pulls};
      const mm=G.measure(t,L.door);
      if(r.bumper||mm.gap<.05){ if(mm.lat<G.TOL.lat&&mm.ang<G.TOL.ang) return {res:'docked',pulls}; bad=true; break; }
    }
    if(!bad) return {res:'stuck',pulls};
    // pull-up: drive forward to straighten out and get away from the trouble
    pulls++; if(pulls>8) return {res:'gave up',pulls};
    const dist=4+rnd()*4;
    for(let k=0;k<dist/ds;k++){
      const hitch=wrap(t.th-t.ph), m=G.measure(t,L.door), lat=m.rx-door;
      // straighten tractor with trailer, lean so the trailer points more at the door
      const want=Math.max(-MAXD,Math.min(MAXD,-1.5*hitch+ .06*lat*Math.sign(Math.sin(t.ph))));
      d+=Math.max(-s.rate*.02,Math.min(s.rate*.02,want-d));
      const nt={...t}; mv(nt,1,d,ds); if(!safe(nt)) break; t=nt;
    }
  }
  return {res:'gave up',pulls};
}
const skills={'new player':{delay:.6,gain:.8,eye:1.2,rate:60*DEG,look:1.0},'decent player':{delay:.35,gain:.5,eye:.6,rate:90*DEG,look:1.5},'good player':{delay:.2,gain:.3,eye:.3,rate:120*DEG,look:2}};
if(!process.env.DIAG){console.log('% docked (avg pull-ups when docked, % within par)');
for(const [name,s] of Object.entries(skills)){
  const row=[]; for(let l=0;l<5;l++){let ok=0,par=0,p=0; seed=11+l; const N=150;
    for(let k=0;k<N;k++){const r=trial(l,s); if(r.res==='docked'){ok++;p+=r.pulls; if(r.pulls<=G.LEVELS[l].par) par++;}}
    row.push(`${String(Math.round(ok/N*100)).padStart(3)}% (${ok?(p/ok).toFixed(1):'-'}, ${Math.round(par/N*100)}%)`);}
  console.log(name.padEnd(14),row.join(' | '));
}}
if(process.env.DIAG){ for(const l of [2,3,4]){ const s={delay:.35,gain:.5,eye:.6,rate:90*DEG,look:1.5}; const c={}; seed=5;
 for(let k=0;k<60;k++){const r=trial(l,s); c[r.res]=(c[r.res]||0)+1;} console.log('L'+(l+1),JSON.stringify(c));
 const z={delay:0,gain:0,eye:0,rate:999,look:1.5}; console.log('  no-mistakes driver:',JSON.stringify(trial(l,z)));}}
