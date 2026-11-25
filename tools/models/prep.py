import json, os, base64, sys
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
def prep(src, out, name, sizes):
    os.makedirs(out+'/textures', exist_ok=True)
    g=json.load(open(f'{src}/scene.gltf'))
    for b in g['buffers']:
        data=open(f"{src}/{b['uri']}",'rb').read()
        b['uri']='data:application/octet-stream;base64,'+base64.b64encode(data).decode()
    for im in g.get('images',[]):
        p=f"{src}/{im['uri']}"; img=Image.open(p)
        base=os.path.splitext(os.path.basename(im['uri']))[0]
        sz=sizes(base)
        alpha = img.mode in ('RGBA','LA','P') and img.convert('RGBA').getextrema()[3][0]<250
        img=img.convert('RGBA' if alpha else 'RGB')
        if max(img.size)>sz: img=img.resize((sz,sz) if img.size[0]==img.size[1] else (sz, int(sz*img.size[1]/img.size[0])), Image.LANCZOS)
        fn=f"textures/{base}.{'png' if alpha else 'jpg'}"
        if alpha: img.save(f'{out}/{fn}', optimize=True)
        else: img.save(f'{out}/{fn}', quality=82, optimize=True)
        im['uri']=fn; im.pop('mimeType',None)
    json.dump(g, open(f'{out}/{name}.gltf','w'))
    tot=sum(os.path.getsize(os.path.join(dp,f)) for dp,_,fs in os.walk(out) for f in fs)
    print(name, round(tot/1e6,2),'MB', [ (im['uri']) for im in g.get('images',[])])
R='/home/user/dock-backer/models'
prep('dl/3e8c5275aeab487fa37d227ce0bd1a9a', R+'/cabover', 'cabover', lambda b: 2048 if 'main_body_baked_baseColor' in b else 1024)
prep('dl/904c9af9277d410c98c395fd9f8f9250', R+'/reefer', 'reefer', lambda b: 1024)
prep('dl/20f9af9b8a404d5cb022ac6fe87f21f5', R+'/cars', 'cars', lambda b: 512)
