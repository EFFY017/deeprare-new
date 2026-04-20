/* global React, Btn, Badge, Acmg, Hpo, StatusDot, Progress, MatchBar, Conf, Rank, Tabs, Alert */
const { useState: useStateS } = React;

/* ============== Scene 1 · Patient List ============== */
function ScenePatientList() {
  const rows = [
    { mrn:"P-2026-00428", name:"张 **", g:"女", age:34, chief:"波动性肌无力 3 年", dx:"重症肌无力",   status:"done",    type:"HPO",  updated:"今天 14:32" },
    { mrn:"P-2026-00427", name:"陈 **", g:"男", age:7,  chief:"发育迟缓；肌张力低", dx:"诊断中…",       status:"running", type:"HPO+VCF", updated:"2 分钟前" },
    { mrn:"P-2026-00425", name:"王 **", g:"男", age:52, chief:"进行性共济失调",   dx:"脊髓小脑共济失调 3 型", status:"done",    type:"VCF",  updated:"昨天 19:10" },
    { mrn:"P-2026-00424", name:"刘 **", g:"女", age:28, chief:"反复骨折；蓝色巩膜", dx:"成骨不全 I 型",  status:"done",    type:"HPO",  updated:"昨天 16:02" },
    { mrn:"P-2026-00423", name:"赵 **", g:"女", age:11, chief:"智力减退；肝大",   dx:"队列中",        status:"queue",   type:"VCF",  updated:"3 小时前" },
    { mrn:"P-2026-00420", name:"周 **", g:"男", age:45, chief:"双下肢麻木 1 年",   dx:"Charcot-Marie-Tooth 1A", status:"done", type:"HPO+VCF", updated:"04-18" },
    { mrn:"P-2026-00418", name:"郑 **", g:"女", age:2,  chief:"癫痫；全面发育迟缓", dx:"Dravet 综合征", status:"done",    type:"VCF",  updated:"04-18" },
    { mrn:"P-2026-00416", name:"黄 **", g:"男", age:19, chief:"心肌肥厚",         dx:"推理失败",        status:"err",    type:"VCF",  updated:"04-17" },
    { mrn:"P-2026-00415", name:"孙 **", g:"女", age:60, chief:"帕金森样症状",     dx:"需人工复核",      status:"warn",   type:"HPO",  updated:"04-17" },
    { mrn:"P-2026-00412", name:"马 **", g:"女", age:6,  chief:"视网膜色素变性",   dx:"Usher 综合征 2A", status:"done",    type:"VCF",  updated:"04-16" },
  ];
  return (
    <section className="section" id="scene-list">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">11 · Scenes</div>
          <h2 className="section__title">场景 1 · 患者列表页</h2>
          <p className="section__desc">表格主导的数据中心。状态标签 + 左彩条 + 底层 zebra 让扫视路径清晰；新建入口始终在右上。</p>
        </div>
      </div>

      <div className="scene">
        <div className="app">
          <div className="app__bar">
            <div className="app__logo"><span className="app__logo-mark"><IconDna/></span>DeepRare</div>
            <nav className="app__nav">
              <a className="is-active">患者</a>
              <a>诊断队列</a>
              <a>文献库</a>
              <a>统计</a>
            </nav>
            <div className="app__right">
              <span className="t-xs t-3">v2026.03 · 靛蓝主题</span>
              <div className="app__avatar">李</div>
            </div>
          </div>
          <div className="app__body">
            <aside className="app__side">
              <div className="app__side-group">工作空间</div>
              <a className="is-active">所有患者 <span className="count">428</span></a>
              <a>我的患者 <span className="count">62</span></a>
              <a>收藏 <span className="count">9</span></a>
              <div className="app__side-group">按状态</div>
              <a>诊断中 <span className="count">3</span></a>
              <a>已完成 <span className="count">401</span></a>
              <a>需复核 <span className="count">12</span></a>
              <a>失败 <span className="count">12</span></a>
              <div className="app__side-group">按类型</div>
              <a>HPO 表型</a>
              <a>VCF 基因</a>
              <a>联合诊断</a>
            </aside>
            <main className="app__main">
              <div className="app__page-head">
                <div>
                  <div className="app__page-crumbs">工作空间 / 所有患者</div>
                  <h1 className="app__page-title">患者列表 <span className="t-xs t-3 fw-5 mono" style={{marginLeft:10}}>428 条</span></h1>
                </div>
                <div className="flex gap-2">
                  <Btn variant="secondary" icon={<IconDownload/>}>导出</Btn>
                  <Btn variant="primary" icon={<IconPlus/>}>新建诊断</Btn>
                </div>
              </div>
              <div className="app__toolbar">
                <div className="input-wrap" style={{width:280}}>
                  <span className="input-wrap__icon"><IconSearch/></span>
                  <input className="input" placeholder="搜索 MRN / 姓名 / 主诉 / 疾病"/>
                </div>
                <Btn variant="secondary" size="sm" icon={<IconFilter/>}>状态：全部</Btn>
                <Btn variant="secondary" size="sm" icon={<IconFilter/>}>类型：全部</Btn>
                <Btn variant="ghost" size="sm">近 30 天</Btn>
                <div style={{marginLeft:"auto"}} className="flex gap-2 items-center t-xs t-3">
                  <span>密度</span>
                  <div className="segmented">
                    <button className="segmented__item is-active">标准</button>
                    <button className="segmented__item">紧凑</button>
                  </div>
                </div>
              </div>
              <div className="app__content app__content--flush">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th style={{width:130}}>MRN</th>
                      <th>姓名 / 性别 / 年龄</th>
                      <th>主诉</th>
                      <th>诊断结论</th>
                      <th style={{width:100}}>类型</th>
                      <th style={{width:120}}>状态</th>
                      <th className="is-sort is-desc" style={{width:100}}>更新</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className={r.status==="running" ? "has-accent" : ""}>
                        <td className="mono t-2">{r.mrn}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div style={{width:22, height:22, borderRadius:"50%", background:"var(--brand-100)", color:"var(--brand-700)", display:"grid", placeItems:"center", fontSize:11, fontWeight:600}}>{r.name[0]}</div>
                            <span className="fw-6">{r.name}</span>
                            <span className="t-3 t-xs">{r.g} · {r.age}</span>
                          </div>
                        </td>
                        <td className="t-2">{r.chief}</td>
                        <td className={r.status==="done" ? "fw-6" : "t-3"}>
                          {r.status==="running" && <span className="flex items-center gap-2"><span className="spinner"/>{r.dx}</span>}
                          {r.status!=="running" && r.dx}
                        </td>
                        <td><Badge tone="outline">{r.type}</Badge></td>
                        <td>
                          {r.status==="running" && <StatusDot kind="running">诊断中</StatusDot>}
                          {r.status==="done"    && <StatusDot kind="done">已完成</StatusDot>}
                          {r.status==="queue"   && <StatusDot kind="queue">排队中</StatusDot>}
                          {r.status==="warn"    && <StatusDot kind="warn">需复核</StatusDot>}
                          {r.status==="err"     && <StatusDot kind="err">失败</StatusDot>}
                        </td>
                        <td className="mono t-3 t-xs">{r.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Scene 2 · HPO Diagnosis in progress ============== */
function SceneHpo() {
  return (
    <section className="section" id="scene-hpo">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">12 · Scenes</div>
          <h2 className="section__title">场景 2 · HPO 诊断 · 进行中</h2>
          <p className="section__desc">左档案 · 中对话追问 · 右多轮推理。核心指标随时可见，无需切屏。</p>
        </div>
      </div>

      <div className="scene">
        <div className="app">
          <div className="app__bar">
            <div className="app__logo"><span className="app__logo-mark"><IconDna/></span>DeepRare</div>
            <nav className="app__nav"><a>患者</a><a className="is-active">P-2026-00427 · 陈 **</a></nav>
            <div className="app__right"><div className="app__avatar">李</div></div>
          </div>
          <div className="app__body">
            <main className="app__main" style={{display:"flex", flexDirection:"column"}}>
              <div className="app__page-head">
                <div>
                  <div className="app__page-crumbs"><a>患者</a> / P-2026-00427</div>
                  <h1 className="app__page-title">陈 ** <span className="t-sm t-3 fw-5" style={{marginLeft:8}}>男 · 7 岁 · 发育迟缓</span></h1>
                </div>
                <div className="flex gap-2">
                  <StatusDot kind="running">诊断进行中 · 第 3 轮</StatusDot>
                  <Btn variant="secondary" size="sm">保存为草稿</Btn>
                  <Btn variant="ghost" size="sm">暂停</Btn>
                </div>
              </div>

              <div className="detail" style={{flex:1, minHeight:0}}>
                <aside className="detail__left">
                  <div className="patient-id">
                    <div className="patient-id__avatar">陈</div>
                    <div>
                      <div className="patient-id__name">陈 **</div>
                      <div className="patient-id__meta">P-2026-00427 · 男 · 7Y</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="t-xs fw-6 t-3 mb-2" style={{textTransform:"uppercase", letterSpacing:".04em"}}>基本信息</div>
                    <dl className="kv">
                      <dt>民族</dt><dd>汉</dd>
                      <dt>分诊</dt><dd>李医生</dd>
                      <dt>创建</dt><dd className="mono t-xs">2026-04-19</dd>
                      <dt>父母</dt><dd>非近亲婚配</dd>
                    </dl>
                  </div>
                  <div className="mb-4">
                    <div className="t-xs fw-6 t-3 mb-2" style={{textTransform:"uppercase", letterSpacing:".04em"}}>已选 HPO · 8</div>
                    <div className="flex wrap gap-2">
                      <Hpo id="HP:0001263" label="Developmental delay"/>
                      <Hpo id="HP:0001252" label="Hypotonia"/>
                      <Hpo id="HP:0001250" label="Seizures"/>
                      <Hpo id="HP:0000252" label="Microcephaly"/>
                      <Hpo id="HP:0002059" label="Cerebral atrophy"/>
                      <Hpo id="HP:0001249" label="Intellectual disability"/>
                      <Hpo id="HP:0000486" label="Strabismus" neg/>
                      <Hpo id="HP:0001382" label="Joint hypermobility" neg/>
                    </div>
                  </div>
                  <div>
                    <div className="t-xs fw-6 t-3 mb-2" style={{textTransform:"uppercase", letterSpacing:".04em"}}>病史时间线</div>
                    <div className="tl">
                      <div className="tl__item is-past"><div className="tl__date">2020.05</div><div className="tl__title">出生 · 足月</div></div>
                      <div className="tl__item is-past"><div className="tl__date">2022.03</div><div className="tl__title">发育落后</div></div>
                      <div className="tl__item is-past"><div className="tl__date">2024.09</div><div className="tl__title">首次癫痫发作</div></div>
                      <div className="tl__item is-current"><div className="tl__date">2026.04</div><div className="tl__title">DeepRare 诊断</div></div>
                    </div>
                  </div>
                </aside>

                <div className="detail__right" style={{display:"grid", gridTemplateRows:"auto 1fr", gap:16}}>
                  <div>
                    <div className="cap">推理进度 · 4 轮</div>
                    <div className="stepper">
                      {[
                        { n:1, label:"HPO 归一",    state:"is-done", meta:"0.4s · 12 → 8" },
                        { n:2, label:"初筛候选",    state:"is-done", meta:"1.1s · 218 疾病" },
                        { n:3, label:"多模型投票",  state:"is-active", meta:"运行中…" },
                        { n:4, label:"鉴别对比",    state:"", meta:"等待中" },
                        { n:5, label:"结论整合",    state:"", meta:"等待中" },
                      ].map(s => (
                        <div key={s.n} className={`stepper__item ${s.state}`}>
                          <div className="stepper__bar"/>
                          <div className="stepper__label"><span className="stepper__num">{s.state==="is-done" ? "✓" : s.n}</span>{s.label}</div>
                          <div className="stepper__meta">{s.meta}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:16, minHeight:0}}>
                    <div className="frame" style={{display:"flex", flexDirection:"column", padding:0}}>
                      <div style={{padding:"10px 14px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <div className="fw-6 t-sm">AI 追问 · 对话</div>
                        <span className="t-xs t-4 mono">第 3 轮 · 2.1s</span>
                      </div>
                      <div className="convo" style={{flex:1, padding:"14px"}}>
                        <div className="chat">
                          <div className="chat__msg chat__msg--ai">
                            <div className="chat__avatar chat__avatar--ai">AI</div>
                            <div className="chat__bubble">
                              综合 8 个 HPO，初筛 218 个候选。聚焦在<b>早发脑病</b>方向<a className="cite-sup">[2]</a>。请补充：
                              <div className="chat__choices">
                                <span className="chat__choice">癫痫发作类型？</span>
                                <span className="chat__choice">脑 MRI 结果？</span>
                                <span className="chat__choice">听力检查？</span>
                              </div>
                            </div>
                          </div>
                          <div className="chat__msg chat__msg--user">
                            <div className="chat__avatar chat__avatar--user">李</div>
                            <div className="chat__bubble">局灶性发作，MRI 显示脑萎缩，听力正常。</div>
                          </div>
                          <div className="chat__msg chat__msg--ai">
                            <div className="chat__avatar chat__avatar--ai">AI</div>
                            <div className="chat__bubble">
                              已加入表型 <Hpo id="HP:0002373" label="Focal seizures" removable={false}/>。候选缩小到 <b>14 个疾病</b>，正在鉴别 Rett / CDKL5 / FOXG1 综合征<span className="spinner" style={{marginLeft:6}}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{padding:"10px 14px", borderTop:"1px solid var(--border)"}}>
                        <div className="composer">
                          <div className="composer__chips">
                            <Hpo id="HP:0002373" label="Focal seizures"/>
                            <Hpo id="HP:0002059" label="Cerebral atrophy"/>
                          </div>
                          <div className="composer__row">
                            <textarea className="composer__input" placeholder="回复 AI，或 / 快速添加 HPO..."/>
                            <Btn variant="primary" size="sm" icon={<IconSend/>}>发送</Btn>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="frame" style={{padding:0}}>
                      <div style={{padding:"10px 14px", borderBottom:"1px solid var(--border)"}} className="fw-6 t-sm">当前候选 · Top 5</div>
                      <div style={{padding:"4px 0"}}>
                        <table className="tbl">
                          <tbody>
                            {[
                              { r:1, n:"Rett 综合征",    m:68 },
                              { r:2, n:"CDKL5 脑病",     m:64 },
                              { r:3, n:"FOXG1 综合征",   m:58 },
                              { r:4, n:"Angelman 综合征", m:42 },
                              { r:5, n:"Pitt-Hopkins",   m:38 },
                            ].map(x => (
                              <tr key={x.r}>
                                <td style={{width:40}}><Rank n={x.r}/></td>
                                <td className="fw-5">{x.n}</td>
                                <td style={{width:100}}><MatchBar value={x.m}/></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Scene 3 · VCF Results ============== */
function SceneVcf() {
  return (
    <section className="section" id="scene-vcf">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">13 · Scenes</div>
          <h2 className="section__title">场景 3 · VCF 基因诊断 · 进度摘要 + 结果表格</h2>
          <p className="section__desc">长任务用步骤摘要展示关键数据量；结果三区（Primary / Secondary / Other）同一表格内区分。</p>
        </div>
      </div>

      <div className="scene">
        <div className="app">
          <div className="app__bar">
            <div className="app__logo"><span className="app__logo-mark"><IconDna/></span>DeepRare</div>
            <nav className="app__nav"><a>患者</a><a className="is-active">P-2026-00420 · 周 **</a></nav>
            <div className="app__right"><div className="app__avatar">李</div></div>
          </div>
          <div className="app__body">
            <main className="app__main">
              <div className="app__page-head">
                <div>
                  <div className="app__page-crumbs"><a>患者</a> / P-2026-00420 / VCF 分析</div>
                  <h1 className="app__page-title">周 ** <span className="t-sm t-3 fw-5" style={{marginLeft:8}}>男 · 45 岁 · 双下肢麻木</span></h1>
                </div>
                <div className="flex gap-2">
                  <StatusDot kind="done">完成于 42 分钟前</StatusDot>
                  <Btn variant="secondary" size="sm" icon={<IconDownload/>}>导出报告</Btn>
                  <Btn variant="primary" size="sm">采纳结论</Btn>
                </div>
              </div>

              <div className="app__content" style={{display:"grid", gap:16}}>
                <div className="vcf-steps">
                  {[
                    { n:"文件校验",   v:"GRCh38", meta:"1.24 GB · 通过", state:"is-done" },
                    { n:"比对标准化", v:"4.1M",   meta:"SNV + InDel",   state:"is-done" },
                    { n:"变异注释",   v:"182K",   meta:"编码区 · rare", state:"is-done" },
                    { n:"ACMG 评分",  v:"2.1K",   meta:"候选变异",     state:"is-done" },
                    { n:"结果整合",   v:"6",      meta:"报告变异",     state:"is-done" },
                  ].map((s, i) => (
                    <div key={i} className={`vcf-step ${s.state}`}>
                      <div className="vcf-step__name">{s.state==="is-done" && <IconCheck/>}{s.n}</div>
                      <div className="vcf-step__val">{s.v}</div>
                      <div className="vcf-step__meta">{s.meta}</div>
                    </div>
                  ))}
                </div>

                <div style={{display:"grid", gridTemplateColumns:"1fr 280px", gap:16}}>
                  <div className="frame frame--flush">
                    <div style={{padding:"10px 14px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                      <div className="fw-6 t-sm">报告变异 · 6 条</div>
                      <div className="flex gap-2">
                        <Segmented active="all" onChange={()=>{}} items={[
                          { key:"all", label:"全部 6" },
                          { key:"p", label:"Primary 3" },
                          { key:"s", label:"Secondary 2" },
                          { key:"o", label:"Other 1" },
                        ]}/>
                      </div>
                    </div>
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th style={{width:88}}>分区</th>
                          <th>Gene</th>
                          <th>HGVS.c · Protein</th>
                          <th style={{width:60}}>ACMG</th>
                          <th className="num" style={{width:70}}>Score</th>
                          <th style={{width:62}}>Zyg</th>
                          <th style={{width:110}}>AF (gnomAD)</th>
                          <th style={{width:36}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { region:"Primary",   gene:"PMP22",  hgvs:"dup exon1–5", prot:"—",                acmg:"P",   s:15, zyg:"het", af:"—",         accent:"p" },
                          { region:"Primary",   gene:"MFN2",   hgvs:"c.310G>A",    prot:"p.Val104Met",      acmg:"LP",  s:8,  zyg:"het", af:"0.00004",   accent:"lp" },
                          { region:"Primary",   gene:"GJB1",   hgvs:"c.425G>T",    prot:"p.Arg142Leu",      acmg:"VUS", s:3,  zyg:"hem", af:"absent",    accent:"vus" },
                          { region:"Secondary", gene:"BRCA2",  hgvs:"c.5946del",   prot:"p.Ser1982Argfs",   acmg:"LP",  s:8,  zyg:"het", af:"0.00012",   accent:"lp" },
                          { region:"Secondary", gene:"KCNQ1",  hgvs:"c.1780G>A",   prot:"p.Ala594Thr",      acmg:"VUS", s:2,  zyg:"het", af:"0.00008",   accent:"vus" },
                          { region:"Other",     gene:"MTHFR",  hgvs:"c.665C>T",    prot:"p.Ala222Val",      acmg:"LB",  s:-2, zyg:"hom", af:"0.31",      accent:"lb" },
                        ].map((v, i) => (
                          <tr key={i} className={`has-accent has-accent--${v.accent}`}>
                            <td><Badge tone={v.region==="Primary" ? "brand" : v.region==="Secondary" ? "info" : "outline"}>{v.region}</Badge></td>
                            <td className="fw-6">{v.gene}</td>
                            <td className="mono t-2">{v.hgvs} · {v.prot}</td>
                            <td><Acmg k={v.acmg}/></td>
                            <td className="num">{v.s>0?"+":""}{v.s}</td>
                            <td className="mono">{v.zyg}</td>
                            <td className="mono t-3">{v.af}</td>
                            <td><span className="expander"><IconChevron/></span></td>
                          </tr>
                        ))}
                        <tr className="row-detail">
                          <td colSpan={8}>
                            <div style={{display:"grid", gridTemplateColumns:"1fr 340px", gap:16}}>
                              <div>
                                <div className="detail-expand__h">ACMG 评分明细 · PMP22 dup</div>
                                <div className="acmg-crits">
                                  <div className="acmg-crit"><b>PVS1</b><small>Null</small></div>
                                  <div className="acmg-crit"><b>PS2</b><small>De novo</small></div>
                                  <div className="acmg-crit"><b>PM2</b><small>Absent</small></div>
                                  <div className="acmg-crit"><b>PP3</b><small>In-silico</small></div>
                                  <div className="acmg-crit is-benign"><b>BP4</b><small>Conflict</small></div>
                                </div>
                                <div className="mt-3 t-sm t-2" style={{lineHeight:1.7}}>
                                  17p11.2 重复（CMT1A 经典变异）明确致病<a className="cite-sup">[7]</a>。家系验证：患者父亲携带相同重复，母亲野生型。
                                </div>
                              </div>
                              <div>
                                <div className="detail-expand__h">表型吻合度</div>
                                {[
                                  ["远端肌无力", "HP:0003693", "匹配"],
                                  ["感觉减退",   "HP:0003474", "匹配"],
                                  ["神经传导减慢","HP:0011464", "匹配"],
                                  ["足弓异常",   "HP:0002162", "部分"],
                                ].map(([n,id,st])=>(
                                  <div key={id} className="hpo-match">
                                    <span className="t-sm">{n}</span>
                                    <span className="hpo-match__id">{id}</span>
                                    <span className="hpo-match__arrow">→</span>
                                    {st==="匹配" ? <Badge tone="ok" dot>匹配</Badge> : <Badge tone="warn" dot>部分</Badge>}
                                  </div>
                                ))}
                                <div className="mt-3 flex gap-2">
                                  <Btn variant="primary" size="sm">标记为主要致病</Btn>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{display:"grid", gap:12, alignContent:"start"}}>
                    <div className="kpi kpi--accent">
                      <div className="kpi__label">主要致病变异</div>
                      <div className="kpi__val">PMP22</div>
                      <div className="kpi__sub">17p11.2 dup · Pathogenic</div>
                    </div>
                    <div className="kpi">
                      <div className="kpi__label">拟诊</div>
                      <div className="kpi__val" style={{fontSize:18, fontFamily:"var(--font-sans)"}}>Charcot-Marie-<br/>Tooth 1A</div>
                      <div className="kpi__sub">OMIM:118220</div>
                    </div>
                    <Alert tone="info" title="Secondary Findings">
                      BRCA2 LP 变异建议报告给患者，参考 ACMG SF v3.2 列表<a className="cite-sup">[8]</a>。
                    </Alert>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ScenePatientList, SceneHpo, SceneVcf });
