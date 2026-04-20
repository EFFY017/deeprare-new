/* global React, Btn, Badge */
const { useState: useState_f } = React;

/* ============== Colors Section ============== */
function SectionColors() {
  const brandScale = [
    ["50","#EEF1FA"], ["100","#DBE1F3"], ["200","#B7C2E7"], ["300","#8A9BD6"],
    ["400","#5E74C3"], ["500","#3A52AE"], ["600","#2C4196"], ["700","#21327A"],
    ["800","#18265E"], ["900","#0F1A44"]
  ];
  const neutrals = [
    ["0","#FFFFFF"], ["25","#FAFBFC"], ["50","#F4F6F9"], ["100","#E8ECF2"],
    ["150","#DDE2EA"], ["200","#CED4DE"], ["300","#AEB6C3"], ["400","#8A93A3"],
    ["500","#6B7484"], ["600","#4E5665"], ["700","#363D4B"], ["800","#232936"],
    ["900","#141922"]
  ];
  const semantic = [
    { name:"Success", bg:"var(--ok-50)",  fg:"var(--ok-700)",  hex:"#3D8B5C", label:"#3D8B5C", light:true },
    { name:"Warning", bg:"var(--warn-50)",fg:"var(--warn-700)",hex:"#C28A2E", label:"#C28A2E", light:true },
    { name:"Error",   bg:"var(--err-50)", fg:"var(--err-700)", hex:"#B24A45", label:"#B24A45" },
    { name:"Info",    bg:"var(--info-50)",fg:"var(--info-700)",hex:"#3878A8", label:"#3878A8" },
    { name:"Neutral", bg:"var(--n-100)",  fg:"var(--n-700)",   hex:"#6B7484", label:"#6B7484" },
  ];
  const acmg = [
    { k:"P",  name:"Pathogenic",        hex:"#B24A45", bg:"#F4DCDA", fg:"#8C2F2A" },
    { k:"LP", name:"Likely Pathogenic", hex:"#C67A33", bg:"#F6E4D2", fg:"#8B4A15" },
    { k:"VUS",name:"Uncertain Signif.", hex:"#9A8854", bg:"#ECE7DA", fg:"#6C5E3A" },
    { k:"LB", name:"Likely Benign",     hex:"#5C8A82", bg:"#DCE7E4", fg:"#2F5C55" },
    { k:"B",  name:"Benign",            hex:"#5A8E5F", bg:"#DFEADC", fg:"#2D5B36" },
  ];
  return (
    <section className="section" id="color">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">01 · Foundation</div>
          <h2 className="section__title">色彩 Color</h2>
          <p className="section__desc">以靛蓝为权威主色，搭配低饱和临床色板。语义色用于状态提示，ACMG 专用色板用于基因变异分级，阅读负担低。</p>
        </div>
      </div>

      <div className="sub">
        <div className="sub__title">Brand · Indigo</div>
        <div className="scale">
          {brandScale.map(([k,v], i) => (
            <div key={k} className={`scale__step${i >= 4 ? " is-dark" : ""}`} style={{background:v}}>
              <span>{k}</span><small>{v}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="sub">
        <div className="sub__title">Neutral · Slate</div>
        <div className="scale" style={{gridTemplateColumns:"repeat(13,1fr)"}}>
          {neutrals.map(([k,v], i) => (
            <div key={k} className={`scale__step${i >= 7 ? " is-dark" : ""}`} style={{background:v, borderRight: i===0?"1px solid var(--border)":"none"}}>
              <span>{k}</span><small>{v}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="sub">
        <div className="sub__title">Semantic</div>
        <div className="swatch-grid">
          {semantic.map(s => (
            <div key={s.name} className="swatch">
              <div className={`swatch__chip${s.light ? " is-light" : ""}`} style={{background: s.hex}}>{s.name}</div>
              <div className="swatch__body"><span>{s.name}</span><span className="mono">{s.label}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className="sub">
        <div className="sub__title">ACMG · 五级变异分类</div>
        <div className="grid" style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12}}>
          {acmg.map(a => (
            <div key={a.k} className="frame" style={{padding:14}}>
              <div className="flex items-center justify-between mb-2">
                <span className={`acmg acmg--${a.k.toLowerCase()}`}>{a.k}</span>
                <span className="t-xs t-4 mono">{a.hex}</span>
              </div>
              <div className="fw-6 t-md">{a.name}</div>
              <div className="mt-2 flex gap-2 items-center">
                <div style={{width:22, height:22, borderRadius:4, background:a.bg, border:"1px solid rgba(0,0,0,.06)"}}/>
                <div style={{width:22, height:22, borderRadius:4, background:a.hex}}/>
              </div>
              <div className="t-xs t-4 mt-2 mono">bg {a.bg} / bar {a.hex}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Typography ============== */
function SectionType() {
  const rows = [
    { name:"Display",       spec:"30 / 36 · 700 · tracking -0.02em", sample:"DeepRare 诊断系统",  size:30, weight:700 },
    { name:"Page Title",    spec:"20 / 28 · 700 · tracking -0.01em", sample:"患者列表 Patients",   size:20, weight:700 },
    { name:"Section Title", spec:"15 / 22 · 600",                    sample:"诊断依据 Rationale", size:15, weight:600 },
    { name:"Body",          spec:"14 / 21 · 400",                    sample:"患者因反复发作性肌无力就诊，家族中无类似病史。", size:14, weight:400 },
    { name:"Body Strong",   spec:"14 / 21 · 600",                    sample:"Top 1 候选疾病：重症肌无力 (MG)", size:14, weight:600 },
    { name:"Label",         spec:"12 / 16 · 600 · uppercase 0.04em", sample:"CONFIDENCE SCORE",   size:12, weight:600, tx:"uppercase", ls:"0.04em" },
    { name:"Caption",       spec:"12 / 16 · 400 · text-3",           sample:"数据来源：OMIM #254200 · Orphanet 589", size:12, weight:400, color:"var(--text-3)" },
    { name:"Micro",         spec:"11 / 14 · 500 · text-4",           sample:"Last updated 2026-04-19 14:32", size:11, weight:500, color:"var(--text-4)" },
    { name:"Mono / Code",   spec:"JetBrains Mono · tabular", sample:"HP:0001250  NM_000518.5:c.364G>A  p.Glu122Lys", size:13, weight:500, mono:true },
  ];
  return (
    <section className="section" id="type">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">02 · Foundation</div>
          <h2 className="section__title">字体排印 Typography</h2>
          <p className="section__desc">拉丁使用 Inter，中文由系统字体回退到 Noto Sans SC / PingFang；代码与 ID 使用 JetBrains Mono 的 tabular figures，便于纵向对齐。</p>
        </div>
        <div className="t-xs t-3 mono" style={{textAlign:"right", lineHeight:1.7}}>
          Inter · Noto Sans SC<br/>JetBrains Mono
        </div>
      </div>
      <div className="frame">
        {rows.map(r => (
          <div key={r.name} className="type-row">
            <div className="type-row__name">{r.name}<small>{r.name.toLowerCase().replace(/ /g,"-")}</small></div>
            <div className="type-row__sample" style={{
              fontSize: r.size,
              fontWeight: r.weight,
              color: r.color,
              fontFamily: r.mono ? "var(--font-mono)" : null,
              textTransform: r.tx,
              letterSpacing: r.ls,
              lineHeight: 1.3,
            }}>{r.sample}</div>
            <div className="type-row__spec">{r.spec}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============== Spacing / Radius / Shadow ============== */
function SectionSpacing() {
  const pads = [
    ["pad-1","4px",4], ["pad-2","8px",8], ["pad-3","12px",12],
    ["pad-4","16px",16], ["pad-5","20px",20], ["pad-6","24px",24],
    ["pad-8","32px",32]
  ];
  const radii = [["r-1","2px"], ["r-2","4px"], ["r-3","6px"], ["r-4","8px"], ["r-5","12px"], ["r-pill","999px"]];
  return (
    <section className="section" id="spacing">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">03 · Foundation</div>
          <h2 className="section__title">间距 · 圆角 · 阴影</h2>
          <p className="section__desc">基础 4px 网格。阴影分四级，卡片默认不用阴影，只在浮层/弹窗使用。</p>
        </div>
      </div>

      <div className="grid-3">
        <div>
          <div className="sub__title">Spacing · 4px grid</div>
          <div className="frame">
            {pads.map(([k, v, n]) => (
              <div key={k} className="space-row">
                <span className="space-row__label">{k}</span>
                <span className="space-row__visual" style={{width: n * 3}}/>
                <span className="space-row__value">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="sub__title">Radius</div>
          <div className="frame">
            <div className="radii">
              {radii.map(([k, v]) => (
                <div key={k} className="radii__item">
                  <div className="radii__sample" style={{borderRadius: `var(--${k})`}}/>
                  <div className="radii__label"><b>{k}</b>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="sub__title">Elevation</div>
          <div className="frame">
            {["sh-1","sh-2","sh-3","sh-pop"].map(s => (
              <div key={s} style={{marginBottom:14, padding:"14px 16px", background:"var(--bg-surface)", borderRadius:6, boxShadow:`var(--${s})`, fontSize:12, fontFamily:"var(--font-mono)", color:"var(--text-3)"}}>
                <b style={{color:"var(--text-1)", fontWeight:600}}>{s}</b> · {
                  s==="sh-1" ? "rows & inputs" :
                  s==="sh-2" ? "raised surfaces" :
                  s==="sh-3" ? "popovers" : "modals & dialogs"
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectionColors, SectionType, SectionSpacing });
