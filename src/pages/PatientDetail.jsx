import { useState, useEffect, useMemo } from 'react'
import { Btn, Badge, Acmg, Hpo, StatusDot, MatchBar, Conf, Rank, Alert, Tabs, Segmented } from '../components/primitives'
import {
  IconSearch, IconPlus, IconChevron, IconDownload, IconX, IconDna, IconFile,
  IconSend, IconTrash, IconBeaker, IconUser, IconCheck, IconWarning, IconInfo,
} from '../components/icons'
import { PATIENTS, HERO_PATIENT, HPO_DIAG, HPO_RUNNING, VCF_RESULT, HISTORY, PATIENT_VERSIONS } from '../data/mockData'

/* ============================================================
   PatientDetail · shell
   ============================================================ */
export function PatientDetail({ route, setRoute, openDeleteDialog }) {
  const patient = PATIENTS.find(p => p.id === route.id) || HERO_PATIENT
  const isHero = patient.id === HERO_PATIENT.id
  const [tab, setTab] = useState(route.tab || 'hpo')
  const [sub, setSub] = useState(route.sub || 'done')
  const [moreOpen, setMoreOpen] = useState(false)
  const [histOpen, setHistOpen] = useState(false)

  useEffect(() => { setTab(route.tab || 'hpo'); setSub(route.sub || 'done') }, [route.id, route.tab, route.sub])

  const tabs = [
    { key: 'hpo', label: 'HPO 诊断', icon: <IconUser/> },
    { key: 'vcf', label: 'VCF 诊断', icon: <IconDna/> },
  ]

  return (
    <div className="pd-shell">
      <LeftProfile patient={patient} isHero={isHero}
        moreOpen={moreOpen} setMoreOpen={setMoreOpen}
        onDelete={openDeleteDialog}
        onBack={() => setRoute({ view: 'list' })}
        onHistOpen={() => setHistOpen(true)}/>

      <div className="pd-right">
        <div className="pd-tabs-bar">
          <Tabs items={tabs} active={tab} onChange={setTab}/>
          <div className="pd-tabs-bar__right">
            {tab === 'hpo' && (
              <Segmented
                items={[{key:'running',label:'诊断进行中'},{key:'done',label:'诊断完成'}]}
                active={sub} onChange={setSub}/>
            )}
          </div>
        </div>

        <div className="pd-content">
          {tab === 'hpo' && sub === 'done'    && <HpoDone/>}
          {tab === 'hpo' && sub === 'running' && <HpoRunning/>}
          {tab === 'vcf'                       && <VcfDone/>}
        </div>
      </div>

      {histOpen && (
        <div className="overlay" onClick={() => setHistOpen(false)}>
          <div className="dialog dialog--wide" onClick={e => e.stopPropagation()}>
            <div className="dialog__head" style={{alignItems:'center'}}>
              <div>
                <div className="dialog__title">患者档案历史</div>
                <div className="dialog__desc">{patient.name} · {patient.id}</div>
              </div>
              <Btn variant="ghost" size="sm" onClick={() => setHistOpen(false)} style={{marginLeft:'auto'}}><IconX/></Btn>
            </div>
            <div className="dialog__body">
              <HistoryTab onNavigate={(tab, sub) => {
                setHistOpen(false)
                setRoute({ view: 'patient', id: patient.id, tab, sub })
              }}/>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   LeftProfile
   ============================================================ */
function LeftProfile({ patient, isHero, moreOpen, setMoreOpen, onDelete, onBack, onHistOpen }) {
  const p = isHero ? HERO_PATIENT : patient
  const history = isHero ? HERO_PATIENT.history : [
    { date: patient.createdAt, title: '录入 DeepRare', meta: '本账号录入' },
    { date: patient.lastAt,    title: '最近诊断',     meta: patient.summary },
  ]
  return (
    <aside className="pd-left">
      <div className="pd-back-btn">
        <Btn variant="ghost" size="sm" onClick={onBack}><IconChevron style={{transform:'rotate(180deg)'}}/>返回列表</Btn>
        <Btn variant="secondary" size="sm" onClick={onHistOpen}><IconFile/>患者历史</Btn>
      </div>
      <div className="pd-left__top">
        <div className="patient-id">
          <div className="patient-id__avatar">{p.name.slice(-1)}</div>
          <div>
            <div className="patient-id__name">{p.name}</div>
            <div className="patient-id__meta">{p.id} · {p.gender} · {p.age}岁</div>
          </div>
        </div>
        <dl className="kv">
          <dt>出生</dt><dd>{p.dob || '—'}</dd>
          <dt>民族</dt><dd>{p.ethnicity || '—'}</dd>
          <dt>近亲</dt><dd>{p.consanguinity || '否'}</dd>
          <dt>录入</dt><dd>{p.registeredAt || p.createdAt}</dd>
        </dl>
      </div>

      <div className="pd-left__section">
        <div className="pd-left__title">家族史</div>
        <div style={{fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.55}}>{p.familyHistory || '无特殊家族史'}</div>
      </div>

      <div className="pd-left__section">
        <div className="pd-left__title">核心症状</div>
        <div style={{fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.55}}>{p.coreSymptoms || p.summary}</div>
      </div>

      {p.hpoTerms && p.hpoTerms.length > 0 && (
        <div className="pd-left__section">
          <div className="pd-left__title">
            HPO 表型
            <span style={{marginLeft:'auto',fontSize:'var(--fz-11)',color:'var(--text-4)',fontWeight:400,fontFamily:'var(--font-mono)'}}>
              {p.hpoTerms.length} 项
            </span>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {p.hpoTerms.map(h => (
              <Hpo key={h.id} id={h.id} label={h.label} neg={h.neg} removable={false}/>
            ))}
          </div>
        </div>
      )}

      <div className="pd-left__section">
        <div className="pd-left__title">
          病史
          {p.lastVisitAt && <span style={{marginLeft:'auto',fontSize:'var(--fz-11)',color:'var(--text-4)',fontWeight:400,fontFamily:'var(--font-mono)'}}>更新于 {p.lastVisitAt}</span>}
        </div>
        <div style={{fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.65,whiteSpace:'pre-line',maxHeight:280,overflowY:'auto',paddingRight:4}}>
          {p.presentText || p.summary || '—'}
        </div>
      </div>

      <div className="pd-left__foot">
        <Btn variant="secondary" size="sm" style={{flex:1}}><IconDownload/>导出档案</Btn>
        <Btn variant="ghost" size="sm" onClick={() => setMoreOpen(!moreOpen)}>
          更多操作 <IconChevron/>
        </Btn>
        {moreOpen && (
          <div className="more-menu" onMouseLeave={() => setMoreOpen(false)}>
            <div className="more-menu__item"><IconFile/>编辑档案</div>
            <div className="more-menu__item"><IconBeaker/>合并档案</div>
            <div className="more-menu__item"><IconDownload/>下载全部报告</div>
            <div className="more-menu__divider"/>
            <div className="more-menu__item is-danger" onClick={() => { setMoreOpen(false); onDelete() }}>
              <IconTrash/>删除患者…
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

/* ============================================================
   HpoDone
   ============================================================ */
function HpoDone() {
  const [selected, setSelected] = useState(0)
  const [subTab, setSubTab] = useState('hpo-match')
  const [convoOpen, setConvoOpen] = useState(false)
  const d = HPO_DIAG
  const dis = d.top5[selected]

  const subtabs = [
    { key: 'hpo-match', label: 'HPO 匹配' },
    { key: 'evidence',  label: '诊断依据' },
    ...(selected === 0 ? [{ key: 'diff', label: '鉴别诊断' }] : []),
    { key: 'tests',   label: '推荐检查' },
    { key: 'similar', label: '相似病例' },
    { key: 'mdt',     label: 'MDT 建议' },
    { key: 'refs',    label: '参考文献' },
  ]

  return (
    <>
      {/* AI 追问过程 — default collapsed */}
      <div className={'stage-card' + (convoOpen ? '' : ' stage-card--collapsed')}>
        <div
          className="stage-card__head"
          style={{cursor:'pointer'}}
          onClick={() => setConvoOpen(o => !o)}
        >
          <div className="stage-card__title">
            <span className="stage-card__num" style={{background:'var(--ok-500)',color:'#fff'}}>✓</span>
            AI 追问过程
            <Badge tone="ok" dot>已完成 · {d.conversation.filter(m => m.from === 'user').length} 轮问答</Badge>
          </div>
          <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)',display:'flex',alignItems:'center',gap:4}}>
            {convoOpen ? '收起' : '展开详情'}
            <IconChevron style={{transform: convoOpen ? 'rotate(270deg)' : 'rotate(90deg)',transition:'transform .15s'}}/>
          </span>
        </div>
        <div className="stage-card__body" style={{padding:'14px 18px'}}>
          <div className="chat">
            {d.conversation.map((m, i) => (
              <div key={i} className={'chat__msg chat__msg--' + m.from}>
                <div className={'chat__avatar chat__avatar--' + m.from}>{m.from === 'ai' ? 'AI' : '我'}</div>
                <div className="chat__bubble">{m.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="panel" style={{marginBottom:16}}>
        <div className="panel__head">
          <h3 className="panel__title">
            <StatusDot kind="ok">HPO 表型诊断 · 已完成</StatusDot>
          </h3>
          <div className="flex gap-3" style={{alignItems:'center',fontSize:'var(--fz-12)',color:'var(--text-3)'}}>
            <span>完成 <b style={{color:'var(--text-1)',fontFamily:'var(--font-mono)'}}>{d.completedAt}</b></span>
            <span>耗时 <b style={{color:'var(--text-1)',fontFamily:'var(--font-mono)'}}>{d.duration}</b></span>
            <span>模型 <b style={{color:'var(--text-1)',fontFamily:'var(--font-mono)'}}>{d.model}</b></span>
            <Btn variant="primary" size="sm"><IconDownload/>导出诊断报告</Btn>
          </div>
        </div>

        {/* HPO terms */}
        <div className="panel__body" style={{borderBottom:'1px solid var(--border)'}}>
          <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
            输入 HPO 表型
            <span style={{fontWeight:400,letterSpacing:0,textTransform:'none',fontFamily:'var(--font-mono)',color:'var(--text-4)'}}>· {d.hpoList.length} 项</span>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {d.hpoList.map(h => (
              <Hpo key={h.id} id={h.id} label={h.label} neg={h.neg} removable={false}/>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 diseases table */}
      <div className="panel" style={{marginBottom:16}}>
        <div className="panel__head">
          <h3 className="panel__title">候选疾病 Top 5</h3>
          <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>点击行查看详细诊断依据</span>
        </div>
        <div className="panel__body panel__body--flush" style={{overflow:'auto'}}>
          <table className="tbl" style={{width:'100%'}}>
            <thead>
              <tr>
                <th style={{width:48}}>排名</th>
                <th>疾病名称</th>
                <th style={{width:110}}>OMIM / ORPHA</th>
                <th style={{width:70}}>致病基因</th>
                <th style={{width:60}}>遗传</th>
                <th style={{width:120}}>匹配度</th>
                <th style={{width:80}}>置信度</th>
                <th>简述</th>
              </tr>
            </thead>
            <tbody>
              {d.top5.map((r, i) => (
                <tr
                  key={i}
                  onClick={() => { setSelected(i); setSubTab('hpo-match') }}
                  style={{cursor:'pointer', background: selected === i ? 'var(--accent-soft)' : undefined}}
                >
                  <td style={{textAlign:'center'}}><Rank n={r.rank}/></td>
                  <td>
                    <div style={{fontWeight:600,fontSize:'var(--fz-13)'}}>{r.nameCn}</div>
                    <div style={{fontSize:'var(--fz-11)',color:'var(--text-4)'}}>{r.name}</div>
                  </td>
                  <td className="mono" style={{fontSize:'var(--fz-11)',color:'var(--text-3)'}}>
                    {r.omim}{r.orpha ? <><br/>{r.orpha}</> : null}
                  </td>
                  <td style={{fontWeight:600,color:'var(--accent)'}}>{r.gene}</td>
                  <td><Badge tone="outline">{r.inherit}</Badge></td>
                  <td><MatchBar value={r.match}/></td>
                  <td>
                    <Conf value={r.conf} level={r.level}/>
                  </td>
                  <td style={{fontSize:'var(--fz-12)',color:'var(--text-2)'}}>{r.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disease detail panel */}
      <div className="panel">
        <div className="panel__head" style={{flexWrap:'wrap',gap:10}}>
          <h3 className="panel__title">
            <Rank n={dis.rank}/>
            {dis.nameCn} · 诊断详情
            <span style={{fontSize:'var(--fz-11)',color:'var(--text-3)',fontFamily:'var(--font-mono)',fontWeight:400}}>
              {dis.omim}{dis.orpha ? ' · ' + dis.orpha : ''} · {dis.gene} · {dis.inherit}
            </span>
          </h3>
          <div className="subtabs">
            {subtabs.map(s => (
              <button key={s.key} className={'subtabs__item' + (subTab === s.key ? ' is-active' : '')} onClick={() => setSubTab(s.key)}>{s.label}</button>
            ))}
          </div>
        </div>
        <div className="panel__body">
          {subTab === 'hpo-match' && <HpoMatchView/>}
          {subTab === 'evidence'  && <EvidenceView/>}
          {subTab === 'diff'      && <DiffView/>}
          {subTab === 'tests'     && <TestsView/>}
          {subTab === 'similar'   && <SimilarView/>}
          {subTab === 'mdt'       && <MdtView/>}
          {subTab === 'refs'      && <RefsView/>}
        </div>
      </div>
    </>
  )
}

function HpoMatchView() {
  const d = HPO_DIAG
  return (
    <div className="scroll-area">
      <table className="tbl" style={{border:'1px solid var(--border)',borderRadius:'var(--r-3)'}}>
        <thead>
          <tr>
            <th style={{width:'30%'}}>指南诊断条件</th>
            <th style={{width:'22%'}}>对应表型 (HPO)</th>
            <th style={{width:80}}>匹配</th>
            <th>患者表现</th>
            <th style={{width:70}}>文献</th>
          </tr>
        </thead>
        <tbody>
          {d.top1Match.map((m, i) => {
            const hitCls   = m.hit === true ? 'yes' : m.hit === false ? 'no' : m.hit === 'partial' ? 'partial' : 'unknown'
            const hitLabel = m.hit === true ? '✓ 匹配' : m.hit === false ? '✗ 不符' : m.hit === 'partial' ? '~ 部分' : '? 未知'
            return (
              <tr key={i}>
                <td style={{fontWeight:500}}>{m.criterion}</td>
                <td style={{fontSize:'var(--fz-12)',color:'var(--text-2)'}}>{m.phenotype}</td>
                <td><span className={'hit hit--' + hitCls}>{hitLabel}</span></td>
                <td style={{color:'var(--text-2)'}}>{m.patient}</td>
                <td className="mono" style={{color:'var(--text-3)'}}>{m.ref}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function EvidenceView() {
  const e = HPO_DIAG.evidence
  const block = (title, list) => (
    <div style={{marginBottom:18}}>
      <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:8,paddingBottom:6,borderBottom:'1px solid var(--border-subtle)'}}>{title}</div>
      <ol style={{margin:0,paddingLeft:18,display:'flex',flexDirection:'column',gap:6,fontSize:'var(--fz-13)',lineHeight:1.6}}>
        {list.map((it, i) => (
          <li key={i} style={{color:'var(--text-1)'}}>{it.text}<a className="cite-sup">{it.cite}</a></li>
        ))}
      </ol>
    </div>
  )
  return (
    <>
      {block('临床表现', e.clinical)}
      {block('实验室检查', e.lab)}
      {block('治疗反应', e.therapy)}
      {block('分子遗传证据', e.molecular)}
      <Alert tone="ok" title="综合判断">{e.overall}</Alert>
    </>
  )
}

function DiffView() {
  const d = HPO_DIAG.diff
  return (
    <div className="scroll-area">
      <table className="tbl cmp-table" style={{border:'1px solid var(--border)'}}>
        <thead>
          <tr>
            <th>特征</th>
            <th style={{color:'var(--accent)'}}>Wilson Disease (Top 1)</th>
            <th>鉴别疾病 (HD / PKAN / NPC)</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          {d.map((r, i) => (
            <tr key={i}>
              <td style={{fontWeight:600}}>{r.feature}</td>
              <td style={{color:'var(--brand-700)',background:'var(--accent-soft)'}}>{r.wilson}</td>
              <td>{r.alt}</td>
              <td style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TestsView() {
  const t = HPO_DIAG.recommendedTests
  return (
    <div className="grid-2">
      <div>
        <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--ok-700)',marginBottom:8}}>确诊类检查</div>
        <div className="soft-list is-confirm">
          {t.confirm.map((x, i) => <div key={i}><IconCheck/> {x}</div>)}
        </div>
      </div>
      <div>
        <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--info-700)',marginBottom:8}}>随访类检查</div>
        <div className="soft-list is-follow">
          {t.followup.map((x, i) => <div key={i}>↻ {x}</div>)}
        </div>
      </div>
    </div>
  )
}

function SimilarView() {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {HPO_DIAG.similarCases.map((c, i) => (
        <div key={i} style={{padding:'12px 14px',border:'1px solid var(--border)',borderRadius:'var(--r-3)',background:'var(--bg-surface)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <div style={{fontWeight:600,fontSize:'var(--fz-13)'}}>{c.id}</div>
            <MatchBar value={c.match}/>
          </div>
          <div style={{fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.55}}>{c.brief}</div>
        </div>
      ))}
    </div>
  )
}

function MdtView() {
  return (
    <table className="tbl" style={{border:'1px solid var(--border)'}}>
      <thead><tr><th style={{width:180}}>推荐科室</th><th>推荐理由</th></tr></thead>
      <tbody>
        {HPO_DIAG.mdt.map((m, i) => (
          <tr key={i}>
            <td><Badge tone="brand" pill>{m.dept}</Badge></td>
            <td style={{color:'var(--text-2)'}}>{m.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function RefsView() {
  return (
    <ol style={{margin:0,paddingLeft:20,display:'flex',flexDirection:'column',gap:8,fontSize:'var(--fz-12)',lineHeight:1.6,color:'var(--text-2)'}}>
      {HPO_DIAG.references.map(r => (
        <li key={r.n}><span className="mono" style={{color:'var(--text-3)'}}>[{r.n}]</span> {r.text}</li>
      ))}
    </ol>
  )
}

/* ============================================================
   HpoRunning
   ============================================================ */
function HpoRunning() {
  const r = HPO_RUNNING
  const [stage] = useState(3)
  const [hpoList, setHpoList] = useState(r.stage2.extracted)
  const [q, setQ] = useState('')

  const removeHpo = (id) => setHpoList(hpoList.filter(h => h.id !== id))

  return (
    <>
      <div className="stepper" style={{marginBottom:18}}>
        {['AI 追问症状','HPO 清单确认','自动推理'].map((label, i) => {
          const n = i + 1
          const cls = n < stage ? 'is-done' : n === stage ? 'is-active' : ''
          return (
            <div key={i} className={'stepper__item ' + cls} style={{flex:1}}>
              <div className="stepper__label">
                <span className="stepper__num">{n}</span>
                阶段 {n} · {label}
              </div>
              <div className="stepper__bar"/>
            </div>
          )
        })}
      </div>

      <div className={'stage-card ' + (stage > 1 ? 'is-done' : stage === 1 ? 'is-active' : '')}>
        <div className="stage-card__head">
          <div className="stage-card__title">
            <span className="stage-card__num">1</span>
            AI 追问症状
            <Badge tone="ok" dot>已完成 · 3 轮问答</Badge>
          </div>
          <Btn variant="ghost" size="sm">查看完整对话 <IconChevron/></Btn>
        </div>
        <div className="stage-card__body" style={{padding:'14px 18px'}}>
          <div className="chat">
            {r.stage1.messages.slice(-4).map((m, i) => (
              <div key={i} className={'chat__msg chat__msg--' + m.from}>
                <div className={'chat__avatar chat__avatar--' + m.from}>{m.from === 'ai' ? 'AI' : '我'}</div>
                <div className="chat__bubble">
                  {m.text}
                  {m.refs && m.refs.map((x,j) => <a key={j} className="cite-sup">[{x.n}]</a>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={'stage-card ' + (stage > 2 ? 'is-done' : stage === 2 ? 'is-active' : '')}>
        <div className="stage-card__head">
          <div className="stage-card__title">
            <span className="stage-card__num">2</span>
            HPO 清单确认
            <Badge tone="ok" dot>已确认 {hpoList.length} 项</Badge>
          </div>
          <div className="input-wrap" style={{width:260}}>
            <span className="input-wrap__icon"><IconSearch/></span>
            <input className="input" placeholder="按 HPO 名称或 HP:ID 搜索..." value={q} onChange={e => setQ(e.target.value)}/>
          </div>
        </div>
        <div className="stage-card__body" style={{padding:'14px 18px'}}>
          <div className="hpo-bag">
            {hpoList.map(h => (
              <span key={h.id} className={'hpo' + (h.neg ? ' hpo--neg' : '')}>
                <span className="hpo__id">{h.id}</span>
                <span className="hpo__label">{h.label}</span>
                <span className="hpo__x" onClick={() => removeHpo(h.id)}><IconX/></span>
              </span>
            ))}
            <button className="btn btn--secondary btn--sm" style={{height:22}}><IconPlus/>手动添加</button>
          </div>
        </div>
      </div>

      <div className={'stage-card ' + (stage === 3 ? 'is-active' : '')}>
        <div className="stage-card__head">
          <div className="stage-card__title">
            <span className="stage-card__num">3</span>
            自动推理
            <span className="running-pill"><span className="spinner"/>运行中 · 02:36</span>
          </div>
          <div className="flex gap-2" style={{alignItems:'center'}}>
            <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>开始于 {r.stage3.startedAt}</span>
            <Btn variant="ghost" size="sm"><IconX/>终止</Btn>
          </div>
        </div>
        <div className="stage-card__body">
          <div className="reasoning-steps">
            {r.stage3.steps.map((s, i) => (
              <div key={i} className={'reasoning-step is-' + s.status}>
                <div className="reasoning-step__icon">
                  {s.status === 'done' ? <IconCheck/> : i+1}
                </div>
                <div>
                  <div className="reasoning-step__name">{s.label}</div>
                  <div className="reasoning-step__meta">{s.meta}</div>
                </div>
                <div className="reasoning-step__status">
                  {s.status === 'done'    && <Badge tone="ok" dot>完成</Badge>}
                  {s.status === 'running' && <span className="running-pill"><span className="spinner"/>运行中</span>}
                  {s.status === 'queue'   && <Badge tone="outline">等待中</Badge>}
                </div>
                <div className="reasoning-step__t">{s.t}</div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  )
}

/* ============================================================
   VcfDone
   ============================================================ */
function VcfDone() {
  const v = VCF_RESULT
  const [expanded, setExpanded] = useState(new Set(['v1']))
  const toggle = (id) => {
    const n = new Set(expanded)
    if (n.has(id)) n.delete(id); else n.add(id)
    setExpanded(n)
  }

  return (
    <>
      <div className="panel" style={{marginBottom:16}}>
        <div className="panel__head">
          <h3 className="panel__title"><StatusDot kind="ok">VCF 基因诊断 · 已完成</StatusDot></h3>
          <div className="flex gap-3" style={{alignItems:'center',fontSize:'var(--fz-12)',color:'var(--text-3)'}}>
            <span>完成 <b style={{color:'var(--text-1)',fontFamily:'var(--font-mono)'}}>{v.completedAt}</b></span>
            <Btn variant="primary" size="sm"><IconDownload/>导出 ACMG 报告</Btn>
          </div>
        </div>
        <div className="panel__body">
          <div className="kpi-inline">
            {v.steps.map((s, i) => (
              <div key={i} className={'kpi-inline__item' + (i === v.steps.length - 1 ? ' kpi-inline__item--accent' : '')}>
                <div className="kpi-inline__label">{s.label}</div>
                <div className="kpi-inline__val">{s.value}</div>
                <div className="kpi-inline__sub">{s.meta}</div>
                <div className="kpi-inline__arrow"/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h3 className="panel__title">基因变异结果 · 按发现类型分组</h3>
          <div className="flex gap-2">
            <Badge tone="soft-err"><span className="acmg acmg--p" style={{minWidth:'auto',height:14,fontSize:10}}>P</span> 2</Badge>
            <Badge tone="soft-err"><span className="acmg acmg--lp" style={{minWidth:'auto',height:14,fontSize:10}}>LP</span> 1</Badge>
            <Badge tone="soft-warn">VUS {v.summary.vus}</Badge>
          </div>
        </div>
        <div className="panel__body panel__body--flush" style={{overflow:'auto'}}>
          <table className="vtable">
            <tbody>
              <VSection title="Primary Findings" subtitle="主要发现 · 与表型直接相关" count={v.primary.length}/>
              <VHead/>
              {v.primary.map(r => <VRow key={r.id} r={r} expanded={expanded.has(r.id)} onToggle={toggle}/>)}

              <VSection title="Secondary Findings" subtitle="次要发现 · ACMG 推荐报告" count={v.secondary.length}/>
              <VHead/>
              {v.secondary.map(r => <VRow key={r.id} r={r} expanded={expanded.has(r.id)} onToggle={toggle}/>)}

              <VSection title="Other Findings" subtitle="其他发现 · 药物基因组 / 携带者" count={v.other.length}/>
              <VHead/>
              {v.other.map(r => <VRow key={r.id} r={r} expanded={expanded.has(r.id)} onToggle={toggle}/>)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function VHead() {
  return (
    <tr className="vtable__head">
      <th style={{width:26}}></th>
      <th style={{width:60}}>ACMG</th>
      <th>基因</th><th>位置</th><th>转录本 / cDNA</th><th>蛋白</th>
      <th>类型</th><th>rsID</th><th>基因型</th><th>AD (AF)</th>
      <th>SIFT</th><th>PolyPhen2</th><th>CADD</th>
    </tr>
  )
}

function VSection({ title, subtitle, count }) {
  return (
    <tr><td colSpan={13} style={{padding:0}}>
      <div className="vtable__section">
        <div>{title} <span style={{color:'var(--text-4)',textTransform:'none',letterSpacing:0,marginLeft:8,fontWeight:500}}>{subtitle}</span></div>
        <div className="count">{count} 条</div>
      </div>
    </td></tr>
  )
}

function VRow({ r, expanded, onToggle }) {
  return (
    <>
      <tr className={expanded ? 'is-expanded' : ''} onClick={() => onToggle(r.id)} style={{cursor:'pointer'}}>
        <td><span className="expander"><IconChevron/></span></td>
        <td><Acmg k={r.acmg}/></td>
        <td style={{fontWeight:600}}>{r.gene}</td>
        <td className="mono" style={{color:'var(--text-3)'}}>{r.pos}</td>
        <td className="mono">{r.transcript}:{r.cdna}</td>
        <td className="mono">{r.protein}</td>
        <td style={{color:'var(--text-2)'}}>{r.type}</td>
        <td className="mono" style={{color:'var(--text-3)'}}>{r.rsid}</td>
        <td><Badge tone="outline">{r.zygosity === 'het' ? '杂合' : r.zygosity === 'hom' ? '纯合' : r.zygosity}</Badge></td>
        <td className="mono">{r.ad}</td>
        <td className="mono" style={{color: r.sift && r.sift.includes('D') ? 'var(--err-500)' : 'var(--text-3)'}}>{r.sift}</td>
        <td className="mono" style={{color: r.polyphen && r.polyphen.includes('D') ? 'var(--err-500)' : 'var(--text-3)'}}>{r.polyphen}</td>
        <td className="mono">{r.cadd}</td>
      </tr>
      {expanded && r.criteria && (
        <tr><td colSpan={13} style={{padding:0}}>
          <div className="vdetail">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10,gap:16,flexWrap:'wrap'}}>
              <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)'}}>ACMG 证据条目</div>
              <div style={{fontSize:'var(--fz-12)',color:'var(--text-3)',display:'flex',gap:18,alignItems:'center'}}>
                <span>综合评级 <Acmg k={r.acmg}/></span>
                <span>累计评分 <b className="mono" style={{color:'var(--text-1)',fontSize:'var(--fz-14)'}}>
                  {(r.criteria.filter(c=>c.hit).reduce((s,c)=>s+(c.weight||0),0)>0?'+':'') + r.criteria.filter(c=>c.hit).reduce((s,c)=>s+(c.weight||0),0)}
                </b> 分 <span style={{color:'var(--text-4)'}}>(致病阈值 ≥6)</span></span>
                <span>命中 <b className="mono" style={{color:'var(--text-1)'}}>{r.criteria.filter(c=>c.hit).length}</b> / {r.criteria.length} 条</span>
              </div>
            </div>
            <table className="tbl" style={{border:'1px solid var(--border)',borderRadius:'var(--r-3)',marginBottom:18}}>
              <thead><tr>
                <th style={{width:64}}>证据</th><th style={{width:54}}>评分</th>
                <th>判定依据</th><th style={{width:80}}>命中</th><th style={{width:220}}>参考文献 / 数据库</th>
              </tr></thead>
              <tbody>
                {r.criteria.map((c,i) => (
                  <tr key={i} style={{opacity: c.hit ? 1 : 0.5}}>
                    <td><b className="mono" style={{color: c.code.startsWith('B') ? 'var(--acmg-b-fg)' : 'var(--acmg-p-fg)',fontWeight:700}}>{c.code}</b></td>
                    <td className="mono" style={{color:(c.weight||0)>0?'var(--err-700)':(c.weight||0)<0?'var(--ok-700)':'var(--text-4)',fontWeight:600}}>{(c.weight||0)>0?'+':''}{c.weight||0}</td>
                    <td style={{color:'var(--text-2)',lineHeight:1.55,whiteSpace:'normal',padding:'8px 12px'}}>{c.rationale || c.text}</td>
                    <td>{c.hit ? <span className="hit hit--yes">✓ 命中</span> : <span className="hit hit--unknown">— 不触发</span>}</td>
                    <td className="mono" style={{color:'var(--text-3)',fontSize:'var(--fz-11)',whiteSpace:'normal'}}>{c.ref || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:24}}>
              <div>
                <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:8}}>预测工具详情</div>
                <table className="tbl" style={{border:'1px solid var(--border)'}}>
                  <thead><tr><th>工具</th><th>分数</th><th>结论</th></tr></thead>
                  <tbody>
                    {r.predictions && r.predictions.map((p, i) => (
                      <tr key={i}>
                        <td style={{fontWeight:600}}>{p.tool}</td>
                        <td className="mono">{p.score}</td>
                        <td style={{color: p.label.toLowerCase().includes('no') || p.label.toLowerCase().includes('benign') ? 'var(--text-3)' : 'var(--err-700)'}}>{p.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                {r.geneInfo && (
                  <>
                    <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:6}}>基因功能</div>
                    <div style={{fontSize:'var(--fz-13)',color:'var(--text-2)',lineHeight:1.6,marginBottom:14}}>{r.geneInfo}</div>
                  </>
                )}
                {r.literature && (
                  <>
                    <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:6}}>关联文献</div>
                    <ol style={{margin:0,paddingLeft:18,fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.6}}>
                      {r.literature.map(l => <li key={l.n}><span className="mono" style={{color:'var(--text-3)'}}>[{l.n}]</span> {l.text}</li>)}
                    </ol>
                  </>
                )}
              </div>
            </div>
          </div>
        </td></tr>
      )}
    </>
  )
}

/* ============================================================
   HistoryTab
   ============================================================ */
function HistoryTab({ onNavigate }) {
  return (
    <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:0}}>
      {PATIENT_VERSIONS.map((ver, vi) => (
        <div key={ver.v} style={{display:'flex',gap:0}}>
          {/* timeline spine */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:32,flexShrink:0}}>
            <div style={{
              width:22,height:22,borderRadius:'50%',flexShrink:0,
              background: vi === 0 ? 'var(--accent)' : 'var(--n-200)',
              color: vi === 0 ? '#fff' : 'var(--text-3)',
              display:'grid',placeItems:'center',
              fontSize:'var(--fz-11)',fontWeight:700,fontFamily:'var(--font-mono)',
            }}>{ver.v}</div>
            {vi < PATIENT_VERSIONS.length - 1 && (
              <div style={{flex:1,width:2,background:'var(--border)',minHeight:24,margin:'4px 0'}}/>
            )}
          </div>

          {/* version card */}
          <div style={{flex:1,marginLeft:14,paddingBottom: vi < PATIENT_VERSIONS.length - 1 ? 24 : 0}}>
            {/* card header */}
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontWeight:700,fontSize:'var(--fz-14)'}}>{ver.date}</span>
              {vi === 0 && <Badge tone="brand" dot>最新版本</Badge>}
              <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--fz-12)',color:'var(--text-3)'}}>version {ver.v} </span>
              <span style={{fontSize:'var(--fz-12)',color:'var(--text-4)'}}>· {ver.updatedBy}</span>
              <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)',marginLeft:4}}>{ver.changeNote}</span>
            </div>

            <div style={{background:'var(--bg-surface)',border:'1px solid var(--border)',borderRadius:'var(--r-4)',overflow:'hidden'}}>
              {/* HPO terms */}
              <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
                <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-4)',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                  HPO 表型
                  <span style={{fontWeight:400,letterSpacing:0,textTransform:'none',fontFamily:'var(--font-mono)',color:'var(--text-4)'}}>· {ver.hpoTerms.length} 项</span>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  {ver.hpoTerms.map(h => <Hpo key={h.id} id={h.id} label={h.label} neg={h.neg} removable={false}/>)}
                </div>
              </div>

              {/* analyses */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
                {/* HPO analyses */}
                <div style={{padding:'12px 16px',borderRight:'1px solid var(--border)'}}>
                  <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-4)',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                    HPO 表型诊断
                    <span style={{fontWeight:400,letterSpacing:0,textTransform:'none',fontFamily:'var(--font-mono)'}}>· {ver.hpoAnalyses.length} 次</span>
                  </div>
                  {ver.hpoAnalyses.length === 0
                    ? <div style={{fontSize:'var(--fz-12)',color:'var(--text-4)'}}>未发起</div>
                    : (
                      <div style={{display:'flex',flexDirection:'column',gap:8}}>
                        {ver.hpoAnalyses.map(a => (
                          <div key={a.id} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:'var(--fz-12)'}}>
                            <StatusDot kind={a.status === 'done' ? 'ok' : a.status === 'failed' ? 'err' : 'queue'}>
                              {a.status === 'done' ? '完成' : a.status === 'failed' ? '失败' : '进行中'}
                            </StatusDot>
                            <div style={{flex:1,minWidth:0}}>
                              <span style={{fontFamily:'var(--font-mono)',color:'var(--text-4)',fontSize:'var(--fz-11)',marginRight:6}}>{a.id}</span>
                              <span style={{color:'var(--text-3)',fontSize:'var(--fz-11)'}}>{a.date}</span>
                              {a.status === 'done' && a.top1 !== '—' && (
                                <div style={{marginTop:2,color:'var(--text-1)',fontWeight:500}}>
                                  Top 1: {a.top1}
                                  <span style={{marginLeft:6,fontFamily:'var(--font-mono)',color:'var(--accent)',fontWeight:600}}>{a.match}%</span>
                                  {a.conf != null && <span style={{marginLeft:4,color:'var(--text-3)'}}>置信度 {a.conf}</span>}
                                </div>
                              )}
                              {a.status === 'failed' && (
                                <div style={{marginTop:2,color:'var(--text-4)'}}>由医生手动终止</div>
                              )}
                            </div>
                            {a.status === 'done' && (
                              <Btn variant="ghost" size="sm" onClick={() => onNavigate('hpo', 'done')}>查看详情<IconChevron/></Btn>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  }
                </div>

                {/* VCF analyses */}
                <div style={{padding:'12px 16px'}}>
                  <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-4)',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                    VCF 基因诊断
                    <span style={{fontWeight:400,letterSpacing:0,textTransform:'none',fontFamily:'var(--font-mono)'}}>· {ver.vcfAnalyses.length} 次</span>
                  </div>
                  {ver.vcfAnalyses.length === 0
                    ? <div style={{fontSize:'var(--fz-12)',color:'var(--text-4)'}}>未发起</div>
                    : (
                      <div style={{display:'flex',flexDirection:'column',gap:6}}>
                        {ver.vcfAnalyses.map(a => (
                          <div key={a.id} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:'var(--fz-12)'}}>
                            <StatusDot kind={a.status === 'done' ? 'ok' : a.status === 'failed' ? 'err' : 'queue'}>
                              {a.status === 'done' ? '完成' : a.status === 'failed' ? '失败' : '进行中'}
                            </StatusDot>
                            <div style={{flex:1,minWidth:0}}>
                              <span style={{fontFamily:'var(--font-mono)',color:'var(--text-4)',fontSize:'var(--fz-11)',marginRight:6}}>{a.id}</span>
                              <span style={{color:'var(--text-3)',fontSize:'var(--fz-11)'}}>{a.date}</span>
                              <div style={{marginTop:2,color: a.status === 'failed' ? 'var(--text-4)' : 'var(--text-1)',fontWeight: a.status === 'done' ? 500 : 400}}>
                                {a.result}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   DeleteDialog
   ============================================================ */
export function DeleteDialog({ patient, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState('')
  const canDelete = confirmText === patient.name
  return (
    <div className="overlay" onClick={onClose}>
      <div className="dialog" onClick={e => e.stopPropagation()}>
        <div className="dialog__head">
          <div className="dialog__icon"><IconWarning/></div>
          <div>
            <div className="dialog__title">永久删除患者档案</div>
            <div className="dialog__desc">此操作不可撤销。患者的所有诊断记录、HPO 表型及 VCF 报告将被永久删除。</div>
          </div>
        </div>
        <div className="dialog__confirm-field">
          请输入患者姓名 <code>{patient.name}</code> 以确认删除:
          <input className="input" style={{marginTop:6}} value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder="输入姓名..."/>
        </div>
        <div className="dialog__foot">
          <Btn variant="secondary" onClick={onClose}>取消</Btn>
          <Btn variant="danger" disabled={!canDelete} onClick={onConfirm}><IconTrash/>永久删除患者</Btn>
        </div>
      </div>
    </div>
  )
}
