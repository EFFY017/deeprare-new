import { useState, useMemo, useEffect } from 'react'
import { Btn, StatusDot, Hpo } from '../components/primitives'
import { IconSearch, IconPlus, IconChevron, IconX, IconCheck, IconEye, IconEyeOff, IconWarning } from '../components/icons'
import { PATIENTS, HERO_PATIENT, TASK_MAP } from '../data/mockData'

const IconPencil = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M9 2.5 11.5 5 5 11.5H2.5V9L9 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M7.5 4 10 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

/* ---------- Supplemental patient info ---------- */
const PATIENT_EXTRA = {
  'P-2024-0298': { dob:'2019-05-10', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'发育迟缓 · 特殊面容 · 房间隔缺损', familyHistory:'父母非近亲结婚，家族无类似病史。' },
  'P-2025-0011': { dob:'2022-09-01', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'喂养困难 · 肌张力低下 · 新生儿筛查异常', familyHistory:'父母体健，非近亲婚配，家族无遗传病史。' },
  'P-2024-0256': { dob:'2002-04-14', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'高个长指 · 晶状体脱位 · 主动脉根部扩张', familyHistory:'父亲体型高挑，有主动脉相关心脏病史。' },
  'P-2024-0244': { dob:'2015-07-03', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'进行性肌无力 · 腓肠肌肥大 · CK 显著升高', familyHistory:'母亲携带者，舅舅有类似肌病史。' },
  'P-2024-0211': { dob:'1993-03-28', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'反复发作性腹痛 · 皮肤光敏感 · 尿液变红', familyHistory:'父亲有不明原因腹痛发作史。' },
  'P-2025-0018': { dob:'2019-11-20', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'反复感染 · 湿疹 · 血小板减少', familyHistory:'父母非近亲，家族无免疫缺陷病史。' },
  'P-2024-0189': { dob:'2007-08-11', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'夜盲 · 视野缩窄 · 视网膜色素沉着', familyHistory:'外祖父有视力减退病史，疑似遗传性视网膜病变。' },
  'P-2024-0167': { dob:'1996-12-05', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'反复骨折 · 蓝巩膜 · 听力下降', familyHistory:'母亲有轻度骨质疏松，具体诊断不详。' },
  'P-2024-0144': { dob:'1981-06-18', ethnicity:'汉族', consanguinity:'否', coreSymptoms:'进行性痉挛步态 · 下肢僵硬', familyHistory:'父亲有步态异常史，未确诊。' },
}

const STATUS_META = {
  diagnosed: { kind:'ok',      label:'诊断完成' },
  running:   { kind:'running', label:'诊断中' },
  review:    { kind:'warn',    label:'待查看' },
  failed:    { kind:'err',     label:'诊断失败' },
}

const PAGE_SIZE = 8

export default function PageListV2({ route, setRoute, onEditingChange }) {
  const [q, setQ]               = useState('')
  const [selectedId, setSelectedId] = useState(route?.selectedId || null)
  const [hideNames, setHideNames]   = useState(() => {
    try { return localStorage.getItem('dr-hide-names') === 'true' } catch { return false }
  })
  const [isEditing,  setIsEditing]  = useState(false)
  const [pendingId,  setPendingId]  = useState(null)
  const [page,       setPage]       = useState(1)

  useEffect(() => {
    try { localStorage.setItem('dr-hide-names', hideNames) } catch {}
  }, [hideNames])

  const handleEditingChange = (v) => {
    setIsEditing(v)
    onEditingChange?.(v)
  }

  const handleSelectPatient = (id) => {
    if (isEditing && id !== selectedId) { setPendingId(id); return }
    setSelectedId(id)
  }

  const filtered = useMemo(() => {
    if (!q) return PATIENTS
    const qq = q.toLowerCase()
    return PATIENTS.filter(p =>
      p.name.includes(q) ||
      p.id.toLowerCase().includes(qq) ||
      (p.summary && p.summary.toLowerCase().includes(qq))
    )
  }, [q])

  useEffect(() => { setPage(1) }, [filtered])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  /* Merge supplemental data for selected patient */
  const patient = useMemo(() => {
    if (!selectedId) return null
    const base = PATIENTS.find(p => p.id === selectedId)
    if (!base) return null
    if (base.id === HERO_PATIENT.id) return { ...base, ...HERO_PATIENT }
    const extra = PATIENT_EXTRA[base.id] || {}
    return { ...base, ...extra }
  }, [selectedId])

  return (
    <div className="pv2-shell">

      {pendingId && (
        <UnsavedChangesDialog
          onDiscard={() => { setSelectedId(pendingId); setPendingId(null) }}
          onCancel={() => setPendingId(null)}
        />
      )}

      {/* ── LEFT SIDEBAR ── */}
      <aside className="pv2-side">
        <div className="pv2-side__head">
          <div className="pv2-side__title-row">
            <span className="pv2-side__title">患者列表</span>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <span className="pv2-side__count">{filtered.length}</span>
              <button
                onClick={() => setHideNames(h => !h)}
                title={hideNames ? '显示姓名' : '隐藏姓名'}
                style={{
                  display:'inline-flex',alignItems:'center',justifyContent:'center',
                  width:22,height:22,borderRadius:'var(--r-2)',border:'1px solid var(--border)',
                  background: hideNames ? 'var(--n-100)' : 'transparent',
                  color: hideNames ? 'var(--text-1)' : 'var(--text-3)',
                  cursor:'pointer',flexShrink:0,
                }}
              >
                {hideNames ? <IconEyeOff/> : <IconEye/>}
              </button>
            </div>
          </div>
          <div className="input-wrap">
            <span className="input-wrap__icon"><IconSearch /></span>
            <input
              className="input"
              placeholder="搜索姓名、ID、症状..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="pv2-side__list">
          {paged.map(p => {
            const sm = STATUS_META[p.status] || { kind:'queue', label:'—' }
            const isActive = selectedId === p.id
            return (
              <div
                key={p.id}
                className={'pv2-patient-row' + (isActive ? ' is-active' : '')}
                onClick={() => handleSelectPatient(p.id)}
              >
                <div className="pv2-patient-row__avatar">{hideNames ? '●' : p.name.slice(-1)}</div>
                <div className="pv2-patient-row__info">
                  <div className="pv2-patient-row__name-line">
                    <span className="pv2-patient-row__name">{hideNames ? '●●●' : p.name}</span>
                    <span className="pv2-patient-row__demog">{p.gender} · {p.age}岁</span>
                  </div>
                  <div className="pv2-patient-row__id mono">{p.id}</div>
                  <div className="pv2-patient-row__dates">
                    末次诊断 {p.lastAt}
                  </div>
                </div>
                <div className="pv2-patient-row__status">
                  {p.status === 'running'
                    ? <span className="running-pill"><span className="spinner" />诊断中</span>
                    : <StatusDot kind={sm.kind}>{sm.label}</StatusDot>
                  }
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="pv2-side__no-result">暂无匹配患者</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pv2-side__pagination">
            <button
              className="pv2-page-btn"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              <IconChevron style={{transform:'rotate(180deg)'}}/>
            </button>
            <span className="pv2-page-info">
              {page} / {totalPages}
            </span>
            <button
              className="pv2-page-btn"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              <IconChevron/>
            </button>
          </div>
        )}
      </aside>

      {/* ── RIGHT MAIN ── */}
      <main className="pv2-main">
        {!patient
          ? <EmptyState setRoute={setRoute} />
          : <PatientPanel patient={patient} setRoute={setRoute} onEditingChange={handleEditingChange} />
        }
      </main>

    </div>
  )
}

/* ── Empty state ── */
function EmptyState({ setRoute }) {
  return (
    <div className="pv2-empty">
      <div className="pv2-empty__icon">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke="var(--border-strong)" strokeWidth="1.5" />
          <circle cx="26" cy="21" r="8" stroke="var(--n-300)" strokeWidth="1.5" />
          <path d="M10 44c2-9 8.5-14 16-14s14 5 16 14" stroke="var(--n-300)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="pv2-empty__title">从左侧选择患者</div>
      <div className="pv2-empty__desc">点击左侧列表中的患者，右侧将展示其档案信息与诊断任务记录。</div>
      <Btn variant="secondary" size="sm" onClick={() => setRoute({ view:'new' })}>
        <IconPlus />新建诊断
      </Btn>
    </div>
  )
}

/* ── Patient panel ── */
function PatientPanel({ patient, setRoute, onEditingChange }) {
  const tasks = TASK_MAP[patient.id] || []
  const sm    = STATUS_META[patient.status] || { kind:'queue', label:'—' }

  /* ── Edit state ── */
  const [editing,     setEditing]     = useState(false)
  const [draft,       setDraft]       = useState(null)
  const [saved,       setSaved]       = useState(null)   // persisted local overrides
  const [addingHpo,   setAddingHpo]   = useState(false)
  const [newHpoId,    setNewHpoId]    = useState('')
  const [newHpoLabel, setNewHpoLabel] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingTaskNav, setPendingTaskNav] = useState(null)

  /* reset on patient switch */
  useEffect(() => {
    setSaved(null); setEditing(false); setDraft(null)
    setAddingHpo(false); setShowConfirm(false)
    onEditingChange?.(false)
  }, [patient.id])

  /* block browser tab close while editing */
  useEffect(() => {
    if (!editing) return
    const handler = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [editing])

  const display = saved ? { ...patient, ...saved } : patient

  const startEdit = () => {
    setDraft({
      name:          display.name          || '',
      gender:        display.gender        || '男',
      dob:           display.dob           || '',
      ethnicity:     display.ethnicity     || '',
      consanguinity: display.consanguinity || '否',
      coreSymptoms:  display.coreSymptoms  || display.summary || '',
      familyHistory: display.familyHistory || '',
      hpoTerms:      (display.hpoTerms || []).map(t => ({ ...t })),
    })
    setEditing(true)
    setAddingHpo(false)
    onEditingChange?.(true)
  }

  const cancelEdit = () => { setEditing(false); setDraft(null); setAddingHpo(false); onEditingChange?.(false) }

  /* clicking 保存更改 opens the confirm dialog */
  const saveEdit = () => setShowConfirm(true)

  /* actually commit after dialog choice */
  const commitSave = (andThen) => {
    setSaved({ ...display, ...draft })
    setEditing(false); setDraft(null); setAddingHpo(false); setShowConfirm(false)
    onEditingChange?.(false)
    if (andThen) andThen()
  }

  const setField  = (k, v) => setDraft(d => ({ ...d, [k]: v }))
  const removeHpo = (id)   => setDraft(d => ({ ...d, hpoTerms: d.hpoTerms.filter(t => t.id !== id) }))

  const confirmAddHpo = () => {
    const id = newHpoId.trim(); const label = newHpoLabel.trim()
    if (!id || !label) return
    setDraft(d => ({ ...d, hpoTerms: [...d.hpoTerms, { id, label }] }))
    setNewHpoId(''); setNewHpoLabel(''); setAddingHpo(false)
  }

  const goDetail = (tab = 'hpo', sub = 'done') => {
    if (editing) { setPendingTaskNav({ tab, sub }); return }
    setRoute({ view: 'patient', id: patient.id, tab, sub })
  }

  return (
    <div className="pv2-profile">

      {pendingTaskNav && (
        <UnsavedChangesDialog
          onDiscard={() => {
            cancelEdit()
            setRoute({ view: 'patient', id: patient.id, ...pendingTaskNav })
            setPendingTaskNav(null)
          }}
          onCancel={() => setPendingTaskNav(null)}
        />
      )}

      {showConfirm && (
        <SaveConfirmDialog
          onClose={() => setShowConfirm(false)}
          onSaveOnly={() => commitSave()}
          onVCF={() => commitSave(() => setRoute({ view:'new', patientId: patient.id, tab: 'vcf' }))}
          onHPO={() => commitSave(() => setRoute({ view:'new', patientId: patient.id }))}
        />
      )}

      <div className="pv2-detail-body">

        {/* ══ Left 2/3 — archive + history panels ══ */}
        <div className="pv2-detail-left">

          {/* ── Archive panel ── */}
          <div className={`panel${editing ? ' panel--editing' : ''}`} style={{flex:1,minHeight:0,display:'flex',flexDirection:'column'}}>
            <div className="panel__head">
              {/* Patient identity */}
              <div style={{display:'flex',alignItems:'center',gap:12,flex:1,minWidth:0}}>
                <div className="pv2-arc__avatar">{display.name.slice(-1)}</div>
                <div style={{display:'flex',flexDirection:'column',gap:3,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'baseline',gap:8,flexWrap:'wrap'}}>
                    <span style={{fontSize:'var(--fz-15)',fontWeight:700,letterSpacing:'-0.01em',color:'var(--text-1)'}}>{display.name}</span>
                    <span style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>{display.gender} · {display.age}岁</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontSize:'var(--fz-11)',color:'var(--text-4)',fontFamily:'var(--font-mono)'}}>{display.id}</span>
                    <StatusDot kind={sm.kind}>{sm.label}</StatusDot>
                    {editing && <span className="pv2-edit-badge">编辑中</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2" style={{flexShrink:0}}>
                {editing ? (
                  <>
                    <Btn variant="secondary" size="sm" onClick={cancelEdit}>取消</Btn>
                    <Btn variant="primary" size="sm" onClick={saveEdit}><IconCheck/>保存</Btn>
                  </>
                ) : (
                  <Btn variant="ghost" size="sm" onClick={startEdit}><IconPencil/>编辑</Btn>
                )}
              </div>
            </div>

            {/* Archive body: 180px KV | 1fr HPO (view) · 1fr form | 1fr HPO (edit) */}
            <div className="panel__body" style={{padding:0,flex:1,overflowY:'auto',minHeight:0}}>
              {editing ? (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
                  {/* Basic info form */}
                  <div style={{padding:'14px 16px'}}>
                    <div className="pv2-section-label" style={{marginBottom:12}}>基本信息</div>
                    <div className="pv2-edit-fields">
                      <label className="field">
                        <span className="field__label">姓名</span>
                        <input className="input" value={draft.name}
                          onChange={e => setField('name', e.target.value)} />
                      </label>
                      <div className="pv2-edit-row2">
                        <label className="field">
                          <span className="field__label">性别</span>
                          <select className="select" value={draft.gender}
                            onChange={e => setField('gender', e.target.value)}>
                            <option>男</option><option>女</option>
                          </select>
                        </label>
                        <label className="field">
                          <span className="field__label">出生日期</span>
                          <input className="input" type="date" value={draft.dob}
                            onChange={e => setField('dob', e.target.value)} />
                        </label>
                      </div>
                      <div className="pv2-edit-row2">
                        <label className="field">
                          <span className="field__label">民族</span>
                          <input className="input" value={draft.ethnicity}
                            onChange={e => setField('ethnicity', e.target.value)} />
                        </label>
                        <label className="field">
                          <span className="field__label">近亲婚配</span>
                          <select className="select" value={draft.consanguinity}
                            onChange={e => setField('consanguinity', e.target.value)}>
                            <option>否</option><option>是</option><option>不详</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* HPO editor */}
                  <div style={{padding:'14px 16px',borderLeft:'1px solid var(--border)'}}>
                    <div className="pv2-section-label" style={{marginBottom:12}}>HPO 表型标签</div>
                    <div className="pv2-hpo-cloud">
                      {draft.hpoTerms.map(t => (
                        <span key={t.id} className={`hpo${t.neg ? ' hpo--neg' : ''}`}>
                          <span className="hpo__id">{t.id}</span>
                          <span className="hpo__label">{t.label}</span>
                          <span className="hpo__x" onClick={() => removeHpo(t.id)}><IconX/></span>
                        </span>
                      ))}
                      {!addingHpo && (
                        <button className="pv2-hpo-add-btn" onClick={() => setAddingHpo(true)}>
                          <IconPlus/>添加表型
                        </button>
                      )}
                    </div>
                    {addingHpo && (
                      <div className="pv2-hpo-add-form" style={{marginTop:10}}>
                        <input className="input pv2-hpo-add-id" placeholder="HP:0000000"
                          value={newHpoId} onChange={e => setNewHpoId(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && confirmAddHpo()} />
                        <input className="input pv2-hpo-add-label" placeholder="表型描述"
                          value={newHpoLabel} onChange={e => setNewHpoLabel(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && confirmAddHpo()} />
                        <Btn variant="primary" size="sm" onClick={confirmAddHpo}>确认</Btn>
                        <Btn variant="secondary" size="sm" onClick={() => { setAddingHpo(false); setNewHpoId(''); setNewHpoLabel('') }}>取消</Btn>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{display:'grid',gridTemplateColumns:'1fr 2fr'}}>
                  {/* KV column */}
                  <div style={{padding:'14px 16px',borderRight:'1px solid var(--border)'}}>
                    <div className="pv2-section-label" style={{marginBottom:10}}>基本信息</div>
                    <dl className="pv2-kv">
                      <dt>性别</dt>    <dd>{display.gender || '—'}</dd>
                      <dt>出生日期</dt><dd className="mono">{display.dob || '—'}</dd>
                      <dt>民族</dt>    <dd>{display.ethnicity || '—'}</dd>
                      <dt>近亲婚配</dt><dd>{display.consanguinity || '—'}</dd>
                      <dt>注册时间</dt><dd className="mono">{display.registeredAt || display.createdAt || '—'}</dd>
                      <dt>最后就诊</dt><dd className="mono">{display.lastVisitAt || display.lastAt || '—'}</dd>
                    </dl>
                  </div>
                  {/* HPO column */}
                  <div style={{padding:'14px 16px',overflowY:'auto'}}>
                    <div className="pv2-section-label" style={{marginBottom:10}}>HPO 表型标签</div>
                    {display.hpoTerms?.length > 0 ? (
                      <div className="pv2-hpo-cloud">
                        {display.hpoTerms.map(t => (
                          <Hpo key={t.id} id={t.id} label={t.label} removable={false} />
                        ))}
                      </div>
                    ) : (
                      <span style={{fontSize:'var(--fz-12)',color:'var(--text-4)'}}>暂无 HPO 表型记录</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── History panel ── */}
          <div className={`panel${editing ? ' panel--editing' : ''}`} style={{flex:2,minHeight:0,display:'flex',flexDirection:'column'}}>
            <div className="panel__head">
              <span className="panel__title">病史摘要</span>
            </div>
            <div className="panel__body" style={{flex:1,overflowY:'auto',minHeight:0}}>
              {editing ? (
                <div className="pv2-edit-fields">
                  <label className="field">
                    <span className="field__label">核心症状</span>
                    <input className="input" placeholder="如：构音障碍 · 震颤 · 肝酶升高"
                      value={draft.coreSymptoms}
                      onChange={e => setField('coreSymptoms', e.target.value)} />
                  </label>
                  <label className="field">
                    <span className="field__label">家族史</span>
                    <textarea className="textarea" rows={8} style={{resize:'vertical'}}
                      placeholder="描述家族遗传病史、近亲婚配情况等..."
                      value={draft.familyHistory}
                      onChange={e => setField('familyHistory', e.target.value)} />
                  </label>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {(display.coreSymptoms || display.summary) && (
                    <div className="pv2-symptoms-chip">{display.coreSymptoms || display.summary}</div>
                  )}
                  {display.presentText && (
                    <div className="pv2-hist-text">{display.presentText}</div>
                  )}
                  {display.familyHistory && (
                    <div className="pv2-family-history">
                      <span className="pv2-family-history__label">家族史</span>
                      {display.familyHistory}
                    </div>
                  )}
                  {!display.coreSymptoms && !display.summary && !display.presentText && !display.familyHistory && (
                    <span style={{fontSize:'var(--fz-13)',color:'var(--text-4)'}}>暂无病史记录</span>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ══ Right 1/3 — task panel fills full height ══ */}
        <div className="pv2-detail-right">
          <div className="panel panel--grow">
            <div className="panel__head">
              <span className="panel__title">
                诊断任务
                {tasks.length > 0 && <span className="pv2-count-badge">{tasks.length}</span>}
              </span>
              <Btn variant="primary" size="sm" onClick={() => setRoute({ view:'new', patientId: patient.id })}>
                <IconPlus/>新建
              </Btn>
            </div>
            <div className="panel__body--flush">
              {tasks.length === 0 ? (
                <div className="pv2-task-col__empty">
                  暂无诊断记录<br/>
                  <span style={{fontSize:'var(--fz-12)',color:'var(--text-4)'}}>点击「新建」发起第一次诊断</span>
                </div>
              ) : tasks.map(task => {
                const tab = task.type === 'VCF' ? 'vcf' : 'hpo'
                const sub = task.status === 'running' ? 'running' : 'done'
                return (
                  <div
                    key={task.id}
                    className={`pv2-task-item pv2-task-item--${task.status}`}
                    onClick={() => goDetail(tab, sub)}
                  >
                    <div className="pv2-task-item__top">
                      <span className={`pv2-type-tag pv2-type-tag--${task.type.toLowerCase()}`}>
                        {task.type}
                      </span>
                      <span className="pv2-task-item__time">{task.time}</span>
                      {task.status === 'running'
                        ? <span className="running-pill" style={{flexShrink:0}}><span className="spinner"/>进行中</span>
                        : task.status === 'done'
                          ? <StatusDot kind="ok">完成</StatusDot>
                          : <StatusDot kind="err">失败</StatusDot>
                      }
                    </div>
                    <div className="pv2-task-item__result">{task.result}</div>
                    <div className="pv2-task-item__arrow"><IconChevron/></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   Save Confirm Dialog
   ══════════════════════════════════════════════ */
/* ══════════════════════════════════════════════
   Unsaved Changes Dialog
   ══════════════════════════════════════════════ */
function UnsavedChangesDialog({ onDiscard, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="dialog" style={{maxWidth:420}} onClick={e => e.stopPropagation()}>
        <div className="dialog__head">
          <div>
            <div className="dialog__title">当前编辑未保存</div>
            <div className="dialog__desc">离开后，当前编辑的内容将丢失。</div>
          </div>
        </div>
        <div className="dialog__foot">
          <Btn variant="ghost" size="sm" onClick={onCancel}>返回编辑</Btn>
          <Btn variant="danger" size="sm" onClick={onDiscard}>不保存，直接离开</Btn>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   Save Confirm Dialog
   ══════════════════════════════════════════════ */
function SaveConfirmDialog({ onClose, onSaveOnly, onVCF, onHPO }) {
  const [choice, setChoice] = useState('hpo')

  const handleConfirm = () => {
    if (choice === 'save') onSaveOnly()
    else if (choice === 'vcf') onVCF()
    else onHPO()
  }

  const options = [
    {
      key: 'save',
      type: 'save',
      label: '仅保存',
      hint: '保存档案，暂不发起分析',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 2h7l3 3v9H3V2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M5 2v4h5V2M5 9h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      key: 'hpo',
      type: 'hpo',
      label: '发起 HPO 诊断',
      hint: '基于表型标签进行 AI 辅助疾病推理',
      recommended: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M8 2v2M8 12v2M14 8h-2M4 8H2M12.2 3.8l-1.4 1.4M5.2 10.8l-1.4 1.4M12.2 12.2l-1.4-1.4M5.2 5.2 3.8 3.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      key: 'vcf',
      type: 'vcf',
      label: '发起 VCF 分析',
      hint: '上传基因组变异文件进行致病变异筛查',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 2c0 3 8 5 8 8s-8 2-8 5M12 2c0 3-8 5-8 8s8 2 8 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M5.5 5h5M5.5 8h5M5.5 11h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".5"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="overlay" onClick={onClose}>
      <div className="pv2-confirm-dialog" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="pv2-confirm-dialog__head">
          <div className="pv2-confirm-dialog__icon">
            <IconCheck />
          </div>
          <div className="pv2-confirm-dialog__copy">
            <div className="pv2-confirm-dialog__title">档案已更新，是否同时发起诊断？</div>
            <div className="pv2-confirm-dialog__desc">
              患者基本信息与 HPO 表型标签已保存。您也可以立即基于更新后的档案发起一次新的诊断分析。
            </div>
          </div>
        </div>

        {/* Option cards */}
        <div className="pv2-confirm-dialog__options">
          {options.map(opt => (
            <button
              key={opt.key}
              className={[
                'pv2-diag-option',
                `pv2-diag-option--${opt.type}`,
                choice === opt.key ? 'is-selected' : '',
              ].join(' ')}
              onClick={() => setChoice(opt.key)}
            >
              <div className="pv2-diag-option__icon">{opt.icon}</div>
              <div className="pv2-diag-option__body">
                <div className="pv2-diag-option__label">{opt.label}</div>
                <div className="pv2-diag-option__hint">{opt.hint}</div>
              </div>
              {opt.recommended && <div className="pv2-diag-option__recommended">推荐</div>}
              {choice === opt.key && (
                <div className="pv2-diag-option__check"><IconCheck /></div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="pv2-confirm-dialog__foot">
          <Btn variant="ghost" size="sm" onClick={onClose}>返回编辑</Btn>
          <Btn variant="primary" onClick={handleConfirm}>确定</Btn>
        </div>

      </div>
    </div>
  )
}
