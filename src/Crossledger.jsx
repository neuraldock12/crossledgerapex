import { useState, useRef, useEffect, useCallback, useMemo } from "react";

/* ------------------------------------------------------------------ *
 * Content. Everything the page says lives here, not in the markup.
 * ------------------------------------------------------------------ */

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&family=IBM+Plex+Mono:wght@400;500;600&display=swap");

.cl{
  --ink:#0F1138;
  --ink-2:#1A1D4F;
  --ink-3:#242863;
  --brand:#0D2FFF;
  --brand-lt:#4E6BFF;
  --brand-dk:#0D2FFF;
  --accent:#8AA0FF;
  --alert:#C22E21;
  --alert-lt:#FF9187;
  --cream:#F4F2EC;
  --paper:#FFFFFF;
  --rule:#DFDCD2;
  --rule-2:#B9B5A8;
  --ok:#0D2FFF;
  --muted:#5C5F73;
  --on-ink:#C7CBE4;
  --on-ink-hi:#FFFFFF;

  --display:"Archivo",system-ui,sans-serif;
  --body:"Archivo",system-ui,sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,monospace;

  --row:34px;
  --gut:clamp(20px,5vw,64px);
  --max:1180px;
}

.cl,.cl *,.cl *::before,.cl *::after{box-sizing:border-box}
.cl{
  margin:0;
  background:var(--cream);
  color:var(--ink);
  font-family:var(--body);
  font-size:17px;
  line-height:1.62;
  font-weight:400;
  font-optical-sizing:auto;
}
.cl a{color:inherit}
.cl img{max-width:100%}

.wrap{max-width:var(--max);margin:0 auto;padding-inline:var(--gut)}

.cl h1,.cl h2,.cl h3,.cl .dsp{
  font-family:var(--display);
  font-stretch:118%;
  font-weight:600;
  letter-spacing:-.015em;
  line-height:1.05;
  margin:0;
}
.cl h1{font-size:clamp(34px,6.1vw,72px);font-weight:700}
.cl h2{font-size:clamp(27px,3.9vw,44px)}
.cl h3{font-size:clamp(19px,2.1vw,24px);font-stretch:106%}
.cl p{margin:0 0 1em}

.eyebrow{
  font-family:var(--mono);
  font-size:11px;
  font-weight:600;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--muted);
  margin:0 0 18px;
  display:flex;align-items:center;gap:10px;
}
.eyebrow::after{content:"";height:1px;flex:1;background:currentColor;opacity:.35}

/* ---------- nav ---------- */
.nav{
  position:sticky;top:0;z-index:20;
  background:var(--ink);
  border-bottom:1px solid rgba(255,255,255,.09);
}
.nav__in{
  max-width:var(--max);margin:0 auto;padding:14px var(--gut);
  display:flex;align-items:center;gap:18px;
}
.logo{
  font-family:var(--display);font-stretch:118%;font-weight:700;
  font-size:18px;letter-spacing:-.02em;color:var(--on-ink-hi);
  text-decoration:none;display:flex;align-items:center;gap:9px;
}
.logo__t{display:flex;flex-direction:column;line-height:1.02}
.logo__t small{
  font-family:var(--mono);font-size:8.5px;font-weight:400;letter-spacing:.13em;
  text-transform:uppercase;opacity:.62;margin-top:3px;
}
.foot .logo__t small{opacity:.75}
.logo__mk{width:15px;height:15px;flex:none;display:block}
.nav__sp{flex:1}
.nav__note{
  font-family:var(--mono);font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;color:rgba(199,203,228,.6);
}
@media(max-width:720px){.nav__note{display:none}}

.btn{
  font-family:var(--mono);font-size:12px;font-weight:600;
  letter-spacing:.09em;text-transform:uppercase;
  padding:11px 17px;text-decoration:none;display:inline-block;
  border:1.5px solid var(--brand);background:var(--brand);color:#fff;
  transition:background .16s ease,color .16s ease;
}
.btn:hover{background:transparent;color:var(--brand)}
.nav .btn:hover{color:var(--accent);border-color:var(--accent)}
.btn--ghost{background:transparent;border-color:currentColor;color:inherit}
.btn--ghost:hover{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.cl a:focus-visible,.cl button:focus-visible{outline:2.5px solid var(--brand);outline-offset:3px}
.cl .nav a:focus-visible{outline-color:var(--accent)}

/* ---------- hero ---------- */
.hero{background:var(--ink);color:var(--on-ink);padding:clamp(52px,8vw,96px) 0 clamp(56px,8vw,104px)}
.hero .eyebrow{color:rgba(199,203,228,.62)}
.hero h1{color:var(--on-ink-hi);max-width:15ch}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero__sub{
  max-width:56ch;margin:26px 0 0;font-size:clamp(16.5px,1.8vw,20px);font-weight:300;
  color:rgba(199,203,228,.85);
}
.hero__cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.hero .btn--ghost{color:var(--on-ink)}
.hero .btn--ghost:hover{background:var(--on-ink-hi);color:var(--ink);border-color:var(--on-ink-hi)}

/* ---------- signature: the seam ---------- */
.seam{margin-top:clamp(44px,6vw,72px)}
.seam__bar{
  display:flex;flex-wrap:wrap;gap:8px 22px;align-items:baseline;
  font-family:var(--mono);font-size:11px;letter-spacing:.13em;text-transform:uppercase;
  color:rgba(199,203,228,.55);
  padding-bottom:11px;border-bottom:1px solid rgba(255,255,255,.16);
}
.seam__bar b{color:var(--on-ink-hi);font-weight:600}
.seam__live{display:flex;align-items:center;gap:7px;color:var(--accent)}
.dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 1.9s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}

.seam__head{
  display:grid;grid-template-columns:1fr 46px 1fr;
  font-family:var(--mono);font-size:10.5px;letter-spacing:.15em;text-transform:uppercase;
  color:rgba(199,203,228,.5);padding:14px 0 9px;
}
.seam__head span:last-child{text-align:left}
@media(max-width:760px){.seam__head{display:none}}

.seam__rows{display:flex;flex-direction:column;gap:8px}

.rec{
  display:grid;grid-template-columns:1fr 46px 1fr;align-items:stretch;
  opacity:0;transform:translateY(9px);
  animation:in .5s cubic-bezier(.2,.7,.3,1) forwards;
}
.rec:nth-child(1){animation-delay:.20s}
.rec:nth-child(2){animation-delay:.42s}
.rec:nth-child(3){animation-delay:.64s}
.rec:nth-child(4){animation-delay:.86s}
.rec:nth-child(5){animation-delay:1.08s}
@keyframes in{to{opacity:1;transform:none}}

.cell{
  background:var(--paper);padding:13px 15px;min-height:76px;
  border-top:2px solid transparent;
}
.cell--l{border-left:3px solid var(--rule-2)}
.cell--r{border-left:3px solid var(--rule)}
.rec--flag .cell--r{border-left-color:var(--alert)}
.rec--ok .cell--r{border-left-color:var(--ok)}

.cell__k{
  font-family:var(--mono);font-size:11px;letter-spacing:.06em;
  color:var(--muted);display:flex;gap:10px;flex-wrap:wrap;
}
.cell__k b{color:var(--ink);font-weight:600}
.cell__v{
  font-family:var(--mono);font-size:14.5px;font-weight:500;
  margin-top:6px;line-height:1.4;color:var(--ink);
}
.cell__v .amt{font-weight:600}
.cell__v .neg{color:var(--alert)}
.cell__v .pos{color:var(--ok)}
.cell__t{
  font-family:var(--body);font-size:13.5px;font-weight:400;line-height:1.4;
  color:var(--muted);margin-top:5px;
}
.cell--muted .cell__v{color:var(--muted)}

.mark{
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:15px;font-weight:600;
  color:rgba(199,203,228,.4);
  position:relative;
}
.mark::before{
  content:"";position:absolute;left:0;right:0;top:50%;height:1px;
  background:rgba(255,255,255,.16);
}
.mark span{
  position:relative;z-index:1;background:var(--ink);
  width:28px;height:28px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  border:1.5px solid currentColor;
  animation:stamp .34s cubic-bezier(.2,1.5,.4,1) both;
  animation-delay:inherit;
}
.rec--flag .mark{color:var(--alert-lt)}
.rec--ok .mark{color:var(--accent)}
.rec:nth-child(1) .mark span{animation-delay:.62s}
.rec:nth-child(2) .mark span{animation-delay:.84s}
.rec:nth-child(3) .mark span{animation-delay:1.06s}
.rec:nth-child(4) .mark span{animation-delay:1.28s}
.rec:nth-child(5) .mark span{animation-delay:1.50s}
@keyframes stamp{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}

@media(max-width:760px){
  .rec{grid-template-columns:1fr;gap:0}
  .mark{height:34px;justify-content:flex-start;padding-left:15px;background:var(--ink)}
  .mark::before{display:none}
  .cell{min-height:0}
}

.seam__foot{
  margin-top:14px;font-family:var(--mono);font-size:11px;letter-spacing:.11em;
  text-transform:uppercase;color:rgba(199,203,228,.45);
}

/* ---------- generic section ---------- */
.sec{padding:clamp(64px,9vw,112px) 0}
.sec--white{background:var(--paper)}
.sec__lede{max-width:60ch;margin-top:20px;font-size:clamp(16.5px,1.7vw,19px);font-weight:300;color:#2A2D52}

/* ---------- findings ---------- */
.finds{display:grid;gap:26px;margin-top:clamp(40px,5vw,60px)}
@media(min-width:900px){.finds{grid-template-columns:repeat(3,1fr);gap:22px}}

.find{background:var(--cream);border-top:3px solid var(--alert);padding:26px 24px 24px;display:flex;flex-direction:column}
.sec--white .find{background:var(--cream)}
.find__tag{
  font-family:var(--mono);font-size:10.5px;font-weight:600;letter-spacing:.15em;
  text-transform:uppercase;color:var(--alert);margin-bottom:14px;
}
.find h3{margin-bottom:12px;max-width:18ch}
.find p{font-size:15.5px;font-weight:300;color:#3A3D63;margin-bottom:20px}
.find__art{
  margin-top:auto;background:var(--paper);
  border-left:3px solid var(--rule-2);padding:12px 14px;
  font-family:var(--mono);font-size:12.5px;line-height:1.75;
}
.find__art i{font-style:normal;color:var(--muted);display:inline-block;min-width:62px}
.find__art .neg{color:var(--alert);font-weight:600}
.find__art .pos{color:var(--ok);font-weight:600}
.find__art .strike{text-decoration:line-through;text-decoration-color:var(--alert);text-decoration-thickness:1.5px}

/* ---------- run / sequence ---------- */
.run{margin-top:clamp(40px,5vw,58px);border-top:1px solid var(--rule)}
.step{
  display:grid;grid-template-columns:64px 1fr;gap:0 22px;
  padding:24px 0;border-bottom:1px solid var(--rule);align-items:start;
}
@media(min-width:860px){
  .step{grid-template-columns:64px minmax(0,24ch) 1fr;gap:0 34px;align-items:baseline}
}
.step__n{
  font-family:var(--mono);font-size:12px;font-weight:600;letter-spacing:.08em;
  color:var(--brand);padding-top:4px;
}
.step h3{margin-bottom:8px}
.step p{margin:0;font-size:15.5px;font-weight:300;color:#3A3D63;max-width:58ch}
@media(max-width:859px){.step p{grid-column:2}}

/* ---------- evidence graph ---------- */
.floor{background:var(--ink);color:var(--on-ink);padding:clamp(64px,9vw,110px) 0}
.floor .eyebrow{color:rgba(199,203,228,.6)}
.floor h2{color:var(--on-ink-hi);max-width:20ch}
.floor__lede{max-width:60ch;margin-top:20px;font-size:clamp(16.5px,1.7vw,19px);font-weight:300;color:rgba(199,203,228,.82)}

.gr{margin-top:clamp(38px,5vw,56px);position:relative}
.gr__svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}

/* two explicit rows: labels align across all three columns, content starts on one line */
.gr__grid{
  position:relative;z-index:1;display:grid;gap:0;
  grid-template-areas:"l1" "c1" "l2" "c2" "l3" "c3";
}
@media(min-width:900px){
  .gr__grid{
    grid-template-columns:minmax(0,1fr) 190px minmax(0,1.05fr);
    grid-template-rows:auto minmax(0,1fr);
    grid-template-areas:
      "l1 l2 l3"
      "c1 c2 c3";
    column-gap:46px;row-gap:0;align-items:stretch;
  }
}

.gr__lbl{
  font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(199,203,228,.45);margin:22px 0 9px;
}
.gr__lbl--1{grid-area:l1;margin-top:0}
.gr__lbl--2{grid-area:l2}
.gr__lbl--3{grid-area:l3}
@media(min-width:900px){
  .gr__lbl{margin:0 0 11px}
  .gr__lbl--2{text-align:center}
}

/* equal-height tiles so the connector endpoints land at even intervals */
.gr__col--src{grid-area:c1;display:grid;grid-auto-rows:1fr;gap:10px}
.gr__col--hub{grid-area:c2;display:flex;align-items:center}
.gr__col--out{grid-area:c3;display:flex}

.src{
  display:grid;grid-template-columns:15px minmax(0,1fr);gap:0 12px;align-content:center;
  text-align:left;width:100%;
  background:var(--ink-2);border:1px solid rgba(255,255,255,.14);
  border-left:3px solid var(--accent);
  padding:13px 15px;cursor:pointer;color:inherit;font:inherit;
  transition:background .18s ease,border-color .18s ease,opacity .18s ease;
}
.src:hover{background:var(--ink-3)}
.src__tk{
  width:15px;height:15px;margin-top:2px;border:1.5px solid var(--accent);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:10px;line-height:1;color:var(--ink);
  background:var(--accent);transition:all .18s ease;
}
.src__tk::after{content:"\\2713"}
.src__b{display:block;min-width:0}
.src__n{
  display:block;font-family:var(--display);font-stretch:112%;font-weight:600;
  font-size:15px;color:var(--on-ink-hi);line-height:1.2;
}
.src__d{
  display:block;font-family:var(--mono);font-size:11.5px;
  color:rgba(199,203,228,.6);margin-top:5px;line-height:1.45;
}
.src[aria-pressed="false"]{border-left-color:rgba(255,255,255,.2);opacity:.5}
.src[aria-pressed="false"] .src__tk{background:transparent;border-color:rgba(255,255,255,.3);color:transparent}
.src[aria-pressed="false"] .src__tk::after{content:""}

.hub{
  width:100%;background:var(--brand);color:#fff;padding:22px 16px;text-align:center;
  border:1px solid var(--brand);
}
.hub__n{font-family:var(--display);font-stretch:118%;font-weight:700;font-size:19px;line-height:1.15;margin:0}
.hub__m{font-family:var(--mono);font-size:11px;margin:10px 0 0;opacity:.85}
@media(max-width:899px){.hub{margin:0}}

.out{
  display:flex;flex-direction:column;flex:1;min-width:0;
  background:var(--paper);color:var(--ink);border-top:3px solid var(--brand);
  padding:20px 20px 18px;
}
.out__top{
  display:flex;align-items:baseline;justify-content:space-between;gap:14px;
  border-bottom:1px solid var(--rule);padding-bottom:14px;flex:none;
}
.out__t{font-family:var(--display);font-stretch:112%;font-weight:600;font-size:17px;max-width:16ch;line-height:1.15;margin:0}
.out__sc{flex:none;text-align:right}
.out__s{font-family:var(--display);font-stretch:118%;font-weight:700;font-size:38px;line-height:1;letter-spacing:-.02em;margin:0}
.out__s.lo{color:var(--alert)}
.out__s.mid{color:#6E7290}
.out__s.hi{color:var(--ok)}
.out__sk{font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin:6px 0 0}

.chk{
  display:grid;grid-template-columns:19px minmax(0,1fr);gap:0 11px;align-content:center;
  flex:1;padding:13px 0;border-bottom:1px solid var(--rule);
}
.chk:last-of-type{border-bottom:0;padding-bottom:2px}
.chk__m{
  width:19px;height:19px;margin-top:1px;border:1.5px solid var(--ok);color:var(--ok);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:11px;font-weight:600;line-height:1;
}
.chk__b{display:block;min-width:0}
.chk__q{
  display:block;font-family:var(--display);font-stretch:106%;font-weight:600;
  font-size:14.5px;line-height:1.25;
}
.chk__r{
  display:block;font-family:var(--mono);font-size:11.5px;color:var(--muted);
  margin-top:5px;line-height:1.45;
}
.chk--off .chk__m{border-color:var(--alert);color:var(--alert)}
.chk--off .chk__q{color:var(--muted)}
.chk--off .chk__r{color:var(--alert)}

.gr__hint{
  margin-top:18px;font-family:var(--mono);font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;color:rgba(199,203,228,.45);
}

.flow{fill:none;stroke-width:1.5;stroke:rgba(255,255,255,.18)}
.flow.on{stroke:var(--accent);stroke-opacity:.55;stroke-dasharray:5 9;animation:march 1.1s linear infinite}
.flow.trunk.on{stroke:var(--accent);stroke-opacity:.7}
@keyframes march{to{stroke-dashoffset:-14}}

/* ---------- resolution ---------- */
.res{display:grid;gap:22px;margin-top:clamp(38px,5vw,54px)}
@media(min-width:960px){.res{grid-template-columns:1.05fr .95fr;gap:26px;align-items:start}}

.gate{
  display:inline-flex;align-items:center;gap:10px;margin-top:26px;
  background:var(--cream);border-left:3px solid var(--ok);padding:11px 15px;
  font-family:var(--mono);font-size:12px;line-height:1.45;color:#2A2D52;max-width:62ch;
}
.gate b{color:var(--ok);font-weight:600}

.call{background:var(--ink);color:var(--on-ink);padding:20px 20px 22px}
.call__h{
  display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;padding-bottom:13px;
  border-bottom:1px solid rgba(255,255,255,.15);
  font-family:var(--mono);font-size:10px;letter-spacing:.15em;text-transform:uppercase;
  color:rgba(199,203,228,.5);
}
.call__h b{color:var(--on-ink-hi);font-weight:600}
.ln{display:grid;grid-template-columns:52px 1fr;gap:0 14px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.08)}
.ln:last-child{border-bottom:0;padding-bottom:2px}
.ln__t{font-family:var(--mono);font-size:10.5px;color:rgba(199,203,228,.38);padding-top:3px}
.ln__w{font-family:var(--body);font-size:15px;font-weight:300;line-height:1.5;color:rgba(199,203,228,.9)}
.ln__s{
  font-family:var(--mono);font-size:9.5px;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;display:block;margin-bottom:5px;
}
.ln--a .ln__s{color:var(--accent)}
.ln--p .ln__s{color:var(--accent)}
.ln--p .ln__w{color:rgba(199,203,228,.62)}

.stmt{background:var(--paper);border:1px solid var(--rule);border-top:3px solid var(--brand)}
.stmt__h{padding:16px 18px 14px;border-bottom:1px solid var(--rule)}
.stmt__b{font-family:var(--display);font-stretch:112%;font-weight:600;font-size:15px}
.stmt__m{font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:5px}
.stmt__rows{padding:4px 18px}
.sr{display:flex;justify-content:space-between;gap:16px;padding:11px 0;border-bottom:1px solid var(--rule);font-family:var(--mono);font-size:13px}
.sr__k{color:var(--muted)}
.sr__k small{display:block;font-size:10.5px;letter-spacing:.06em;margin-top:3px;color:var(--rule-2)}
.sr__v{font-weight:500;white-space:nowrap}
.sr--pay .sr__v{color:var(--ok);font-weight:600}
.sr--owe{border-bottom:0;padding:15px 0 4px;align-items:baseline}
.sr--owe .sr__k{font-family:var(--display);font-stretch:112%;font-weight:600;font-size:15px;color:var(--ink)}
.sr--owe .sr__v{font-family:var(--display);font-stretch:118%;font-weight:700;font-size:29px;letter-spacing:-.02em}
.stmt__f{padding:14px 18px 18px;background:var(--cream);border-top:1px solid var(--rule)}
.stmt__fk{font-family:var(--mono);font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:11px}
.pays{display:grid;gap:8px}
@media(min-width:420px){.pays{grid-template-columns:repeat(3,1fr)}}
.pay{
  border:1.5px solid var(--ink);background:transparent;padding:11px 10px;text-align:center;
  font-family:var(--mono);font-size:11.5px;line-height:1.4;color:var(--ink);cursor:pointer;
  transition:background .16s ease,color .16s ease;
}
.pay b{display:block;font-size:13px;font-weight:600;margin-bottom:3px}
.pay:hover{background:var(--ink);color:var(--paper)}
.pay--sel{background:var(--brand);border-color:var(--brand);color:#fff}
.pay--sel:hover{background:var(--brand);color:#fff}

/* ---------- proof strip ---------- */
.strip{background:var(--ink);color:var(--on-ink);padding:clamp(40px,5vw,56px) 0}
.strip__g{display:grid;gap:26px}
@media(min-width:820px){.strip__g{grid-template-columns:repeat(4,1fr);gap:20px}}
.strip__i .k{
  font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(199,203,228,.5);margin-bottom:9px;
}
.strip__i .v{font-family:var(--display);font-stretch:112%;font-weight:600;font-size:18px;color:var(--on-ink-hi);line-height:1.25}

/* ---------- cta ---------- */
.cta{background:var(--brand-dk);color:#fff;padding:clamp(60px,8vw,96px) 0}
.cta h2{color:#fff;max-width:17ch}
.cta p{max-width:52ch;margin-top:18px;font-size:clamp(16.5px,1.7vw,19px);font-weight:300;color:rgba(255,255,255,.9)}
.cta .btn{background:#fff;color:var(--brand-dk);border-color:#fff;margin-top:26px}
.cta .btn:hover{background:transparent;color:#fff}
.cta a:focus-visible{outline-color:#fff}

/* ---------- footer ---------- */
.foot{background:var(--ink);color:rgba(199,203,228,.55);padding:34px 0}
.foot__in{display:flex;flex-wrap:wrap;gap:14px 26px;align-items:center;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase}
.foot__in .logo{font-size:15px}
.foot__sp{flex:1}

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
  .rec{opacity:1;transform:none}
}

`;

const BRAND = "Crossledger";
const PARENT = "by Apex Reimbursements";

const SOURCES = [
  { k: "ledger", w: 30, name: "PMS ledger",        desc: "Read-only. What your practice recorded." },
  { k: "portal", w: 25, name: "Payer portals",     desc: "Agents pull live claim status, payer by payer." },
  { k: "voice",  w: 15, name: "Voice agents",      desc: "The payers with no usable portal. On hold so no one else is." },
  { k: "eob",    w: 24, name: "EOB & ERA 835",     desc: "Line-level detail of what was actually paid." },
  { k: "edi",    w: 6,  name: "Clearinghouse 277", desc: "Submission and acceptance trail." },
];

const CHECKS = [
  {
    k: "received",
    q: "Did the payer ever receive it?",
    needs: (s) => s.ledger && (s.portal || s.voice),
    on: "Portal or voice confirms status on every open claim.",
    off: "Without a payer channel, a pending claim is just a guess.",
  },
  {
    k: "missing",
    q: "Are there claims your ledger never recorded?",
    needs: (s) => s.ledger && (s.portal || s.edi),
    on: "Payer-side claim list compared against the ledger, both ways.",
    off: "Claims paid but never recorded stay invisible.",
  },
  {
    k: "posted",
    q: "Does every dollar paid tie to a dollar posted?",
    needs: (s) => s.ledger && s.eob,
    on: "Every EOB dollar totalled and matched to posted payments.",
    off: "Paid totals cannot be validated against the ledger.",
  },
  {
    k: "proof",
    q: "Can you prove it to the payer?",
    needs: (s) => s.eob && (s.portal || s.voice),
    on: "EOB, portal capture and submission trail attached to each exception.",
    off: "Findings without documentation are an argument, not evidence.",
  },
];

const RECS = [
  {
    state: "flag", mark: "✕",
    l: { id: "#4471", meta: ["D2740 crown", "DOS 04/18/26"], v: "$1,240.00", note: "· pending 114 days" },
    r: { id: "Delta Dental portal", meta: ["checked 08/09"], v: "No record on file", neg: true,
         t: "Never received. 26 days left to file." },
  },
  {
    state: "flag", mark: "!",
    l: { id: "#4288", meta: ["D3330 endo", "DOS 01/09/26"], v: "$1,015.00", note: "· pending" },
    r: { id: "EOB 22-8841", meta: ["paid 01/22/26"], amt: "$812.00", after: " paid",
         t: "Adjudicated 199 days ago. Never posted." },
  },
  {
    state: "flag", mark: "+", muted: true,
    l: { id: "—", meta: ["no ledger entry"], v: "—" },
    r: { id: "#4501", meta: ["D2950 buildup", "DOS 05/02/26"], amt: "$284.00", after: " paid",
         t: "Claim exists at payer. Absent from ledger." },
  },
  {
    state: "flag", mark: "≠",
    l: { id: "#4102", meta: ["D4341 SRP", "DOS 11/27/25"], v: "$310.00", note: "· posted paid in full" },
    r: { id: "EOB 19-4402", meta: ["paid 12/14/25"], amt: "$186.00", after: " paid", negTail: "· $124.00 short",
         t: "Overposted. Patient balance understated." },
  },
  {
    state: "ok", mark: "✓",
    l: { id: "#4390", meta: ["D0274 bitewings", "DOS 03/02/26"], v: "$68.00", note: "· posted" },
    r: { id: "EOB 20-1173", meta: ["paid 03/14/26"], pos: "$54.40", after: " paid · reconciled",
         t: "Ledger and payer agree." },
  },
];

const FINDS = [
  {
    tag: "Exception 01, Not received",
    h: "Claims the payer never got",
    p: `For every open claim in your ledger, ${BRAND} confirms status at the portal, and flags the ones that were never delivered, while there's still time to refile.`,
    art: [["Ledger", "pending · 114 days"], ["Portal", "no record on file", "neg"], ["Clock", "26 days to timely filing"]],
  },
  {
    tag: "Exception 02, Unrecorded",
    h: "Claims your ledger never got",
    p: "The reverse check. Claims that were submitted and adjudicated at the payer but never made it back into the PMS, meaning invisible production and invisible revenue.",
    art: [["Portal", "paid 05/02/26", "pos"], ["Ledger", "no matching entry", "neg"], ["Value", "$284.00 unrecorded"]],
  },
  {
    tag: "Exception 03, Unreconciled",
    h: "Money that was paid but never posted",
    p: `${BRAND} totals every dollar the payer actually paid across 24 months and validates it against what's posted, so underposted, misposted and unposted payments surface as line items instead of write-offs.`,
    art: [["Payer", "$412,880 paid"], ["Posted", "$389,405", "strike:$412,880"], ["Delta", "$23,475 unposted", "neg"]],
  },
];

const STEPS = [
  ["Connect the PMS", `Read-only access to your Eaglesoft database. ${BRAND} never writes to your ledger.`],
  ["Read the ledger", "Every open and processed claim in the last 24 months, with dates of service, CDT codes, billed amounts, posted payments and adjustments."],
  ["Work the payers", `${BRAND} signs into each payer portal and calls the ones without usable portals, pulling live claim status and full EOB detail for every claim in the window.`],
  ["Rebuild the account", "Ledger and payer records are matched claim by claim to reconstruct what actually happened to each patient account: submitted, received, adjudicated, paid, posted."],
  ["Hand you the exceptions", "A worklist of every discrepancy, sorted by recoverable dollars and days to timely filing, with the EOB and portal screenshot attached as evidence."],
  ["Resolve the balance", "Accounts that reconcile clean move straight to collection, the patient gets a call, the evidence behind the number, and a way to pay it the same day."],
];

const CALL = [
  ["a", "00:04", "Agent",   "Hi Maria, I'm calling from Northgate Dental about the balance on your account. Is now a good time?"],
  ["p", "00:11", "Patient", "I thought insurance covered all of that."],
  ["a", "00:15", "Agent",   "Most of it. We went back through two years with Delta. They paid $2,051.60 of the $2,565 billed across three visits, and what's left is your coinsurance on each one, $513.40 in total. I've just texted you the statement with Delta's EOBs attached, so you can see their numbers next to ours."],
  ["p", "00:38", "Patient", "Okay, I see it. That's more than I have this week."],
  ["a", "00:44", "Agent",   "Then let's split it into four payments of $128.35, no interest, first one today. Or twelve months at $42.78 if you'd rather go smaller."],
  ["p", "00:53", "Patient", "Yes, do that."],
];

const STATEMENT = [
  { k: "D2740 crown", s: "DOS 04/18/26 · EOB 24-9012", v: "$186.40" },
  { k: "D3330 endo",  s: "DOS 01/09/26 · EOB 22-8841", v: "$203.00" },
  { k: "D4341 SRP",   s: "DOS 11/27/25 · EOB 19-4402", v: "$124.00" },
  { k: "Delta Dental paid", s: "$2,051.60 of $2,565.00 billed", v: "reconciled", mod: "pay" },
  { k: "Your balance", s: null, v: "$513.40", mod: "owe" },
];

const PLANS = [
  { k: "full",  big: "$513.40",    sub: "in full" },
  { k: "four",  big: "4 × $128.35", sub: "0% · biweekly" },
  { k: "year",  big: "12 × $42.78", sub: "financed" },
];

const STRIP = [
  ["Lookback", "24 months of\nclaim history"],
  ["Sources", "Payer portals\nand phone lines"],
  ["Access", "Read-only\non your PMS"],
  ["Output", "Recovered claims\nand collected balances"],
];

/* ------------------------------------------------------------------ */

export default function Crossledger() {
  const [on, setOn] = useState(
    () => Object.fromEntries(SOURCES.map((s) => [s.k, true]))
  );
  const [plan, setPlan] = useState("four");
  const [edges, setEdges] = useState({ paths: [], trunk: null, w: 0, h: 0 });

  const grRef = useRef(null);
  const hubRef = useRef(null);
  const outRef = useRef(null);
  const srcRefs = useRef([]);

  const toggle = (k) => setOn((prev) => ({ ...prev, [k]: !prev[k] }));

  const results = useMemo(() => CHECKS.map((c) => ({ ...c, pass: c.needs(on) })), [on]);
  const activeCount = SOURCES.filter((s) => on[s.k]).length;

  const score = useMemo(() => {
    const pts = SOURCES.reduce((a, s) => a + (on[s.k] ? s.w : 0), 0);
    const answered = results.filter((r) => r.pass).length;
    return Math.round(pts * (answered / CHECKS.length));
  }, [on, results]);

  const scoreTone = score >= 85 ? "hi" : score >= 45 ? "mid" : "lo";

  /* connector geometry, measured from the DOM so it survives any reflow */
  const draw = useCallback(() => {
    const gr = grRef.current, hub = hubRef.current, out = outRef.current;
    if (!gr || !hub || !out) return;
    const box = gr.getBoundingClientRect();
    if (!box.width) return;
    const wide = window.innerWidth >= 900;
    const hb = hub.getBoundingClientRect();
    const hx = hb.left - box.left, hy = hb.top - box.top;

    const paths = SOURCES.map((s, i) => {
      const el = srcRefs.current[i];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const x1 = wide ? r.right - box.left : r.left - box.left + r.width / 2;
      const y1 = wide ? r.top - box.top + r.height / 2 : r.bottom - box.top;
      const x2 = wide ? hx : hx + hb.width / 2;
      const y2 = wide ? hy + hb.height / 2 : hy;
      const m = (x1 + x2) / 2;
      return {
        k: s.k,
        d: wide
          ? `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`
          : `M${x1},${y1} L${x2},${y2}`,
      };
    }).filter(Boolean);

    const ob = out.getBoundingClientRect();
    const tx1 = wide ? hx + hb.width : hx + hb.width / 2;
    const ty1 = wide ? hy + hb.height / 2 : hy + hb.height;
    const tx2 = wide ? ob.left - box.left : ob.left - box.left + ob.width / 2;
    const ty2 = wide ? ob.top - box.top + ob.height / 2 : ob.top - box.top;
    const tm = (tx1 + tx2) / 2;

    setEdges({
      paths,
      trunk: `M${tx1},${ty1} C${tm},${ty1} ${tm},${ty2} ${tx2},${ty2}`,
      w: box.width,
      h: box.height,
    });
  }, []);

  useEffect(() => {
    draw();
    const t = setTimeout(draw, 150);
    window.addEventListener("resize", draw);
    let ro;
    if (typeof ResizeObserver !== "undefined" && grRef.current) {
      ro = new ResizeObserver(draw);
      ro.observe(grRef.current);
    }
    if (document.fonts?.ready) document.fonts.ready.then(draw).catch(() => {});
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", draw);
      ro?.disconnect();
    };
  }, [draw]);

  const anyOn = activeCount > 0;

  return (
    <div className="cl" id="top">
      <style>{CSS}</style>

      <header className="nav">
        <div className="nav__in">
          <a className="logo" href="#top"><svg className="logo__mk" viewBox="0 0 16 16" aria-hidden="true"><path d="M15.25 0.75 L0.75 0.75 L0.75 15.25" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M15.25 0.75 L15.25 15.25 L0.75 15.25" fill="none" stroke="var(--logo-accent,#0D2FFF)" strokeWidth="1.5" /></svg><span className="logo__t">{BRAND}<small>{PARENT}</small></span></a>
          <span className="nav__sp" />
          <span className="nav__note">Works with Eaglesoft</span>
          <a className="btn" href="https://calendly.com/manueldentalrobot/new-meeting" target="_blank" rel="noopener noreferrer">Book an audit</a>
        </div>
      </header>

      <main>
        {/* ---------------- hero + reconciliation seam ---------------- */}
        <section className="hero">
          <div className="wrap">
            <p className="eyebrow">24-month ledger reconciliation</p>
            <h1>Every claim has two records. You only keep <em>one</em> of them.</h1>
            <p className="hero__sub">
              {BRAND} reads your PMS ledger, then goes and gets the other half: portal status,
              EOBs, real paid amounts, straight from the payer. Then it shows you line by line
              where the two stop agreeing.
            </p>
            <div className="hero__cta">
              <a className="btn" href="https://calendly.com/manueldentalrobot/new-meeting" target="_blank" rel="noopener noreferrer">Book an audit</a>
              <a className="btn btn--ghost" href="#findings">See what it finds</a>
            </div>

            <div className="seam">
              <div className="seam__bar">
                <span className="seam__live"><span className="dot" aria-hidden="true" />Audit running</span>
                <span>Practice <b>Northgate Dental</b></span>
                <span>Window <b>Aug 2024 &ndash; Aug 2026</b></span>
                <span>Claims read <b>1,284</b></span>
                <span>Payers <b>6</b></span>
                <span>Exceptions <b style={{ color: "var(--alert-lt)" }}>41</b></span>
              </div>

              <div className="seam__head" aria-hidden="true">
                <span>What your ledger says</span><span /><span>What the payer says</span>
              </div>

              <div className="seam__rows">
                {RECS.map((r, i) => (
                  <div className={`rec rec--${r.state}`} key={i}>
                    <div className={`cell cell--l${r.muted ? " cell--muted" : ""}`}>
                      <div className="cell__k">
                        <b>{r.l.id}</b>
                        {r.l.meta.map((m, j) => <span key={j}>{m}</span>)}
                      </div>
                      <div className="cell__v">
                        {r.l.v}
                        {r.l.note && <span style={{ color: "var(--muted)" }}> {r.l.note}</span>}
                      </div>
                    </div>

                    <div className="mark"><span aria-hidden="true">{r.mark}</span></div>

                    <div className="cell cell--r">
                      <div className="cell__k">
                        <b>{r.r.id}</b>
                        {r.r.meta.map((m, j) => <span key={j}>{m}</span>)}
                      </div>
                      <div className={`cell__v${r.r.neg ? " neg" : ""}`}>
                        {r.r.amt && <span className="amt">{r.r.amt}</span>}
                        {r.r.pos && <span className="pos">{r.r.pos}</span>}
                        {r.r.v}
                        {r.r.after}
                        {r.r.negTail && <span className="neg"> {r.r.negTail}</span>}
                      </div>
                      <div className="cell__t">{r.r.t}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="seam__foot">Sample audit · figures illustrative</p>
            </div>
          </div>
        </section>

        {/* ---------------- findings ---------------- */}
        <section className="sec sec--white" id="findings">
          <div className="wrap">
            <p className="eyebrow">Three questions your ledger can't answer</p>
            <h2>Your ledger records what your team entered.<br />Not what the payer did.</h2>
            <p className="sec__lede">
              Once a claim leaves the practice, the ledger stops being evidence and starts being
              a guess. {BRAND} closes that gap on every claim, in both directions.
            </p>

            <div className="finds">
              {FINDS.map((f, i) => (
                <article className="find" key={i}>
                  <p className="find__tag">{f.tag}</p>
                  <h3>{f.h}</h3>
                  <p>{f.p}</p>
                  <div className="find__art">
                    {f.art.map(([k, v, mod], j) => {
                      const strike = mod?.startsWith("strike:");
                      return (
                        <div key={j}>
                          <i>{k}</i>{" "}
                          {strike && <span className="strike">{mod.slice(7)}</span>}{strike ? " " : ""}
                          {mod && !strike ? <span className={mod}>{v}</span> : v}
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- interactive evidence graph ---------------- */}
        <section className="floor">
          <div className="wrap">
            <p className="eyebrow">The evidence layer</p>
            <h2>Five sources. One rebuilt account.</h2>
            <p className="floor__lede">
              Your ledger, the payer portals, voice agents for payers that still answer by phone,
              the EOB and ERA record, and the clearinghouse submission trail, all reconciled into a
              single account history you can defend. Switch a source off to see which questions stop
              having answers.
            </p>

            <div className="gr" ref={grRef}>
              <svg
                className="gr__svg"
                aria-hidden="true"
                viewBox={`0 0 ${edges.w || 1} ${edges.h || 1}`}
                preserveAspectRatio="none"
              >
                {edges.paths.map((p) => (
                  <path key={p.k} className={`flow${on[p.k] ? " on" : ""}`} d={p.d} />
                ))}
                {edges.trunk && (
                  <path className={`flow trunk${anyOn ? " on" : ""}`} d={edges.trunk} />
                )}
              </svg>

              <div className="gr__grid">
                <p className="gr__lbl gr__lbl--1">Sources</p>
                <p className="gr__lbl gr__lbl--2">Reconcile</p>
                <p className="gr__lbl gr__lbl--3">The rebuilt account</p>

                <div className="gr__col gr__col--src">
                  {SOURCES.map((s, i) => (
                    <button
                      key={s.k}
                      type="button"
                      className="src"
                      aria-pressed={on[s.k]}
                      onClick={() => toggle(s.k)}
                      ref={(el) => { srcRefs.current[i] = el; }}
                    >
                      <span className="src__tk" aria-hidden="true" />
                      <span className="src__b">
                        <span className="src__n">{s.name}</span>
                        <span className="src__d">{s.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="gr__col gr__col--hub">
                  <div className="hub" ref={hubRef}>
                    <p className="hub__n">24 months,<br />claim by claim</p>
                    <p className="hub__m">{activeCount} of {SOURCES.length} feeding</p>
                  </div>
                </div>

                <div className="gr__col gr__col--out">
                  <div className="out" ref={outRef}>
                    <div className="out__top">
                      <p className="out__t">Account history reconstructable</p>
                      <div className="out__sc">
                        <p className={`out__s ${scoreTone}`}>{score}%</p>
                        <p className="out__sk">Confidence</p>
                      </div>
                    </div>
                    {results.map((c) => (
                      <div className={`chk${c.pass ? "" : " chk--off"}`} key={c.k}>
                        <span className="chk__m" aria-hidden="true">{c.pass ? "✓" : "✕"}</span>
                        <span className="chk__b">
                          <span className="chk__q">{c.q}</span>
                          <span className="chk__r">{c.pass ? c.on : c.off}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="gr__hint">
                Tap a source to include or exclude it and watch the answers respond
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- how it runs ---------------- */}
        <section className="sec">
          <div className="wrap">
            <p className="eyebrow">How an audit runs</p>
            <h2>Six steps. Nobody on your team touches a portal or picks up a phone.</h2>
            <div className="run">
              {STEPS.map(([h, p], i) => (
                <div className="step" key={i}>
                  <div className="step__n">STEP {i + 1}</div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- resolution ---------------- */}
        <section className="sec sec--white">
          <div className="wrap">
            <p className="eyebrow">After the audit</p>
            <h2>A balance nobody can explain is a balance nobody pays.</h2>
            <p className="sec__lede">
              Once an account crosses clean and the patient portion is verified against the payer's
              own EOBs, the platform calls the patient, walks them through where the number came
              from, and takes payment or sets up financing on the call. It collects the whole
              reconciled account at once, not one claim at a time.
            </p>

            <p className="gate">
              <b>Gate:</b>&nbsp;no patient is contacted until the account reconciles. If the ledger
              and the payer still disagree, it goes to the exception worklist instead, never to
              collections.
            </p>

            <div className="res">
              <div className="call">
                <div className="call__h">
                  <span className="seam__live"><span className="dot" aria-hidden="true" />Call 02:14</span>
                  <span>Account <b>#4471</b></span>
                  <span>Verified <b>08/09</b></span>
                  <span>Consent <b>on file</b></span>
                </div>
                {CALL.map(([who, t, label, words], i) => (
                  <div className={`ln ln--${who}`} key={i}>
                    <div className="ln__t">{t}</div>
                    <div className="ln__w"><span className="ln__s">{label}</span>{words}</div>
                  </div>
                ))}
              </div>

              <div className="stmt">
                <div className="stmt__h">
                  <p className="stmt__b">Northgate Dental &mdash; statement</p>
                  <p className="stmt__m">Maria R. · Account #4471 · 24 months reconciled · sent 08/09 by text</p>
                </div>
                <div className="stmt__rows">
                  {STATEMENT.map((r, i) => (
                    <div className={`sr${r.mod ? ` sr--${r.mod}` : ""}`} key={i}>
                      <span className="sr__k">{r.k}{r.s && <small>{r.s}</small>}</span>
                      <span className="sr__v">{r.v}</span>
                    </div>
                  ))}
                </div>
                <div className="stmt__f">
                  <p className="stmt__fk">Pay it your way</p>
                  <div className="pays">
                    {PLANS.map((o) => (
                      <button
                        key={o.k}
                        type="button"
                        className={`pay${plan === o.k ? " pay--sel" : ""}`}
                        aria-pressed={plan === o.k}
                        onClick={() => setPlan(o.k)}
                      >
                        <b>{o.big}</b>{o.sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- strip ---------------- */}
        <section className="strip">
          <div className="wrap strip__g">
            {STRIP.map(([k, v], i) => (
              <div className="strip__i" key={i}>
                <div className="k">{k}</div>
                <div className="v">
                  {v.split("\n").map((line, j) => (
                    <span key={j}>{line}{j === 0 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- cta ---------------- */}
        <section className="cta" id="book">
          <div className="wrap">
            <h2>Find out what your ledger has been hiding.</h2>
            <p>
              Book a 24-month audit on one location. You'll get the exception worklist and the
              recoverable total before you decide anything else.
            </p>
            <a className="btn" href="https://calendly.com/manueldentalrobot/new-meeting" target="_blank" rel="noopener noreferrer">Book an audit</a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot__in">
          <a className="logo" href="#top"><svg className="logo__mk" viewBox="0 0 16 16" aria-hidden="true"><path d="M15.25 0.75 L0.75 0.75 L0.75 15.25" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M15.25 0.75 L15.25 15.25 L0.75 15.25" fill="none" stroke="var(--logo-accent,#0D2FFF)" strokeWidth="1.5" /></svg><span className="logo__t">{BRAND}<small>{PARENT}</small></span></a>
          <span className="foot__sp" />
          <span>Security</span><span>HIPAA / BAA</span><span>Contact</span>
          <span>&copy; 2026</span>
        </div>
      </footer>
    </div>
  );
}
