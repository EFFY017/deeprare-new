/* global React, Btn, Badge, Acmg, Hpo, StatusDot, Progress, MatchBar, Conf, Rank, Tabs, Alert */
const { useState: useStateD } = React;

/* ============== Tables · Patient list & ACMG ============== */
function SectionTables() {
  const [expanded, setExpanded] = useStateD(new Set([1]));
  const toggle = (i) => {
    const n = new Set(expanded);
    n.has(i) ? n.delete(i) : n.add(i);
    setExpanded(n);
  };

  const diseases = [
    { rank:1, name:"重症肌无力 (Myasthenia Gravis)", omim:"OMIM:254200", match:94.2, conf:92, confL:"high", hpo:"11/12", status:"Top 候选" },
    { rank:2, name:"Lambert-Eaton 综合征",           omim:"Orphanet:43393", match:71.8, conf:66, confL:"mid", hpo:"8/12",  status:"鉴别" },
    { rank:3, name:"先天性肌无力综合征 (CMS)",       omim:"OMIM:254210", match:58.3, conf:54, confL:"mid", hpo:"7/12",  status:"鉴别" },
    { rank:4, name:"Guillain-Barré 综合征",          omim:"OMIM:139393", match:38.0, conf:29, confL:"low", hpo:"4/12",  status:"排除" },
    { rank:5, name:"多发性肌炎",                      omim:"OMIM:160750", match:31.4, conf:22, confL:"low", hpo:"3/12",  status:"排除" },
  ];

  const variants = [
    { gene:"CHRNE",  hgvs:"NM_000080.4:c.1327del",     protein:"p.Glu443Lysfs*64",  acmg:"P",   score:12, zyg:"het",  inh:"AR", region:"Primary" },
    { gene:"RAPSN",  hgvs:"NM_005055.5:c.264C>A",      protein:"p.Asn88Lys",        acmg:"LP",  score:7,  zyg:"hom",  inh:"AR", region:"Primary" },
    { gene:"DOK7",   hgvs:"NM_173660.5:c.1124_1127dup",protein:"p.Ala378Serfs*30",  acmg:"VUS", score:3,  zyg:"het",  inh:"AR", region:"Primary" },
    { gene:"COL6A3", hgvs:"NM_004369.4:c.7447A>G",     protein:"p.Ile2483Val",      acmg:"VUS", score:2,  zyg:"het",  inh:"AD", region:"Secondary" },
    { gene:"BRCA2",  hgvs:"NM_000059.4:c.5946del",     protein:"p.Ser1982Argfs*22", acmg:"LP",  score:8,  zyg:"het",  inh:"AD", region:"Secondary" },
    { gene:"MTHFR",  hgvs:"NM_005957.5:c.665C>T",      protein:"p.Ala222Val",       acmg:"LB",  score:-2, zyg:"hom",  inh:"-",  region:"Other" },
  ];

  return (
    <section className="section" id="tables">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">09 · Data</div>
          <h2 className="section__title">表格 Tables</h2>
          <p className="section__desc">核心数据容器。表头悬浮、单元格紧凑、行可点击展开；左侧 3px 彩条标明行状态（ACMG 等级或 Top 候选）。</p>
        </div>
      </div>

      <div className="sub">
        <div className="sub__title">疾病排名 · 可展开行</div>
        <div className="frame frame--flush">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{width:36}}></th>
                <th style={{width:48}}>#</th>
                <th>候选疾病</th>
                <th style={{width:140}}>OMIM / Orphanet</th>
                <th style={{width:160}}>匹配率 ↓</th>
                <th style={{width:110}}>置信度</th>
                <th style={{width:80}}>HPO</th>
                <th style={{width:90}}>状态</th>
              </tr>
            </thead>
            <tbody>
              {diseases.map(d => {
                const open = expanded.has(d.rank);
                return (
                  <React.Fragment key={d.rank}>
                    <tr className={`${d.rank===1 ? "has-accent" : ""} ${open ? "is-expanded is-selected" : ""}`}>
                      <td><span className="expander" onClick={()=>toggle(d.rank)}><IconChevron/></span></td>
                      <td><Rank n={d.rank}/></td>
                      <td className="fw-6">{d.name}</td>
                      <td className="mono t-3">{d.omim}</td>
                      <td><MatchBar value={d.match}/></td>
                      <td><Conf value={d.conf} level={d.confL}/></td>
                      <td className="mono">{d.hpo}</td>
                      <td>
                        {d.status==="Top 候选" && <Badge tone="brand">{d.status}</Badge>}
                        {d.status==="鉴别" && <Badge tone="warn">{d.status}</Badge>}
                        {d.status==="排除" && <Badge tone="outline">{d.status}</Badge>}
                      </td>
                    </tr>
                    {open && (
                      <tr className="row-detail">
                        <td colSpan={8}>
                          <div className="detail-expand">
                            <div>
                              <div className="detail-expand__section">
                                <div className="detail-expand__h">诊断依据 Rationale</div>
                                <div className="t-sm t-2" style={{lineHeight:1.7}}>
                                  病人表现为<b>波动性肌无力 + 眼睑下垂 + 新斯的明试验阳性</b><a className="cite-sup">[1]</a>，符合神经肌肉接头乙酰胆碱受体抗体介导病变。抗 AChR 抗体阳性可进一步支持<a className="cite-sup">[4]</a>。鉴别诊断见右侧表格。
                                </div>
                              </div>
                              <div className="detail-expand__section">
                                <div className="detail-expand__h">鉴别对比 Differential</div>
                                <table className="tbl cmp-table">
                                  <thead>
                                    <tr><th>特征</th><th>MG</th><th>LEMS</th><th>CMS</th></tr>
                                  </thead>
                                  <tbody>
                                    <tr><td className="t-3">发病年龄</td><td className="fw-6">20–40</td><td>&gt;40</td><td>儿童期</td></tr>
                                    <tr><td className="t-3">自身抗体</td><td className="fw-6">AChR+</td><td>VGCC+</td><td>无</td></tr>
                                    <tr><td className="t-3">肌力晨轻暮重</td><td className="fw-6">典型</td><td>不明显</td><td>可变</td></tr>
                                    <tr><td className="t-3">新斯的明</td><td className="fw-6">阳性</td><td>弱阳</td><td>部分阳</td></tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="detail-expand__section">
                                <div className="detail-expand__h">推荐检查 Recommended Tests</div>
                                <div className="flex wrap gap-2">
                                  <Badge tone="info" dot>抗 AChR 抗体</Badge>
                                  <Badge tone="info" dot>重复神经电刺激 (RNS)</Badge>
                                  <Badge tone="info" dot>胸部 CT（胸腺）</Badge>
                                  <Badge tone="info" dot>单纤维肌电图</Badge>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="detail-expand__h">HPO 匹配详情</div>
                              <div className="frame" style={{padding:"8px 12px", background:"var(--bg-surface)"}}>
                                {[
                                  ["HP:0001324","肌无力", "匹配"],
                                  ["HP:0003473","易疲劳肌无力", "匹配"],
                                  ["HP:0000508","上睑下垂", "匹配"],
                                  ["HP:0001260","构音障碍", "匹配"],
                                  ["HP:0002094","呼吸困难", "部分"],
                                ].map(([id,n,st])=>(
                                  <div key={id} className="hpo-match">
                                    <span className="t-sm">{n}</span>
                                    <span className="hpo-match__id">{id}</span>
                                    <span className="hpo-match__arrow">→</span>
                                    {st==="匹配" ? <Badge tone="ok" dot>匹配</Badge> : <Badge tone="warn" dot>部分</Badge>}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 flex gap-2">
                                <Btn variant="primary" size="sm">采纳为诊断结论</Btn>
                                <Btn variant="ghost" size="sm">查看文献 [4]</Btn>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sub">
        <div className="sub__title">基因变异 · ACMG 行彩条</div>
        <div className="frame frame--flush">
          <table className="tbl tbl--zebra">
            <thead>
              <tr>
                <th style={{width:90}}>分区</th>
                <th>Gene</th>
                <th>HGVS.c</th>
                <th>Protein</th>
                <th style={{width:60}}>ACMG</th>
                <th className="num" style={{width:80}}>Score</th>
                <th style={{width:70}}>Zyg</th>
                <th style={{width:70}}>Inh</th>
                <th style={{width:40}}></th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v, i) => (
                <tr key={i} className={`has-accent has-accent--${v.acmg.toLowerCase()}`}>
                  <td><Badge tone={v.region==="Primary" ? "brand" : v.region==="Secondary" ? "info" : "outline"}>{v.region}</Badge></td>
                  <td className="fw-6">{v.gene}</td>
                  <td className="mono t-2">{v.hgvs}</td>
                  <td className="mono t-2">{v.protein}</td>
                  <td><Acmg k={v.acmg}/></td>
                  <td className="num">{v.score > 0 ? "+" : ""}{v.score}</td>
                  <td className="mono">{v.zyg}</td>
                  <td className="mono">{v.inh}</td>
                  <td><span className="expander"><IconChevron/></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="t-xs t-4 mt-2">行首 3px 彩条直接反映 ACMG 等级（P / LP / VUS / LB / B），扫视即可识别。</div>
      </div>
    </section>
  );
}

/* ============== Timeline / Dialog / Cards ============== */
function SectionContainers() {
  return (
    <section className="section" id="containers">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">10 · Data</div>
          <h2 className="section__title">容器 · 时间线 · 弹窗</h2>
          <p className="section__desc">整页实体卡片 ≤ 2 张：页面级信息优先通过表头 + 表格 + 分区标题组织。卡片仅用于侧栏档案与 KPI 组。</p>
        </div>
      </div>

      <div className="grid-3">
        <div className="frame">
          <div className="cap">病史时间线</div>
          <div className="tl">
            <div className="tl__item is-past">
              <div className="tl__date">2024.03</div>
              <div className="tl__title">首次就诊 · 疲劳肌无力</div>
              <div className="tl__meta">外院门诊 · 考虑电解质紊乱</div>
            </div>
            <div className="tl__item is-past">
              <div className="tl__date">2025.08</div>
              <div className="tl__title">症状加重 · 上睑下垂</div>
              <div className="tl__meta">我院神经内科 · 新斯的明试验阳性</div>
            </div>
            <div className="tl__item is-past">
              <div className="tl__date">2025.09.12</div>
              <div className="tl__title">EMG + RNS 检查</div>
              <div className="tl__meta">递减反应阳性</div>
            </div>
            <div className="tl__item is-current">
              <div className="tl__date">2026.04.19</div>
              <div className="tl__title">DeepRare 辅助诊断</div>
              <div className="tl__meta">Top 1: MG · 置信度 92%</div>
            </div>
          </div>
        </div>

        <div className="frame">
          <div className="cap">KPI 组</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <div className="kpi kpi--accent">
              <div className="kpi__label">Top 1 匹配</div>
              <div className="kpi__val">94.2<span style={{fontSize:16, color:"var(--text-3)", marginLeft:2}}>%</span></div>
              <div className="kpi__sub">MG · 基于 12 HPO</div>
            </div>
            <div className="kpi">
              <div className="kpi__label">置信度</div>
              <div className="kpi__val">92</div>
              <div className="kpi__sub">high confidence</div>
            </div>
            <div className="kpi">
              <div className="kpi__label">候选疾病</div>
              <div className="kpi__val">5</div>
              <div className="kpi__sub">3 鉴别 · 2 排除</div>
            </div>
            <div className="kpi">
              <div className="kpi__label">推理耗时</div>
              <div className="kpi__val">4.2<span style={{fontSize:14, color:"var(--text-3)", marginLeft:2}}>s</span></div>
              <div className="kpi__sub">4 轮 · 18 文献</div>
            </div>
          </div>

          <div className="cap mt-4">Card（侧栏档案）</div>
          <div className="card">
            <div className="card__head">
              <h4 className="card__title"><IconUser/> 基本信息</h4>
              <Btn variant="ghost" size="sm">编辑</Btn>
            </div>
            <div className="card__body">
              <dl className="kv">
                <dt>姓名</dt><dd>张 **</dd>
                <dt>性别 / 年龄</dt><dd>女 · 34</dd>
                <dt>MRN</dt><dd className="mono">P-2026-00428</dd>
                <dt>分诊医生</dt><dd>李医生</dd>
              </dl>
            </div>
          </div>
        </div>

        <div>
          <div className="cap">Danger 弹窗 · 二次确认</div>
          <div className="backdrop">
            <div className="dialog">
              <div className="dialog__head">
                <div className="dialog__icon"><IconWarning/></div>
                <div>
                  <div className="dialog__title">删除患者档案？</div>
                  <div className="dialog__desc">患者 <b>张 ** · P-2026-00428</b> 的全部 HPO、VCF 数据及 3 条诊断记录将被永久删除，不可恢复。</div>
                </div>
              </div>
              <div className="dialog__body">
                <div className="field">
                  <div className="field__label">输入 <code style={{background:"var(--err-50)", color:"var(--err-700)", padding:"1px 6px", borderRadius:3, fontFamily:"var(--font-mono)"}}>DELETE</code> 以确认</div>
                  <input className="input" placeholder="DELETE"/>
                </div>
              </div>
              <div className="dialog__foot">
                <Btn variant="ghost">取消 <span className="btn__kbd">Esc</span></Btn>
                <Btn variant="danger" icon={<IconTrash/>}>永久删除</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectionTables, SectionContainers });
