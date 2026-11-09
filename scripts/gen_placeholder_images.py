# Generates original placeholder SVG illustrations (no external assets, no licence issues).
import os, random
PAL = {
 'dry':   dict(sky=('#f6d89a','#f2b66b'), sun='#fff3c8', hills=['#d9b27c','#c4955a','#a6763f'], ground='#8a5a2b'),
 'green': dict(sky=('#d9efe0','#a9d6b4'), sun='#fffbe0', hills=['#8fbf7a','#5f9a55','#2f6b3a'], ground='#1f4d2e'),
 'water': dict(sky=('#cfe8ee','#8cc3cf'), sun='#fff6d0', hills=['#9cc7a0','#5f9a7a','#2d6a5a'], ground='#1d4f4a'),
 'dusk':  dict(sky=('#f7c67a','#c9783f'), sun='#ffe9a8', hills=['#b98a55','#8d5d33','#5b3a1e'], ground='#3d2812'),
}
def scene(path, pal, w=1600, h=900, seed=1, trees=False, cracks=False, label=None, avatar=False):
    random.seed(seed); p = PAL[pal]; s=[]
    s.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid slice">')
    s.append(f'<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{p["sky"][0]}"/><stop offset="1" stop-color="{p["sky"][1]}"/></linearGradient></defs>')
    s.append(f'<rect width="{w}" height="{h}" fill="url(#g)"/>')
    sx = random.randint(int(w*.2), int(w*.8))
    s.append(f'<circle cx="{sx}" cy="{int(h*.30)}" r="{int(h*.11)}" fill="{p["sun"]}" opacity=".9"/>')
    for i, c in enumerate(p['hills']):
        base = h*(.50+.12*i); amp = h*.07
        pts=[f'0,{h}']
        for x in range(0, w+101, 100):
            pts.append(f'{x},{base - random.random()*amp*(1.6-i*.3):.0f}')
        pts.append(f'{w},{h}')
        s.append(f'<polygon points="{" ".join(pts)}" fill="{c}"/>')
    s.append(f'<rect y="{int(h*.88)}" width="{w}" height="{int(h*.12)}" fill="{p["ground"]}" opacity=".85"/>')
    if cracks:
        for _ in range(26):
            x=random.randint(0,w); y=random.randint(int(h*.88),h)
            s.append(f'<path d="M{x} {y} l{random.randint(-60,60)} {random.randint(5,25)} l{random.randint(-50,50)} {random.randint(5,25)}" stroke="#3d2812" stroke-width="3" fill="none" opacity=".5"/>')
    if trees:
        for _ in range(9):
            x=random.randint(60,w-60); y=int(h*(.78+random.random()*.12)); r=random.randint(18,34)
            s.append(f'<rect x="{x-3}" y="{y}" width="6" height="{r}" fill="#3d2812"/><circle cx="{x}" cy="{y}" r="{r}" fill="#2f6b3a"/><circle cx="{x-r//2}" cy="{y+r//3}" r="{r*.7:.0f}" fill="#3f8a4a"/>')
    if avatar:
        s=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#e8d9b8"/><circle cx="200" cy="160" r="70" fill="#b9a27a"/><path d="M60 400 C60 290 140 250 200 250 C260 250 340 290 340 400Z" fill="#b9a27a"/></svg>']
    if label and not avatar:
        s.append(f'<text x="{w-24}" y="{h-20}" text-anchor="end" font-family="sans-serif" font-size="22" fill="#fff" opacity=".75">Placeholder image – replace with a photograph</text>')
    s.append('</svg>')
    open(path,'w').write(''.join(s))
B='public/images/'
scene(B+'backgrounds/hero.svg','dry',seed=3,cracks=True)
scene(B+'backgrounds/hero-green.svg','green',seed=4,trees=True)
scene(B+'backgrounds/cta.svg','dusk',seed=5)
scene(B+'backgrounds/about.svg','green',seed=6,trees=True)
scene(B+'backgrounds/page-header.svg','dry',seed=7)
scene(B+'leadership/placeholder.svg','dry',avatar=True)
plan=['dry','green','water','green','dry','green','green','water','dusk']
for i,pal in enumerate(plan,1):
    scene(B+f'programmes/programme-{i}.svg',pal,w=1200,h=800,seed=10+i,trees=pal=='green',cracks=pal=='dry',label=True)
for i,pal in enumerate(['green','dry','water'],1):
    scene(B+f'articles/article-{i}.svg',pal,w=1200,h=800,seed=30+i,trees=pal=='green',label=True)
for i in range(1,9):
    pal=list(PAL)[i%4]
    scene(B+f'gallery/gallery-{i}.svg',pal,w=1000,h=800,seed=50+i,trees=pal=='green',label=True)
