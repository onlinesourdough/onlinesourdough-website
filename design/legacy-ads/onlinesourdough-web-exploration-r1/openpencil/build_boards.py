"""Construct original editable PenNode boards; no website code or copied assets."""
import json
import math
from pathlib import Path

HERE = Path(__file__).resolve().parent
PAPER, WHITE, INK, MUTED = '#F6F2E9', '#FFFCF5', '#29251F', '#686259'
LINE, RUST, MOSS, TINT = '#D8D0C2', '#8C492B', '#526B49', '#EAE3D6'


def fill(c):
    return [{'type': 'solid', 'color': c}]


def frame(name, x, y, w, h, bg=PAPER, border=None):
    n = dict(type='frame', name=name, x=x, y=y, width=w, height=h,
             layout='none', clipContent=True, fill=fill(bg), children=[])
    if border:
        n['stroke'] = dict(thickness=1, fill=fill(border), align='inside')
    return n


def add(p, n):
    p['children'].append(n)
    return n


def rect(p, x, y, w, h, c=LINE, r=0, stroke=None):
    n = dict(type='rectangle', name='Rule' if h <= 2 else 'Surface', x=x, y=y,
             width=w, height=h, fill=fill(c), cornerRadius=r)
    if stroke:
        n['stroke'] = dict(thickness=1, fill=fill(stroke))
    return add(p, n)


def text(p, content, x, y, w, size=18, c=INK, weight=400, mono=False, h=None):
    return add(p, dict(type='text', name=content.replace('\n', ' ')[:70],
                       content=content, x=x, y=y, width=w,
                       height=h or max(24, (content.count('\n') + 1) * size * 1.38 + 8),
                       fontFamily='IBM Plex Mono' if mono else 'Inter',
                       fontSize=size, fontWeight=weight, lineHeight=1.28,
                       textGrowth='fixed-width-height', fill=fill(c)))


def dot(p, x, y, d=10, c=RUST, hollow=False):
    n = dict(type='ellipse', name='Process node', x=x, y=y, width=d, height=d,
             fill=fill(PAPER if hollow else c))
    if hollow:
        n['stroke'] = dict(thickness=2, fill=fill(c))
    return add(p, n)


def connect(p, x1, y1, x2, y2, c=LINE, weight=2):
    # Axis-aligned elbow paths keep connectors editable and visually quiet.
    mid = (x1+x2)/2
    rect(p, min(x1, mid), y1, max(abs(mid-x1), 1), weight, c)
    rect(p, mid, min(y1, y2), weight, max(abs(y2-y1), 1), c)
    rect(p, min(mid, x2), y2, max(abs(x2-mid), 1), weight, c)


def button(p, label, x, y, w=224, dark=True):
    rect(p, x, y, w, 48, RUST if dark else PAPER, 4, None if dark else LINE)
    text(p, label, x+18, y+13, w-32, 15, WHITE if dark else INK, 600)


def eyebrow(p, label, x, y, w=750, c=RUST):
    text(p, label, x, y, w, 12, c, 500, True)


def mark(p, x, y, scale=3, c=INK):
    for row, pattern in enumerate(['00111100', '01111110', '11101111', '11011111', '01111110']):
        for col, v in enumerate(pattern):
            if v == '1':
                rect(p, x+col*scale, y+row*scale, scale-0.6, scale-0.6, c)


def pixel_work(p, x, y, w=360, variant=0, dark=False):
    fg = PAPER if dark else INK
    # Original dough-like open cluster. The grid opens to three task lines.
    for row in range(18):
        for col in range(23):
            dx, dy = (col-10.5)/10, (row-8.5)/8
            v = dx*dx + dy*dy
            if .28 < v < 1 and ((row*7+col*3+variant) % 5 != 0):
                size = 3 if (row+col) % 3 else 5
                rect(p, x+col*8, y+row*8, size, size, RUST if (row+col)%13 == 0 else fg)
    for i, label in enumerate(['CONTEXT', 'WORK', 'REVIEW']):
        xx, yy = x+230, y+12+i*64
        connect(p, x+172, y+65, xx-12, yy+13, TINT if dark else LINE)
        dot(p, xx-4, yy+8, 8, MOSS if i==2 else RUST)
        text(p, label, xx+14, yy+2, 124, 11, fg, 500, True)


def resource_motif(p, x=806, y=178):
    q=add(p,frame('Hero · original pixel workflow',x,y,250,174,WHITE))
    pixel_work(q,0,30,variant=2)
    for n in q['children']:
        for key in ['x','y','width','height','fontSize']:
            if key in n: n[key]*=.62


def board_header(p, number, title, sub):
    eyebrow(p, f'ONLINESOURDOUGH / DESIGN EXPLORATION / {number}', 64, 38)
    text(p, title, 64, 74, 2150, 44, INK, 600)
    text(p, sub, 66, 137, 2200, 19, MUTED)
    rect(p, 64, 187, 2312, 1)


def site_shell(parent, name, x, y, w=1108, h=1230, resource=False, bg=WHITE):
    p = add(parent, frame(name, x, y, w, h, bg, LINE))
    rect(p, 0, 0, w, 56, PAPER)
    if resource:
        rect(p, 0, 56, 56, h-56, PAPER)
        rect(p, 55, 0, 1, h)
        mark(p, 15, 20, 3)
        for yy in [84, 140, 196]:
            rect(p, 20, yy, 16, 2, MUTED)
            rect(p, 20, yy+6, 12, 2, MUTED)
        text(p, 'Open library', 78, 19, 130, 13, INK, 500)
        text(p, 'RESOURCES / HOME', 258, 20, 300, 11, MUTED, 400, True)
        text(p, 'Search     Account', w-200, 19, 180, 12, MUTED)
    else:
        mark(p, 30, 20, 3)
        text(p, 'onlinesourdough', 68, 17, 300, 18, INK, 500)
        text(p, 'Ways to work       Method       Resources ↗', w-470, 20, 438, 12, MUTED, 400, True)
    rect(p, 0, 55, w, 1)
    return p


def method(p, x, y, width=920, style='path'):
    labels = [('01', 'Understand', 'Find the real problem.'), ('02', 'Choose', 'Pick a useful change.'),
              ('03', 'Build', 'Make the solution.'), ('04', 'Run', 'Keep it working.')]
    step=width/4
    for i, (n,title,desc) in enumerate(labels):
        xx=x+i*step
        if i<3:
            rect(p, xx+14, y+6, step-14, 1, LINE)
        dot(p, xx, y, 12, MOSS if i==3 else RUST, i>0)
        eyebrow(p, n, xx, y+34, 50, MUTED)
        text(p, title, xx, y+58, step-12, 22, INK, 500)
        text(p, desc, xx, y+94, step-16, 14, MUTED)


def library(p, x, y, width=920):
    eyebrow(p, 'INSIDE THE LIBRARY', x, y)
    items=[('Explore', 'Start Here · Fundamentals · What’s New'),
           ('The Method', 'Understand · Choose · Build · Launch and run'),
           ('Open Source', 'AIOS Template · Solution Template · Skills'),
           ('In Practice', 'Arc’IT AI · AIOS Desktop · Power BI Template')]
    for i,(a,b) in enumerate(items):
        yy=y+38+i*58
        rect(p, x, yy, width, 1)
        text(p, a, x, yy+18, 210, 18, INK, 500)
        text(p, b, x+230, yy+20, width-270, 14, MUTED)
        text(p, '↗', x+width-18, yy+18, 25, 18)


def existing_card(p, x, y, w, label, num):
    rect(p, x, y, w, 164, WHITE, 8, LINE)
    eyebrow(p, '0'+str(num), x+16, y+14, 60)
    text(p, label, x+16, y+40, w-32, 20, INK, 600)
    rect(p, x+16, y+83, w-32, 63, TINT, 6)
    mark(p, x+w/2-20, y+100, 5, RUST)


def overview():
    p=frame('00 · Designkort — nu → inspiration → muligheder', 0, 0, 2440, 1540)
    board_header(p, '00', 'Samme forretning. En tydeligere indgang.',
                 'To eksisterende sider + én reference → tre variationer. Læs kortet øverst, og sammenlign A, B og C nedenunder.')
    cols=[(64,'01 / ONLINESOURDOUGH.COM'),(852,'02 / RESOURCES.ONLINESOURDOUGH.COM'),(1640,'03 / AGENTIC-ENGINEER.AI')]
    for x,label in cols:
        eyebrow(p,label,x,222,730)
    a=add(p,frame('Nuværende hovedside — forenklet rekonstruktion',64,265,736,524,WHITE,LINE))
    mark(a,24,20,3);text(a,'onlinesourdough',60,18,250,17)
    rect(a,24,58,688,1)
    text(a,'Build the business you\nwant to run.',115,85,520,32,INK,500)
    text(a,'Business problems → processes, AI, automation or software.',73,184,630,14,MUTED)
    for i,l in enumerate(['Content','Resources','The Fermentary','Complete Bake']):
        existing_card(a,24+i*174,247,162,l,i+1)
    text(a,'NU: Et varmt menukort med fire veje ind.',24,457,665,18,INK,500)
    text(a,'Mulighed: hurtigere overblik + et mere levende første møde.',24,491,680,14,MUTED)
    b=add(p,frame('Nuværende Resources — forenklet rekonstruktion',852,265,736,524,WHITE,LINE))
    rect(b,0,0,170,425,PAPER)
    text(b,'Resources',20,24,145,18,INK,500)
    for i,t in enumerate(['Home     Search','Explore','The Method','Open Source','In Practice']):
        text(b,t,20,82+i*59,146,13,MUTED if i else INK,500)
    text(b,'Give AI real work.\nKeep the system yours',206,72,485,31,INK,500)
    button(b,'Start Here →',207,186,166)
    rect(b,207,266,491,135,TINT,6)
    text(b,'MOTION PREVIEW / VIDEO',268,321,386,14,MUTED,500,True)
    text(b,'NU: Bibliotekets navigation fylder ved ankomst.',24,457,690,18,INK,500)
    text(b,'Mulighed: sammenfoldet sidebar + metode før bibliotek.',24,491,690,14,MUTED)
    c=add(p,frame('Reference — udledte principper, ingen kopierede assets',1640,265,736,524,WHITE,LINE))
    eyebrow(c,'INSPIRATION / IKKE EN SKABELON',26,26,680)
    for i,(t,d) in enumerate([('Luft og fine linjer','Enkel typografi og tydelig rytme.'),('Et levende fokuspunkt','ASCII-form reagerer på markøren.'),('Tilbud, man kan sammenligne','Rådgivning, workshops og et system.'),('Processen bliver synlig','Små diagrammer forklarer arbejdet.')]):
        yy=80+i*86
        dot(c,28,yy+7,7,RUST)
        text(c,t,52,yy,640,22,INK,500)
        text(c,d,52,yy+36,637,16,MUTED)
    text(c,'Bevar din varme identitet og egne løfter.',27,457,680,18,INK,500)
    text(c,'Nye originale diagrammer. Ingen kopierede priser eller claims.',27,491,680,14,MUTED)
    for xx in [432,1220,2008]:
        connect(p,xx,790,1220,875,LINE,2)
    central=add(p,frame('Fælles designidé',655,875,1130,160,INK))
    eyebrow(central,'FÆLLES IDÉ',28,22,900,TINT)
    text(central,'Gør arbejdet konkret. Giv første skærm mere plads.',28,58,1080,32,PAPER,500)
    text(central,'Varm minimalisme · egne pixeldiagrammer · forskellige CTA’er · Resources-sidebar sammenfoldet',28,112,1080,15,TINT)
    opts=[('A','Levende menukort','Behold strukturen. Skru op for udtrykket.','Laveste strukturelle ændring. Mere visuel ro.'),
          ('B','Tydeligere tilbud','Gør det nemmere at vælge hjælp.','Mit startpunkt: afklar tilbud uden at skjule DIY.'),
          ('C','Visuelt system','Lad selve processen bære historien.','Mest udtryksfuld. Kræver enkle forklaringer.')]
    for i,(n,t,d,trade) in enumerate(opts):
        x=64+i*788
        connect(p,1220,1035,x+368,1100)
        q=add(p,frame(n+' · mulighed',x,1100,736,252,WHITE,LINE))
        eyebrow(q,n+' / VARIATION',26,23,680)
        text(q,t,26,64,680,31,INK,600)
        text(q,d,26,116,680,19,MUTED)
        rect(q,26,164,684,1)
        text(q,trade,26,188,680,16,RUST if i==1 else MUTED)
    text(p,'Visuelt designforslag · engelske websitetekster er kladder · animationer vises som storyboard · ingen implementering',64,1410,2280,17,MUTED)
    return p


def paired(code,title,sub,y):
    p=frame(code+' · '+title,0,y,2440,1630)
    board_header(p,code,title,sub)
    eyebrow(p,'ONLINESOURDOUGH.COM / VÆLG EN VEJ TIL HJÆLP',64,215,1108)
    eyebrow(p,'RESOURCES.ONLINESOURDOUGH.COM / BRUG METODEN SELV',1268,215,1108)
    a=site_shell(p,code+' · main website',64,250)
    b=site_shell(p,code+' · Resources / collapsed rail',1268,250,resource=True)
    return p,a,b


def variation_a():
    p,a,b=paired('A','Det levende menukort','Tættest på dine sider i dag. Samme fire veje — mere luft, et roligere overblik og en original levende figur.',1720)
    eyebrow(a,'SAME BAKE / DIFFERENT DELIVERIES',48,115)
    text(a,'Build the business\nyou want to run.',48,164,640,51,INK,500)
    text(a,'Turn a real business problem into something\nyou can understand, run, and own.',48,305,620,18,MUTED)
    button(a,'Explore the ways to work ↓',48,390,272)
    pixel_work(a,708,164)
    eyebrow(a,'ONE PROBLEM. A FEW WAYS TO WORK ON IT.',48,514)
    items=[('01','Content','Ideas, experiments and examples.','Explore content ↗'),
           ('02','Resources','Use the method and build it yourself.','Open library ↗'),
           ('03','The Fermentary','Work through the problem with Gustav.','Work together ↗'),
           ('04','Complete Bake','Have the agreed solution delivered.','Start a project ↗')]
    for i,(n,t,d,cta) in enumerate(items):
        yy=562+i*105
        rect(a,48,yy,1012,1)
        eyebrow(a,n,48,yy+32,52)
        text(a,t,108,yy+28,305,25,INK,500)
        text(a,d,430,yy+34,408,16,MUTED)
        text(a,cta,858,yy+35,204,13,INK,500)
    rect(a,48,996,1012,1)
    text(a,'Start with the work that gets in the way.',48,1040,965,31,INK,500)
    text(a,'Understand the problem. Choose the smallest useful change.\nBuild a solution the business can keep.',48,1095,978,18,MUTED)
    eyebrow(b,'THE ONLINESOURDOUGH METHOD',104,115)
    text(b,'Give AI real work.\nKeep the system yours.',104,167,680,49,INK,500)
    resource_motif(b)
    text(b,'From one real business problem to a solution\nyou can understand, run, and own.',104,306,835,18,MUTED)
    button(b,'Start Here →',104,386,177)
    text(b,'See what’s inside ↓',306,402,340,14,MUTED)
    method(b,104,520,908)
    library(b,104,740,908)
    text(b,'Need a hand with your business problem?',104,1091,854,25,INK,500)
    text(b,'Explore ways to work with Gustav ↗',104,1138,850,16,RUST)
    text(p,'Hvorfor A: Du beholder dit menukort, men de store kort bliver lettere at overskue. Heroen kan bevæge sig uden at dominere.',64,1514,2310,18,MUTED)
    return p


def service_rows(p,x,y,w=1012):
    rows=[('01','Talk through one problem','A focused starting point with Gustav.','DWY / THE FERMENTARY'),
          ('02','Work on it with your team','A workshop around the work you actually do.','DWY / THE FERMENTARY'),
          ('03','Have the solution delivered','An agreed scope, a working solution, a handover.','DFY / COMPLETE BAKE')]
    for i,(n,t,d,tag) in enumerate(rows):
        yy=y+i*132
        rect(p,x,yy,w,1)
        dot(p,x+4,yy+37,10,RUST if i<2 else MOSS)
        text(p,t,x+42,yy+23,w-300,26,INK,500)
        text(p,d,x+42,yy+70,w-92,17,MUTED)
        eyebrow(p,tag,x+w-236,yy+34,232,MUTED)


def variation_b():
    p,a,b=paired('B','Gør tilbuddene lettere at vælge','Et tydeligere tilbudsrum på hovedsiden. Resources forbliver et sted at lære og arbejde — med hjælp som en separat mulighed.',3540)
    eyebrow(a,'FROM BUSINESS PROBLEM TO WORKING SOLUTION',48,112)
    text(a,'Make room for\nbetter work.',48,157,650,64,INK,600)
    text(a,'Useful AI, better processes and software you can own.\nStart with the business problem. Choose the help you need.',48,329,750,18,MUTED)
    button(a,'Find the right starting point ↓',48,416,312)
    pixel_work(a,740,174,variant=1)
    eyebrow(a,'WAYS TO WORK TOGETHER',48,530)
    service_rows(a,48,575)
    rect(a,48,994,1012,145,PAPER)
    text(a,'Prefer to build it yourself?',70,1018,875,26,INK,500)
    text(a,'Start with Resources. Follow the method and use the open-source tools.',70,1067,919,17,MUTED)
    text(a,'Open the library ↗',826,1104,234,15,RUST,500)
    text(a,'Public ideas and experiments → gustavonline',48,1173,980,14,MUTED)
    eyebrow(b,'A PRACTICAL HOME FOR YOUR AI WORK',104,113)
    text(b,'Give AI real work.\nKeep the system yours.',104,163,680,50,INK,600)
    resource_motif(b)
    text(b,'A method, open-source tools and examples.\nStart with one problem. Make the next step useful.',104,303,850,18,MUTED)
    button(b,'Start Here →',104,386,177)
    text(b,'Browse the library ↓',306,402,330,14,MUTED)
    rect(b,104,495,908,205,PAPER,8)
    eyebrow(b,'ONE REAL PROBLEM → A WORKING SOLUTION',128,516)
    method(b,130,559,850)
    library(b,104,758,908)
    rect(b,104,1093,908,1)
    text(b,'Work through it with Gustav',104,1122,728,25,INK,500)
    text(b,'See the ways to get help ↗',104,1167,830,15,RUST)
    text(p,'Mit startpunkt: B giver mere plads til tilbuddene. Rådgivning og workshop er forslag under DWY; pakker, omfang og pris skal afklares af dig.',64,1514,2300,18,RUST)
    return p


def systems(p,x,y,w=940,dark=False):
    fg=PAPER if dark else INK
    lc=MUTED if dark else LINE
    points=[(x,y+82,'BUSINESS CONTEXT'),(x+w*.36,y+10,'PLAN'),(x+w*.36,y+154,'DO THE WORK'),(x+w*.7,y+82,'REVIEW'),(x+w*.88,y+82,'OWN IT')]
    for aa,bb in [(0,1),(0,2),(1,3),(2,3),(3,4)]:
        connect(p,points[aa][0]+10,points[aa][1]+10,points[bb][0]+10,points[bb][1]+10,lc)
    for i,(xx,yy,t) in enumerate(points):
        dot(p,xx,yy,20,MOSS if i==4 else RUST)
        text(p,t,xx-25,yy+37,170,12,fg,500,True)


def variation_c():
    p,a,b=paired('C','Vis arbejdet som et system','Lad kontekst, agenter, review og ejerskab blive en synlig historie. Mest visuel — og mest afhængig af enkel forklaring.',5360)
    eyebrow(a,'FROM BUSINESS PROBLEM TO WORKING SOLUTION',48,112)
    text(a,'Better work starts\nwith the whole picture.',48,158,995,54,INK,500)
    text(a,'Find what slows the business down. Build the change that helps.',48,301,1000,19,MUTED)
    button(a,'Explore the approach ↓',48,356,260)
    panel=add(a,frame('Original process diagram / motion direction',48,457,1012,346,INK))
    eyebrow(panel,'YOUR BUSINESS / ONE CONNECTED WAY OF WORKING',28,25,940,TINT)
    systems(panel,48,91,880,True)
    text(panel,'Context stays with the business. Work passes through review.',28,300,945,15,TINT)
    eyebrow(a,'CHOOSE YOUR LEVEL OF HELP',48,866)
    for i,(t,d) in enumerate([('Learn in public','Ideas & examples ↗'),('Do it yourself','Resources ↗'),('Work with me','The Fermentary ↗'),('Have it delivered','Complete Bake ↗')]):
        x=48+i*253
        rect(a,x,913,232,1)
        eyebrow(a,'0'+str(i+1),x,934,90)
        text(a,t,x,977,240,23,INK,500)
        text(a,d,x,1027,232,15,RUST)
    text(a,'More control over time, capacity and direction.',48,1122,1010,29,INK,500)
    eyebrow(b,'THE METHOD / YOUR WORK, CONNECTED',104,112)
    text(b,'Give AI real work.\nKeep the system yours.',104,159,900,49,INK,500)
    text(b,'Follow the path from understanding the business\nto running something useful.',104,300,900,18,MUTED)
    button(b,'Start Here →',104,387,177)
    eyebrow(b,'FOLLOW THE METHOD',104,495)
    entries=[('Understand your business','Find the problem worth solving.','START HERE · FUNDAMENTALS'),
             ('Choose what to change','Choose a small, useful intervention.','METHOD · SOLUTION TEMPLATE'),
             ('Build the solution','Give the work context and review.','AIOS TEMPLATE · SKILLS'),
             ('Launch and run it','Keep the solution understandable and yours.','IN PRACTICE · AGENT WORK REVIEW')]
    for i,(t,d,tags) in enumerate(entries):
        yy=548+i*142
        if i<3: rect(b,111,yy+15,2,142,LINE)
        dot(b,104,yy+10,16,MOSS if i==3 else RUST,i>0)
        eyebrow(b,'0'+str(i+1),142,yy+8,90)
        text(b,t,205,yy,796,26,INK,500)
        text(b,d,205,yy+46,797,17,MUTED)
        eyebrow(b,tags,205,yy+86,770,MUTED)
    text(b,'Open the full library ↗',104,1161,851,16,RUST)
    text(p,'Hvorfor C: Diagrammet viser, hvad et sammenhængende system betyder. Behold hver forklaring tæt på det konkrete forretningsarbejde.',64,1514,2300,18,MUTED)
    return p


def motion_mobile():
    p=frame('04 · Motion + mobil — storyboard og beslutninger',0,7180,2440,1590)
    board_header(p,'04','Bevægelse med en forklaring. Ro, når man vil have ro.',
                 'Stillbilleder beskriver bevægelsen. OpenPencil-filen er redigerbar, men afspiller ikke animationerne.')
    for i,(title,desc) in enumerate([('01 / RO','En åben pixelform. Alle labels er læsbare.'),('02 / MARKØR ELLER TAP','En lokal forskydning, højst 8 px. Ingen scrollblokering.'),('03 / SYSTEM','Formen fordeler sig i kontekst, arbejde og review.')]):
        x=64+i*788
        q=add(p,frame(title,x,225,736,395,WHITE,LINE))
        eyebrow(q,title,25,22,680)
        if i<2: pixel_work(q,174+(12 if i else 0),106,variant=i)
        else: systems(q,58,90,615)
        text(q,desc,26,318,685,18,MUTED)
        if i<2:text(p,'→',x+751,412,32,25,RUST)
    eyebrow(p,'SCROLL / FRA FLASKEHALS TIL EN BRUGBAR ARBEJDSGANG',64,679,2310)
    method(p,66,734,1500)
    text(p,'500–800 ms, én gang pr. sektion.\nIndholdet er tilgængeligt før animationen.\nReduced motion: statisk sluttilstand.',1740,724,619,21,MUTED)
    rect(p,64,916,2312,1)
    eyebrow(p,'MOBIL / 390 PX / FÆLLES PRINCIP FOR A, B OG C',64,958,1580)
    m=add(p,frame('Mobile · Resources initial state',64,1007,390,510,WHITE,LINE))
    text(m,'☰  Menu',20,19,105,14,INK,500)
    text(m,'Resources',148,18,180,17,INK,500)
    rect(m,20,56,350,1)
    text(m,'Give AI real work.\nKeep the\nsystem yours.',24,96,342,36,INK,500)
    text(m,'One real business problem.\nA solution you can understand,\nrun, and own.',24,262,342,17,MUTED)
    button(m,'Start Here →',24,369,342)
    text(m,'See what’s inside ↓',24,445,342,16,RUST)
    m2=add(p,frame('Mobile · navigation expanded',520,1007,390,510,PAPER,LINE))
    text(m2,'Library navigation',24,22,282,20,INK,500)
    text(m2,'× Close',300,25,86,14,INK)
    rect(m2,24,65,342,1)
    for i,t in enumerate(['Search the library','Start Here','The onlinesourdough Method','Open Source','In Practice']):
        text(m2,t,24,92+i*64,342,18,INK,500 if i==1 else 400)
    text(m2,'Escape closes. Focus returns to Menu.',24,445,342,13,MUTED)
    text(p,'Det vigtigste at vælge nu',1000,1027,1260,33,INK,500)
    decisions=[('01','Udtryk','A’s ro, B’s tilbud eller C’s diagrammer?'),('02','Tilbud','Skal rådgivning og workshops være tydelige DWY-indgange?'),('03','Hero','En original pixelform med et kort workflow som slutbillede?')]
    for i,(n,t,d) in enumerate(decisions):
        yy=1104+i*115
        rect(p,1000,yy,1376,1)
        eyebrow(p,n,1000,yy+28,70)
        text(p,t,1070,yy+22,270,24,INK,500)
        text(p,d,1320,yy+28,1030,18,MUTED)
    text(p,'Pause ved længere loops · ingen autoplay ved reduced motion · tydelig tastaturfokus · 44 px trykflader',1000,1475,1370,15,MUTED)
    return p


def contain_surfaces(node):
    """Give overlaid content an explicit background parent for native rendering."""
    children=node.get('children', [])
    out=[]
    for n in children:
        # A filled rectangle is a container in the upstream renderer. Nest its
        # content explicitly so both the live canvas and native export agree.
        target=None
        for candidate in reversed(out):
            if candidate.get('_background'):
                x,y=candidate['x'],candidate['y']
                if (n.get('x',0)>=x and n.get('y',0)>=y and
                    n.get('x',0)+n.get('width',0)<=x+candidate['width']+.01 and
                    n.get('y',0)+n.get('height',0)<=y+candidate['height']+.01):
                    target=candidate
                    break
        if n['type']=='rectangle' and n['width']>50 and n['height']>30:
            n['type']='frame';n['layout']='none';n['clipContent']=False
            n['children']=[];n['_background']=True
        if target:
            n['x']-=target['x'];n['y']-=target['y']
            target['children'].append(n)
        else:
            out.append(n)
    node['children']=out
    for n in out:
        if n.get('children'):
            contain_surfaces(n)
        n.pop('_background',None)
    return node


if __name__ == '__main__':
    for name, builder in [('00-map',overview),('01-a',variation_a),('02-b',variation_b),('03-c',variation_c),('04-motion-mobile',motion_mobile)]:
        node=contain_surfaces(builder())
        (HERE / (name+'.json')).write_text(json.dumps(node,ensure_ascii=False,indent=2)+'\n')
        print(name, len(json.dumps(node)), 'bytes')
