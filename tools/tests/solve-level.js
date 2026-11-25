const fs=require('fs');
const html=fs.readFileSync(process.argv[3]||'index.html','utf8');
const a=html.indexOf('const DEG='), b=html.indexOf('function physics');
const G=new Function('sfx',html.slice(a,b)+`;return {LEVELS,check,won,goalFrame,trailerPoly,tractorPoly,overlap,setupScene,MAXD,DEG,L2,wrap,get S(){return S}}`)(()=>{});
const {DEG,MAXD,wrap,L2}=G, HL=(+process.env.HL||50)*DEG, lvl=+process.argv[2];
G.setupScene(lvl); const S=G.S, L=G.LEVELS[lvl];
function ok(t){const r=G.check(t); if(r.crash) return null; const tp=G.trailerPoly(t),cp=G.tractorPoly(t);
  for(const s of S.soft) if(G.overlap(tp,s.poly)||G.overlap(cp,s.poly)) return null; return r;}
function step(t,v,d,dist){const n=Math.ceil(dist/.05),h=dist/n; t={...t};
  for(let i=0;i<n;i++){t.x+=v*Math.cos(t.th)*h; t.y+=v*Math.sin(t.th)*h; t.th+=v/4*Math.tan(d)*h; t.ph+=v/L2*Math.sin(t.th-t.ph)*h;
    if(Math.abs(wrap(t.th-t.ph))>HL) return null; const r=ok(t); if(!r) return null; if(r.bumper) return {t,bump:true};}
  return {t};}
function finish(t0){let t={...t0};
  for(let i=0;i<5000;i++){const m=G.goalFrame(t);
    const desPh=Math.max(-.5,Math.min(.5,.15*m.slat)), hitchDes=Math.max(-.8,Math.min(.8,2*(m.sang-desPh)));
    const d=Math.max(-MAXD,Math.min(MAXD,4*(wrap(t.th-t.ph)-hitchDes)));
    const r=step(t,-1,d,.05); if(!r) return false; t=r.t;
    if(G.won(t)) return true; if(r.bump||m.gap<.2) return false;}
  return false;}
const steers=[-1,-.6,-.3,0,.3,.6,1].map(s=>s*MAXD);
const key=t=>[Math.round(t.x/.7),Math.round(t.y/.7),Math.round(wrap(t.th)/(8*DEG)),Math.round(wrap(t.th-t.ph)/(8*DEG))].join();
const [x,y,ang]=L.start, s0={x,y,th:ang*DEG,ph:ang*DEG}, t0=Date.now();
let frontier=[{t:s0,dir:0,rev:false}], seen=new Set([key(s0)]);
for(let pulls=0;pulls<=6;pulls++){
  const next=[], q=frontier.slice(); let cnt=0;
  while(q.length){
    const n=q.pop(); cnt++;
    if(n.dir<=0&&(G.won(n.t)||finish(n.t))){console.log(`L${lvl+1} ${L.city} "${L.name}": ${pulls} pull-ups (par now ${L.par}) ${((Date.now()-t0)/1000).toFixed(0)}s`);process.exit(0);}
    for(const dir of [1,-1]) for(const d of steers){
      const r=step(n.t,dir,d,1.5); if(!r||r.bump) continue;
      const k=key(r.t)+dir; if(seen.has(k)) continue; seen.add(k);
      ((dir===1&&n.rev&&n.dir===-1)?next:q).push({t:r.t,dir,rev:n.rev||dir===-1});
    }
    if(cnt>600000) break;
  }
  frontier=next; if(!frontier.length) break;
}
console.log(`L${lvl+1} ${L.city} "${L.name}": NOT solved within 6 pull-ups ${((Date.now()-t0)/1000).toFixed(0)}s`);
