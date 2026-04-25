import { useState, useEffect, useMemo, useRef } from 'react'
import { Btn, Badge, Acmg, Hpo, StatusDot, MatchBar, Conf, Rank, Alert, Field } from '../components/primitives'
import {
  IconSearch, IconPlus, IconChevron, IconDownload, IconX, IconDna, IconFile,
  IconSend, IconTrash, IconBeaker, IconUser, IconCheck, IconWarning, IconInfo,
} from '../components/icons'
import { PATIENTS, HERO_PATIENT, HPO_DIAG, HPO_RUNNING, VCF_RUNNING, VCF_RESULT, TASK_MAP } from '../data/mockData'

/* ============================================================
   PatientDetail · shell
   ============================================================ */
export function PatientDetail({ route, setRoute, openDeleteDialog }) {
  const patient = PATIENTS.find(p => p.id === route.id) || HERO_PATIENT
  const isHero = patient.id === HERO_PATIENT.id
  const tab = route.tab || 'hpo'
  const sub = route.sub || 'done'
  const [moreOpen, setMoreOpen] = useState(false)
  const [histOpen, setHistOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const taskTypeLabel = tab === 'vcf' ? 'VCF 基因诊断' : 'HPO 表型诊断'

  return (
    <div className="pd-shell">
      <LeftProfile patient={patient} isHero={isHero}
        moreOpen={moreOpen} setMoreOpen={setMoreOpen}
        onDelete={openDeleteDialog}
        onBack={() => setRoute({ view: 'list' })}
        onHistOpen={() => setHistOpen(true)}
        onEditOpen={() => setEditOpen(true)}/>

      <div className="pd-right">
        <div className="pd-tabs-bar">
          <div className="pd-task-label">
            {tab === 'vcf' ? <IconDna/> : <IconUser/>}
            {taskTypeLabel}
          </div>
          {tab === 'hpo' && sub === 'done' && (
            <div style={{display:'flex',alignItems:'center',gap:16,fontSize:'var(--fz-12)',color:'var(--text-3)',marginLeft:'auto'}}>
              <StatusDot kind="ok">已完成</StatusDot>
              <span>完成 <b style={{color:'var(--text-1)',fontFamily:'var(--font-mono)'}}>{HPO_DIAG.completedAt}</b></span>
              <span>耗时 <b style={{color:'var(--text-1)',fontFamily:'var(--font-mono)'}}>{HPO_DIAG.duration}</b></span>
              <Btn variant="primary" size="sm"><IconDownload/>导出诊断报告</Btn>
            </div>
          )}
          {tab === 'vcf' && sub === 'done' && (
            <div style={{display:'flex',alignItems:'center',gap:16,fontSize:'var(--fz-12)',color:'var(--text-3)',marginLeft:'auto'}}>
              <StatusDot kind="ok">已完成</StatusDot>
              <span>完成 <b style={{color:'var(--text-1)',fontFamily:'var(--font-mono)'}}>{VCF_RESULT.completedAt}</b></span>
              <Btn variant="primary" size="sm"><IconDownload/>导出 ACMG 报告</Btn>
            </div>
          )}
        </div>

        <div className="pd-content">
          {tab === 'hpo' && sub === 'done'    && <HpoDone/>}
          {tab === 'hpo' && sub === 'running' && <HpoRunning patientId={patient.id} setRoute={setRoute}/>}
          {tab === 'vcf' && sub === 'done'    && <VcfDone/>}
          {tab === 'vcf' && sub === 'running' && <VcfRunning patientId={patient.id} setRoute={setRoute}/>}
        </div>
      </div>

      {editOpen && (
        <EditDialog
          patient={patient}
          onClose={() => setEditOpen(false)}
          onSave={() => {
            setEditOpen(false)
            setRoute({ view: 'patient', id: patient.id, tab: 'hpo', sub: 'running' })
          }}
        />
      )}

      {histOpen && (
        <div className="overlay" onClick={() => setHistOpen(false)}>
          <div className="dialog dialog--wide" onClick={e => e.stopPropagation()}>
            <div className="dialog__head" style={{alignItems:'center'}}>
              <div>
                <div className="dialog__title">诊断任务记录</div>
                <div className="dialog__desc">{patient.name} · {patient.id}</div>
              </div>
              <Btn variant="ghost" size="sm" onClick={() => setHistOpen(false)} style={{marginLeft:'auto'}}><IconX/></Btn>
            </div>
            <div className="dialog__body">
              <HistoryTab
                patient={patient}
                tasks={TASK_MAP[patient.id] || []}
                onNavigate={(t, s) => {
                  setHistOpen(false)
                  setRoute({ view: 'patient', id: patient.id, tab: t, sub: s })
                }}
              />
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
function LeftProfile({ patient, isHero, moreOpen, setMoreOpen, onDelete, onBack, onHistOpen, onEditOpen }) {
  const p = isHero ? HERO_PATIENT : patient
  return (
    <aside className="pd-left">
      <div className="pd-left__nav-row">
        <button className="pd-left__back-btn" onClick={onBack}>
          <IconChevron style={{transform:'rotate(180deg)',color:'var(--text-4)'}}/>
          返回列表
        </button>
        <button className="pd-left__hist-nav" onClick={onHistOpen}>
          <IconFile/>
          <span>诊断任务记录</span>
          <IconChevron style={{marginLeft:'auto',color:'var(--text-4)',transform:'rotate(90deg)'}}/>
        </button>
      </div>

      <div className="pd-left__top">
        <div className="patient-id">
          <div className="patient-id__avatar">{p.name.slice(-1)}</div>
          <div style={{flex:1,minWidth:0}}>
            <div className="patient-id__name">{p.name}</div>
            <div className="patient-id__meta">{p.id} · {p.gender}</div>
          </div>
        </div>
        <dl className="kv">
          <dt>出生日期</dt><dd>{p.dob || '—'}</dd>
          <dt>民族</dt><dd>{p.ethnicity || '—'}</dd>
          <dt>近亲</dt><dd>{p.consanguinity || '否'}</dd>
          <dt>录入</dt><dd>{p.registeredAt || p.createdAt}</dd>
        </dl>
      </div>

      <div className="pd-left__section">
        <div className="pd-left__title">家族史</div>
        <div style={{fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.55}}>{p.familyHistory || '无特殊家族史'}</div>
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
              <Hpo key={h.id} id={h.id} label={h.label} removable={false}/>
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

  const selectDisease = (i) => { setSelected(i); setSubTab('hpo-match') }

  return (
    <>
      {/* AI 追问 */}
      <div className="panel" style={{marginBottom:14}}>
        <div
          style={{
            display:'flex',alignItems:'center',justifyContent:'space-between',
            padding:'10px 16px',cursor:'pointer',
            background: convoOpen ? 'var(--bg-sunken)' : undefined,
          }}
          onClick={() => setConvoOpen(o => !o)}
        >
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'var(--fz-12)',fontWeight:500,color:'var(--text-2)'}}>
            <span className="stage-card__num" style={{background:'var(--ok-500)',color:'#fff',width:18,height:18,borderRadius:'50%',display:'grid',placeItems:'center',fontSize:10,fontWeight:700,flexShrink:0}}>✓</span>
            AI 追问过程
            <Badge tone="ok" dot>已完成 · {d.conversation.filter(m => m.from === 'user').length} 轮问答</Badge>
          </div>
          <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)',display:'flex',alignItems:'center',gap:4}}>
            {convoOpen ? '收起' : '展开详情'}
            <IconChevron style={{transform: convoOpen ? 'rotate(270deg)' : 'rotate(90deg)', transition:'transform .15s'}}/>
          </span>
        </div>
        {convoOpen && (
          <div style={{padding:'16px 20px',borderTop:'1px solid var(--border)'}}>
            <ConvoMessages messages={d.conversation}/>
          </div>
        )}
      </div>

      {/* HPO terms */}
      <div className="panel" style={{marginBottom:14}}>
        <div className="panel__head">
          <span className="panel__title">输入 HPO 表型</span>
          <span style={{fontSize:'var(--fz-11)',fontFamily:'var(--font-mono)',color:'var(--text-4)'}}>
            {d.hpoList.length} 项
          </span>
        </div>
        <div className="panel__body" style={{paddingTop:12,paddingBottom:12}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {d.hpoList.map(h => (
              <Hpo key={h.id} id={h.id} label={h.label} removable={false}/>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 + Detail — left / right split */}
      <div style={{display:'flex',gap:14,alignItems:'start'}}>

        {/* Left — Top 5 disease list */}
        <div style={{width:320,flexShrink:0}}>
          <div className="panel__head" style={{
            background:'var(--bg-sunken)',border:'1px solid var(--border)',
            borderRadius:'var(--r-4) var(--r-4) 0 0',borderBottom:'none',
            padding:'10px 14px',
          }}>
            <span className="panel__title" style={{fontSize:'var(--fz-12)'}}>候选疾病 Top 5</span>
          </div>
          <div className="disease-rank" style={{borderRadius:'0 0 var(--r-4) var(--r-4)'}}>
            {d.top5.map((r, i) => (
              <div key={i} className={'disease-rank__row-wrap' + (selected === i ? ' is-selected' : '')}>
                <div
                  className={'disease-rank__row--flex' + (selected === i ? ' is-selected' : '')}
                  onClick={() => selectDisease(i)}
                >
                  <Rank n={r.rank}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="disease-rank__name-main" style={{fontSize:'var(--fz-13)'}}>{r.nameCn}</div>
                    <div className="disease-rank__name-sub" style={{marginBottom:8}}>{r.name}</div>
                    {/* <MatchBar value={r.match}/> */}
                  </div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6,flexShrink:0}}>
                    <Conf value={r.conf} level={r.level}/>
                    <div style={{display:'flex',gap:4}}>
                      <Badge tone="brand" pill>{r.gene}</Badge>
                      <Badge tone="outline" pill>{r.inherit}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Disease detail */}
        <div style={{flex:1,minWidth:0}}>
          <div className="panel">
            {/* Detail head: disease title */}
            <div className="panel__head" style={{flexDirection:'column',alignItems:'flex-start',gap:10}}>
              <div style={{display:'flex',alignItems:'center',gap:8,width:'100%',justifyContent:'space-between'}}>
                <h3 className="panel__title" style={{fontSize:'var(--fz-14)'}}>
                  <Rank n={dis.rank}/>
                  {dis.nameCn}
                </h3>
                <span style={{fontSize:'var(--fz-11)',fontFamily:'var(--font-mono)',color:'var(--text-4)',flexShrink:0}}>
                  {dis.omim}{dis.orpha ? ' · ' + dis.orpha : ''}
                </span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,width:'100%',justifyContent:'space-between'}}>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  <Badge tone="brand">{dis.gene}</Badge>
                  <Badge tone="outline">{dis.inherit}</Badge>
                  <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>{dis.summary}</span>
                </div>
              </div>
              {/* Subtabs */}
              <div className="subtabs">
                {subtabs.map(s => (
                  <button
                    key={s.key}
                    className={'subtabs__item' + (subTab === s.key ? ' is-active' : '')}
                    onClick={() => setSubTab(s.key)}
                  >{s.label}</button>
                ))}
              </div>
            </div>

            {/* Detail body */}
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
        </div>

      </div>
    </>
  )
}

function HpoMatchView() {
  const d = HPO_DIAG
  return (
    <div className="scroll-area">
      <table className="tbl">
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
                <td><RefCite refStr={m.ref} allRefs={d.references}/></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function RefCite({ refStr, allRefs }) {
  const spanRef = useRef(null)
  const [tipRect, setTipRect] = useState(null)

  const nums = (refStr.match(/\d+/g) || []).map(Number)
  const items = nums.map(n => allRefs.find(r => r.n === n)).filter(Boolean)

  if (!items.length) return <span className="mono" style={{color:'var(--text-4)'}}>{refStr}</span>

  const handleEnter = () => {
    if (spanRef.current) setTipRect(spanRef.current.getBoundingClientRect())
  }

  return (
    <span ref={spanRef} style={{position:'relative',display:'inline-block'}}
      onMouseEnter={handleEnter} onMouseLeave={() => setTipRect(null)}>
      <span style={{
        fontFamily:'var(--font-mono)',fontSize:'var(--fz-11)',fontWeight:600,
        color:'var(--accent)',background:'var(--accent-soft)',
        padding:'1px 5px',borderRadius:'var(--r-2)',cursor:'default',
        border:'1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
      }}>{refStr}</span>
      {tipRect && (
        <div style={{
          position:'fixed',
          bottom: window.innerHeight - tipRect.top + 8,
          left: Math.min(tipRect.left, window.innerWidth - 356),
          width: 340,
          background:'var(--bg-surface)',
          border:'1px solid var(--border)',
          borderRadius:'var(--r-3)',
          boxShadow:'0 6px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
          padding:'10px 12px',
          zIndex:9999,
          pointerEvents:'none',
          display:'flex',flexDirection:'column',gap:8,
        }}>
          <div style={{fontSize:'var(--fz-10)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-4)',marginBottom:2}}>参考文献</div>
          {items.map(item => (
            <div key={item.n} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
              <span style={{
                fontFamily:'var(--font-mono)',fontSize:'var(--fz-11)',fontWeight:700,
                color:'var(--accent)',background:'var(--accent-soft)',
                padding:'0 4px',borderRadius:'var(--r-1)',flexShrink:0,lineHeight:'18px',
              }}>[{item.n}]</span>
              <span style={{fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.55}}>{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </span>
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
      <table className="tbl cmp-table">
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
    <table className="tbl">
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
   Shared: structured conversation renderer
   ============================================================ */
function ConvoMessages({ messages }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      {messages.map((m, i) => {
        if (m.from === 'ai') {
          return (
            <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
              <div className="chat__avatar chat__avatar--ai" style={{flexShrink:0,marginTop:2}}>AI</div>
              <div style={{flex:1,minWidth:0}}>
                <div className="chat__bubble" style={{borderTopLeftRadius:2,display:'inline-block',marginBottom: m.reason || m.choices?.length ? 6 : 0}}>
                  {m.text}
                  {m.refs?.map((x, j) => <a key={j} className="cite-sup">[{x.n}]</a>)}
                </div>
                {m.reason && (
                  <div style={{
                    display:'flex',alignItems:'flex-start',gap:6,
                    fontSize:'var(--fz-11)',color:'var(--text-3)',lineHeight:1.5,
                    marginBottom:8,padding:'5px 8px',
                    background:'var(--n-50)',border:'1px solid var(--border-subtle)',
                    borderRadius:'var(--r-2)',
                  }}>
                    <span style={{color:'var(--text-4)',flexShrink:0,fontWeight:600}}>询问目的</span>
                    <span>{m.reason}</span>
                  </div>
                )}
                {m.choices?.length > 0 && (
                  <div className="chat__choices">
                    {m.choices.map((c, ci) => {
                      const next = messages[i + 1]
                      const isChosen = next?.from === 'user' && next?.chosen === c
                      return (
                        <span key={ci} className="chat__choice" style={isChosen ? {
                          borderColor:'var(--accent)',color:'var(--accent)',
                          background:'var(--accent-soft)',fontWeight:600,
                        } : {opacity:0.55}}>{c}</span>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        }
        return (
          <div key={i} className="chat__msg chat__msg--user">
            <div className="chat__avatar chat__avatar--user">我</div>
            <div className="chat__bubble">{m.text}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================
   HpoRunning
   ============================================================ */
function HpoRunning({ patientId, setRoute }) {
  const r = HPO_RUNNING
  const [stage, setStage] = useState(1)
  const [hpoList, setHpoList] = useState(r.stage2.extracted)
  const [q, setQ] = useState('')
  const [steps3, setSteps3] = useState(() => r.stage3.steps.map(s => ({ ...s })))
  const navigatedRef = useRef(false)

  const removeHpo = (id) => setHpoList(hpoList.filter(h => h.id !== id))
  const handleTerminate = () => setRoute({ view: 'new', patientId })

  // Advance stage 3 steps one by one on a timer
  useEffect(() => {
    if (stage !== 3) return
    const timer = setInterval(() => {
      setSteps3(prev => {
        const runIdx = prev.findIndex(s => s.status === 'running')
        if (runIdx === -1) return prev
        return prev.map((s, i) => {
          if (i === runIdx) return { ...s, status: 'done' }
          if (i === runIdx + 1 && s.status === 'queue') return { ...s, status: 'running' }
          return s
        })
      })
    }, 2500)
    return () => clearInterval(timer)
  }, [stage])

  // Navigate to result page when all stage 3 steps are done
  useEffect(() => {
    if (stage !== 3 || navigatedRef.current) return
    if (!steps3.every(s => s.status === 'done')) return
    navigatedRef.current = true
    const t = setTimeout(() => {
      setRoute({ view: 'patient', id: patientId, tab: 'hpo', sub: 'done' })
    }, 800)
    return () => clearTimeout(t)
  }, [stage, steps3, patientId, setRoute])

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
            {stage > 1
              ? <Badge tone="ok" dot>已完成 · {r.stage1.messages.filter(m => m.from === 'user').length} 轮问答</Badge>
              : <span className="running-pill"><span className="spinner"/>追问中</span>}
          </div>
          {stage > 1 && <Btn variant="ghost" size="sm">查看完整对话 <IconChevron/></Btn>}
        </div>
        <div className="stage-card__body" style={{padding:'16px 20px'}}>
          <ConvoMessages messages={r.stage1.messages}/>
        </div>
        {stage === 1 && (
          <div className="stage-confirm">
            <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>AI 已完成追问，请确认后进入 HPO 清单整理。</span>
            <Btn variant="primary" size="sm" onClick={() => setStage(2)}>
              <IconCheck/>确认对话完成，进入 HPO 清单
            </Btn>
          </div>
        )}
      </div>

      <div className={'stage-card ' + (stage > 2 ? 'is-done' : stage === 2 ? 'is-active' : stage < 2 ? '' : '')}>
        <div className="stage-card__head">
          <div className="stage-card__title">
            <span className="stage-card__num">2</span>
            HPO 清单确认
            {stage > 2
              ? <Badge tone="ok" dot>已确认 {hpoList.length} 项</Badge>
              : stage === 2
                ? <Badge tone="info" dot>请核对并确认</Badge>
                : null}
          </div>
          {stage >= 2 && (
            <div className="input-wrap" style={{width:260}}>
              <span className="input-wrap__icon"><IconSearch/></span>
              <input className="input" placeholder="按 HPO 名称或 HP:ID 搜索..." value={q} onChange={e => setQ(e.target.value)}/>
            </div>
          )}
        </div>
        {stage >= 2 && (
          <>
            <div className="stage-card__body" style={{padding:'14px 18px'}}>
              <div className="hpo-bag">
                {hpoList.map(h => (
                  <span key={h.id} className="hpo">
                    <span className="hpo__id">{h.id}</span>
                    <span className="hpo__label">{h.label}</span>
                    {stage === 2 && <span className="hpo__x" onClick={() => removeHpo(h.id)}><IconX/></span>}
                  </span>
                ))}
                {stage === 2 && <button className="btn btn--secondary btn--sm" style={{height:22}}><IconPlus/>手动添加</button>}
              </div>
            </div>
            {stage === 2 && (
              <div className="stage-confirm">
                <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>共 {hpoList.length} 项 HPO 表型，确认无误后开始推理。</span>
                <Btn variant="primary" size="sm" onClick={() => setStage(3)}>
                  <IconCheck/>确认 HPO 清单，开始推理
                </Btn>
              </div>
            )}
          </>
        )}
      </div>

      <div className={'stage-card ' + (stage === 3 ? 'is-active' : '')}>
        <div className="stage-card__head">
          <div className="stage-card__title">
            <span className="stage-card__num">3</span>
            自动推理
            {stage === 3 && <span className="running-pill"><span className="spinner"/>运行中 · 02:36</span>}
          </div>
          {stage === 3 && (
            <div className="flex gap-2" style={{alignItems:'center'}}>
              <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>开始于 {r.stage3.startedAt}</span>
              <Btn variant="ghost" size="sm" onClick={handleTerminate}><IconX/>终止</Btn>
            </div>
          )}
        </div>
        {stage === 3 && (
          <div className="stage-card__body">
            <div className="reasoning-steps">
              {steps3.map((s, i) => (
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
        )}
      </div>
    </>
  )
}

/* ============================================================
   VcfRunning
   ============================================================ */
function VcfRunning({ patientId, setRoute }) {
  const r = VCF_RUNNING
  const [steps, setSteps] = useState(() => r.steps.map(s => ({ ...s })))
  const navigatedRef = useRef(false)

  const handleTerminate = () => setRoute({ view: 'new', patientId })

  // Advance pipeline steps one by one on a timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSteps(prev => {
        const runIdx = prev.findIndex(s => s.status === 'running')
        if (runIdx === -1) return prev
        return prev.map((s, i) => {
          if (i === runIdx) return { ...s, status: 'done' }
          if (i === runIdx + 1 && s.status === 'queue') return { ...s, status: 'running' }
          return s
        })
      })
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  // Navigate to result page when all pipeline steps are done
  useEffect(() => {
    if (navigatedRef.current) return
    if (!steps.every(s => s.status === 'done')) return
    navigatedRef.current = true
    const t = setTimeout(() => {
      setRoute({ view: 'patient', id: patientId, tab: 'vcf', sub: 'done' })
    }, 800)
    return () => clearTimeout(t)
  }, [steps, patientId, setRoute])

  return (
    <>
      <div className="panel" style={{marginBottom:14}}>
        <div className="panel__head">
          <h3 className="panel__title">
            <StatusDot kind="queue">VCF 基因诊断 · 分析中</StatusDot>
          </h3>
          <div style={{display:'flex',alignItems:'center',gap:16,fontSize:'var(--fz-12)',color:'var(--text-3)'}}>
            <span>开始于 <b style={{color:'var(--text-1)',fontFamily:'var(--font-mono)'}}>{r.startedAt}</b></span>
            <Btn variant="ghost" size="sm" onClick={handleTerminate}><IconX/>终止</Btn>
          </div>
        </div>
      </div>

      <div className="stage-card is-active">
        <div className="stage-card__head">
          <div className="stage-card__title">
            <span className="stage-card__num" style={{background:'var(--info-500)',color:'#fff'}}>∞</span>
            流水线进度
            <span className="running-pill"><span className="spinner"/>分析中</span>
          </div>
        </div>
        <div className="stage-card__body">
          <div className="reasoning-steps">
            {steps.map((s, i) => (
              <div key={s.key} className={'reasoning-step is-' + s.status}>
                <div className="reasoning-step__icon">
                  {s.status === 'done' ? <IconCheck/> : i + 1}
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
      <div className="kpi-inline" style={{marginBottom:16}}>
        {v.steps.map((s, i) => (
          <div key={i} className={'kpi-inline__item' + (i === v.steps.length - 1 ? ' kpi-inline__item--accent' : '')}>
            <div className="kpi-inline__label">{s.label}</div>
            <div className="kpi-inline__val">{s.value}</div>
            <div className="kpi-inline__sub">{s.meta}</div>
            <div className="kpi-inline__arrow"/>
          </div>
        ))}
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
    </tr>
  )
}

function VSection({ title, subtitle, count }) {
  return (
    <tr><td colSpan={10} style={{padding:0}}>
      <div className="vtable__section">
        <div>{title} <span style={{color:'var(--text-4)',textTransform:'none',letterSpacing:0,marginLeft:8,fontWeight:500}}>{subtitle}</span></div>
        <div className="count">{count} 条</div>
      </div>
    </td></tr>
  )
}

function DiseaseCard({ d }) {
  const inheritTone = { AR: 'soft-info', AD: 'soft-warn', XL: 'soft-err', XR: 'soft-err' }
  return (
    <div style={{
      marginBottom: 18,
      maxWidth: 1050,
      borderRadius: 'var(--r-3)',
      border: '1px solid var(--border)',
      borderLeft: '3px solid var(--accent)',
      background: 'var(--bg-surface)',
      overflow: 'hidden',
    }}>
      {/* 身份层 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        padding: '10px 14px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-sunken)',
      }}>
        <span style={{fontWeight: 700, fontSize: 'var(--fz-14)', color: 'var(--text-1)'}}>{d.nameCn}</span>
        <span style={{fontSize: 'var(--fz-12)', color: 'var(--text-3)'}}>{d.nameEn}</span>
        <div style={{display:'flex', gap: 6, marginLeft: 4, flexWrap: 'wrap'}}>
          <Badge tone={inheritTone[d.inherit] || 'soft-brand'} pill>{d.inherit}</Badge>
          {d.omim && <span className="mono" style={{fontSize:'var(--fz-11)',fontWeight:600,padding:'2px 6px',borderRadius:'var(--r-2)',background:'var(--n-100)',color:'var(--text-2)',border:'1px solid var(--border)'}}>{d.omim}</span>}
          {d.orpha && <span className="mono" style={{fontSize:'var(--fz-11)',fontWeight:600,padding:'2px 6px',borderRadius:'var(--r-2)',background:'var(--n-100)',color:'var(--text-2)',border:'1px solid var(--border)'}}>{d.orpha}</span>}
        </div>
      </div>

      <div style={{padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12}}>
        {/* 临床层 — 描述 */}
        <p style={{margin: 0, fontSize: 'var(--fz-12)', color: 'var(--text-2)', lineHeight: 1.65, whiteSpace: 'normal', overflowWrap: 'break-word'}}>{d.description}</p>

        {/* 临床层 — 特征 chips */}
        {d.features?.length > 0 && (
          <div>
            <div style={{fontSize:'var(--fz-10)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-4)',marginBottom:6}}>临床特征</div>
            <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
              {d.features.map((f, i) => (
                <span key={i} style={{
                  fontSize: 'var(--fz-11)', color: 'var(--text-2)',
                  padding: '2px 8px', borderRadius: 'var(--r-pill)',
                  background: 'var(--n-100)', border: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}>{f}</span>
              ))}
            </div>
          </div>
        )}

        {/* 溯源层 — 参考文献 */}
        {d.refs?.length > 0 && (
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 10,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{fontSize:'var(--fz-10)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-4)',marginBottom:2}}>参考文献</div>
            {d.refs.map(ref => (
              <div key={ref.n} style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                <span className="mono" style={{fontSize:'var(--fz-11)',fontWeight:700,color:'var(--accent)',flexShrink:0,lineHeight:'18px'}}>[{ref.n}]</span>
                <span style={{fontSize:'var(--fz-11)', color:'var(--text-3)', lineHeight:1.55}}>{ref.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function VRow({ r, expanded, onToggle }) {
  const [vTab, setVTab] = useState('acmg')

  useEffect(() => {
    if (expanded) setVTab('acmg')
  }, [expanded])

  const vtabs = [
    { key: 'acmg',      label: 'ACMG 详情' },
    { key: 'disease',   label: '相关疾病' },
    { key: 'synthesis', label: '综合分析' },
    { key: 'refs',      label: '数据库/参考文献' },
  ]

  const acmgScore = r.criteria ? r.criteria.filter(c => c.hit).reduce((s, c) => s + (c.weight || 0), 0) : 0
  const acmgHit   = r.criteria ? r.criteria.filter(c => c.hit).length : 0
  const acmgTotal = r.criteria ? r.criteria.length : 0

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
      </tr>
      {expanded && (
        <tr><td colSpan={10} style={{padding:0}}>
          <div className="vdetail">
            <div className="vdetail__head">
              <div className="subtabs">
                {vtabs.map(t => (
                  <button
                    key={t.key}
                    className={'subtabs__item' + (vTab === t.key ? ' is-active' : '')}
                    onClick={() => setVTab(t.key)}
                  >{t.label}</button>
                ))}
              </div>
            </div>
            <div className="vdetail__body">
              {vTab === 'acmg'      && <VTabAcmg r={r}/>}
              {vTab === 'disease'   && <VTabDisease r={r}/>}
              {vTab === 'synthesis' && <VTabSynthesis r={r}/>}
              {vTab === 'refs'      && <VTabRefs r={r}/>}
            </div>
          </div>
        </td></tr>
      )}
    </>
  )
}

function VTabAcmg({ r }) {
  if (!r.criteria) return <VTabEmpty text="暂无 ACMG 证据详情"/>
  const score = r.criteria.filter(c => c.hit).reduce((s, c) => s + (c.weight || 0), 0)
  const hit   = r.criteria.filter(c => c.hit).length
  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,marginBottom:10,flexWrap:'wrap'}}>
        {/* <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)'}}>ACMG 证据条目</div> */}
        <div style={{fontSize:'var(--fz-12)',color:'var(--text-3)',display:'flex',gap:10,alignItems:'center'}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:6}}>综合评级<Acmg k={r.acmg}/></span>
          <span>累计评分 <b className="mono" style={{color:'var(--text-1)',fontSize:'var(--fz-14)'}}>
            {score > 0 ? '+' : ''}{score}
          </b> 分 <span style={{color:'var(--text-4)'}}>(致病阈值 ≥6)</span></span>
          <span>命中 <b className="mono" style={{color:'var(--text-1)'}}>{hit}</b> / {r.criteria.length} 条</span>
        </div>
      </div>
      <table className="tbl" style={{border:'1px solid var(--border)',borderRadius:'var(--r-3)',marginBottom:20}}>
        <thead><tr>
          <th style={{width:64}}>类型</th><th style={{width:64}}>证据</th><th style={{width:54}}>评分</th>
          <th>判定依据</th><th style={{width:220}}>参考文献 / 数据库</th>
        </tr></thead>
        <tbody>
          {r.criteria.map((c, i) => {
            const isBenign = c.type === '良性证据'
            return (
              <tr key={i} style={{opacity: c.hit ? 1 : 0.5}}>
                <td>
                  {c.type && (
                    <span style={{
                      display:'inline-block',fontSize:'var(--fz-11)',fontWeight:600,
                      padding:'2px 7px',borderRadius:'var(--r-2)',whiteSpace:'nowrap',
                      background: isBenign ? 'var(--acmg-b-bg)' : 'var(--acmg-p-bg)',
                      color:      isBenign ? 'var(--acmg-b-fg)' : 'var(--acmg-p-fg)',
                    }}>{c.type}</span>
                  )}
                </td>
                <td><b className="mono" style={{color: isBenign ? 'var(--acmg-b-fg)' : 'var(--acmg-p-fg)',fontWeight:700}}>{c.code}</b></td>
                <td className="mono" style={{fontWeight:600,color:(c.weight||0)>0?'var(--err-700)':(c.weight||0)<0?'var(--ok-700)':'var(--text-4)'}}>
                  {(c.weight||0)>0?'+':''}{c.weight||0}
                </td>
                <td style={{color:'var(--text-2)',lineHeight:1.55,whiteSpace:'normal',padding:'8px 12px'}}>{c.rationale || c.text}</td>
                <td><RefCite refStr={c.ref || '—'} allRefs={r.literature || []}/></td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:24}}>
        {r.predictions && (
          <div>
            <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:8}}>预测工具详情</div>
            <div style={{border:'1px solid var(--border-subtle)',borderRadius:'var(--r-3)',overflow:'hidden'}}>
            <table className="tbl cmp-table">
              <thead><tr><th>工具</th><th>分数</th><th>结论</th></tr></thead>
              <tbody>
                {r.predictions.map((p, i) => (
                  <tr key={i}>
                    <td className="t-3">{p.tool}</td>
                    <td className="mono fw-6">{p.score}</td>
                    <td style={{color: p.label.toLowerCase().includes('no') || p.label.toLowerCase().includes('benign') ? 'var(--text-3)' : 'var(--err-700)'}}>{p.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
        {r.popFreq && (
          <div>
            <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:8}}>群体频率</div>
            <div style={{border:'1px solid var(--border-subtle)',borderRadius:'var(--r-3)',overflow:'hidden'}}>
            <table className="tbl cmp-table">
              <thead><tr>
                <th>数据库</th><th className="num">AF</th>
                <th>数据库</th><th className="num">AF</th>
              </tr></thead>
              <tbody>
                {Array.from({length: Math.ceil(r.popFreq.length / 2)}, (_, i) => {
                  const fmtAF = row => {
                    const n = +row.af
                    return { display: isNaN(n) ? '—' : n === 0 ? '0' : n.toFixed(10).replace(/0+$/, '').replace(/\.$/, ''), n }
                  }
                  const a = r.popFreq[i * 2]
                  const b = r.popFreq[i * 2 + 1]
                  const fa = fmtAF(a)
                  return (
                    <tr key={i}>
                      <td className="t-3">{a.db}</td>
                      <td className="mono num" style={{color: fa.n > 0.001 ? 'var(--err-700)' : 'var(--text-1)'}}>{fa.display}</td>
                      {b ? (() => { const fb = fmtAF(b); return (<>
                        <td className="t-3">{b.db}</td>
                        <td className="mono num" style={{color: fb.n > 0.001 ? 'var(--err-700)' : 'var(--text-1)'}}>{fb.display}</td>
                      </>) })() : <><td/><td/></>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function VTabDisease({ r }) {
  if (!r.disease) return <VTabEmpty text="暂无相关疾病信息"/>
  return <DiseaseCard d={r.disease}/>
}

function VTabSynthesis({ r }) {
  const text = r.synthesis || r.geneInfo
  if (!text) return <VTabEmpty text="暂无综合分析内容"/>
  return (
    <div style={{
      maxWidth: 1000,
      maxHeight: 360,
      overflowY: 'auto',
      padding: '12px 14px',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--r-3)',
      background: 'var(--bg-surface)',
    }}>
      {text.split('\n\n').map((para, i) => (
        <p key={i} style={{margin:'0 0 14px',fontSize:'var(--fz-13)',color:'var(--text-2)',lineHeight:1.8,whiteSpace:'pre-wrap',wordBreak:'break-word'}}>{para}</p>
      ))}
    </div>
  )
}

function VTabRefs({ r }) {
  const SectionLabel = ({ children }) => (
    <div style={{fontSize:'var(--fz-11)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:8}}>
      {children}
    </div>
  )

  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      {r.databases?.length > 0 && (
        <div>
          <SectionLabel>数据库</SectionLabel>
          <div style={{display:'flex',flexDirection:'column',gap:0,border:'1px solid var(--border)',borderRadius:'var(--r-3)',overflow:'hidden'}}>
            {r.databases.map((db, i) => (
              <div key={i} style={{
                display:'flex',alignItems:'center',gap:12,
                padding:'8px 12px',
                borderBottom: i < r.databases.length - 1 ? '1px solid var(--border)' : 'none',
                background:'var(--bg-surface)',
              }}>
                <span style={{width:72,flexShrink:0,fontSize:'var(--fz-12)',fontWeight:600,color:'var(--text-2)'}}>{db.name}</span>
                <a href={db.url} target="_blank" rel="noreferrer" className="mono" style={{
                  fontSize:'var(--fz-12)',color:'var(--accent)',
                  textDecoration:'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration='underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration='none'}
                >{db.value}</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {r.literature?.length > 0 && (
        <div>
          <SectionLabel>参考文献</SectionLabel>
          <div style={{display:'flex',flexDirection:'column',gap:10,fontSize:'var(--fz-13)',lineHeight:1.65,color:'var(--text-2)'}}>
            {r.literature.map(ref => (
              <div key={ref.n} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                <span className="mono" style={{
                  fontSize:'var(--fz-11)',fontWeight:700,color:'var(--accent)',
                  background:'var(--accent-soft)',padding:'1px 5px',
                  borderRadius:'var(--r-1)',flexShrink:0,lineHeight:'20px',
                }}>[{ref.n}]</span>
                <span>{ref.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!r.databases?.length && !r.literature?.length && <VTabEmpty text="暂无数据库及文献信息"/>}
    </div>
  )
}

function VTabEmpty({ text }) {
  return (
    <div style={{padding:'32px 0',textAlign:'center',fontSize:'var(--fz-13)',color:'var(--text-4)'}}>
      {text}
    </div>
  )
}

/* ============================================================
   HistoryTab — task list timeline
   ============================================================ */
function HistoryTab({ patient, tasks, onNavigate }) {
  if (!tasks.length) {
    return (
      <div style={{padding:'40px 24px',textAlign:'center',fontSize:'var(--fz-13)',color:'var(--text-4)'}}>
        暂无诊断任务记录
      </div>
    )
  }

  const histSummary = patient.coreSymptoms || patient.summary || ''

  return (
    <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:0}}>
      {tasks.map((task, ti) => {
        const tab = task.type === 'VCF' ? 'vcf' : 'hpo'
        const sub = task.status === 'running' ? 'running' : 'done'
        const dotColor = task.status === 'done' ? 'var(--ok-500)' : task.status === 'running' ? 'var(--accent)' : 'var(--err-500)'
        return (
          <div key={task.id} style={{display:'flex',gap:0}}>
            {/* timeline spine */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:28,flexShrink:0}}>
              <div style={{
                width:10,height:10,borderRadius:'50%',flexShrink:0,
                background:dotColor,marginTop:5,
              }}/>
              {ti < tasks.length - 1 && (
                <div style={{flex:1,width:2,background:'var(--border)',minHeight:20,margin:'4px 0'}}/>
              )}
            </div>

            {/* task card */}
            <div style={{flex:1,marginLeft:12,paddingBottom: ti < tasks.length - 1 ? 20 : 0}}>
              {/* header row: time + status + id */}
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,flexWrap:'wrap'}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--fz-12)',fontWeight:600,color:'var(--text-2)'}}>{task.time}</span>
                {task.status === 'running'
                  ? <span className="running-pill"><span className="spinner"/>进行中</span>
                  : task.status === 'done'
                    ? <StatusDot kind="ok">完成</StatusDot>
                    : <StatusDot kind="err">失败</StatusDot>
                }
                <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--fz-11)',color:'var(--text-4)',marginLeft:'auto'}}>{task.id}</span>
              </div>

              {/* patient history summary at this time */}
              {histSummary && (
                <div style={{
                  fontSize:'var(--fz-12)',color:'var(--text-3)',lineHeight:1.5,
                  marginBottom:8,paddingLeft:2,
                }}>
                  {histSummary}
                </div>
              )}

              {/* task result card — full area clickable */}
              <div
                className={task.status !== 'failed' ? 'hist-task-card hist-task-card--clickable' : 'hist-task-card'}
                style={{
                  background:'var(--bg-surface)',border:'1px solid var(--border)',
                  borderRadius:'var(--r-3)',padding:'10px 12px',
                  display:'flex',alignItems:'center',gap:10,
                  cursor: task.status !== 'failed' ? 'pointer' : 'default',
                }}
                onClick={task.status !== 'failed' ? () => onNavigate(tab, sub) : undefined}
              >
                <span className={`pv2-type-tag pv2-type-tag--${task.type.toLowerCase()}`} style={{flexShrink:0}}>{task.type}</span>
                <div style={{flex:1,fontSize:'var(--fz-13)',color:'var(--text-2)',lineHeight:1.55}}>
                  {task.result}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================
   DeleteDialog
   ============================================================ */
function EditDialog({ patient, onClose, onSave }) {
  const p = patient
  const [draft, setDraft] = useState({
    name:          p.name        || '',
    gender:        p.gender      || '',
    age:           String(p.age  || ''),
    dob:           p.dob         || '',
    ethnicity:     p.ethnicity   || '',
    consanguinity: p.consanguinity || '否',
    familyHistory: p.familyHistory || '',
    presentText:   p.presentText  || p.summary || '',
  })
  const [hpoList, setHpoList]   = useState([...(p.hpoTerms || [])])
  const [hpoInput, setHpoInput] = useState('')

  const removeHpo = (id) => setHpoList(hpoList.filter(h => h.id !== id))
  const addHpo = () => {
    const label = hpoInput.trim()
    if (!label) return
    const isId  = /^HP:\d+$/i.test(label)
    setHpoList([...hpoList, { id: isId ? label.toUpperCase() : `HP:custom_${Date.now()}`, label: isId ? label : label }])
    setHpoInput('')
  }

  const SectionHead = ({ n, title, hint }) => (
    <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:16,paddingBottom:10,borderBottom:'1px solid var(--border)'}}>
      <span style={{
        display:'inline-flex',alignItems:'center',justifyContent:'center',
        width:20,height:20,borderRadius:'50%',flexShrink:0,
        background:'var(--accent)',color:'#fff',fontSize:'var(--fz-11)',fontWeight:700,
      }}>{n}</span>
      <span style={{fontWeight:600,fontSize:'var(--fz-14)',color:'var(--text-1)'}}>{title}</span>
      {hint && <span style={{fontSize:'var(--fz-12)',color:'var(--text-4)',marginLeft:4}}>{hint}</span>}
    </div>
  )

  return (
    <div className="overlay" onClick={onClose}>
      <div className="dialog dialog--wide" onClick={e => e.stopPropagation()}>

        <div className="dialog__head" style={{alignItems:'center'}}>
          <div>
            <div className="dialog__title">编辑患者档案</div>
            <div className="dialog__desc">{p.name} · {p.id}</div>
          </div>
          <Btn variant="ghost" size="sm" onClick={onClose} style={{marginLeft:'auto'}}><IconX/></Btn>
        </div>

        <div className="dialog__body">
          <div style={{padding:'24px 28px',display:'flex',flexDirection:'column',gap:32}}>

            {/* ── 1. 基本信息 ── */}
            <div>
              <SectionHead n="1" title="基本信息"/>
              <div className="form-grid">
                <Field label="姓名" required>
                  <input className="input" value={draft.name}
                    onChange={e => setDraft({...draft, name: e.target.value})}/>
                </Field>
                <Field label="性别" required>
                  <select className="select" value={draft.gender}
                    onChange={e => setDraft({...draft, gender: e.target.value})}>
                    <option value="">请选择</option>
                    <option>男</option><option>女</option>
                  </select>
                </Field>
                <Field label="出生日期">
                  <input className="input" value={draft.dob} placeholder="YYYY-MM-DD"
                    onChange={e => setDraft({...draft, dob: e.target.value})}/>
                </Field>
                <Field label="民族 / 族裔">
                  <input className="input" value={draft.ethnicity} placeholder="如：汉族"
                    onChange={e => setDraft({...draft, ethnicity: e.target.value})}/>
                </Field>
                <Field label="年龄">
                  <input className="input" value={draft.age} placeholder="如：14"
                    onChange={e => setDraft({...draft, age: e.target.value})}/>
                </Field>
                <Field label="近亲婚配史">
                  <select className="select" value={draft.consanguinity}
                    onChange={e => setDraft({...draft, consanguinity: e.target.value})}>
                    <option>否</option><option>是</option><option>不详</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* ── 2. HPO 表型 ── */}
            <div>
              <SectionHead n="2" title="HPO 表型" hint={`当前 ${hpoList.length} 项`}/>
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:10}}>
                {hpoList.map(h => (
                  <Hpo key={h.id} id={h.id} label={h.label}
                    removable onRemove={() => removeHpo(h.id)}/>
                ))}
                {hpoList.length === 0 && (
                  <span style={{fontSize:'var(--fz-12)',color:'var(--text-4)'}}>暂无 HPO 表型，请在下方添加</span>
                )}
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <div className="input-wrap" style={{flex:1,maxWidth:360}}>
                  <span className="input-wrap__icon"><IconSearch/></span>
                  <input className="input" placeholder="输入 HPO ID（如 HP:0001300）或表型名称..."
                    value={hpoInput}
                    onChange={e => setHpoInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addHpo()}/>
                </div>
                <Btn variant="secondary" size="sm" onClick={addHpo}><IconPlus/>添加</Btn>
              </div>
            </div>

            {/* ── 3. 病史 & 家族史 ── */}
            <div>
              <SectionHead n="3" title="病史 & 家族史"/>
              <div className="form-grid">
                <div className="field field--wide">
                  <label className="field__label">病史文本 <span className="req">*</span></label>
                  <textarea className="textarea" rows={8}
                    style={{resize:'vertical'}}
                    placeholder="主诉、现病史、既往史、体格检查、辅助检查..."
                    value={draft.presentText}
                    onChange={e => setDraft({...draft, presentText: e.target.value})}/>
                </div>
                <div className="field field--wide">
                  <label className="field__label">家族史</label>
                  <textarea className="textarea" rows={3}
                    placeholder="有无类似疾病患者、近亲婚配、新生儿死亡、晚发肝病等"
                    value={draft.familyHistory}
                    onChange={e => setDraft({...draft, familyHistory: e.target.value})}/>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="dialog__foot" style={{borderTop:'1px solid var(--border)',background:'var(--bg-sunken)'}}>
          <span style={{flex:1,fontSize:'var(--fz-12)',color:'var(--text-3)',display:'flex',alignItems:'center',gap:6}}>
            <IconInfo/>保存后将自动触发新一轮 HPO 表型诊断
          </span>
          <Btn variant="secondary" onClick={onClose}>取消</Btn>
          <Btn variant="primary" onClick={onSave}><IconCheck/>保存并重新诊断</Btn>
        </div>

      </div>
    </div>
  )
}

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
