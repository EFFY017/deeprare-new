import { useState, useMemo, useRef, useEffect } from 'react'
import { Btn, Badge, Field } from '../components/primitives'
import { IconSearch, IconPlus, IconUser, IconDna, IconInfo, IconUpload, IconCheck, IconX } from '../components/icons'
import { PATIENTS, HERO_PATIENT } from '../data/mockData'

/* ── helpers ── */
const fmtSize = (bytes) => {
  if (bytes >= 1e9) return (bytes / 1e9).toFixed(1) + ' GB'
  if (bytes >= 1e6) return (bytes / 1e6).toFixed(1) + ' MB'
  return (bytes / 1e3).toFixed(0) + ' KB'
}

function buildForm(p) {
  if (!p) return { name: '', gender: '', dob: '', ethnicity: '', family: '', consang: '否' }
  if (p.id === HERO_PATIENT.id) return {
    name: HERO_PATIENT.name, gender: HERO_PATIENT.gender,
    dob: HERO_PATIENT.dob, ethnicity: HERO_PATIENT.ethnicity,
    family: HERO_PATIENT.familyHistory, consang: HERO_PATIENT.consanguinity,
  }
  return { name: p.name, gender: p.gender, dob: p.dob || '', ethnicity: p.ethnicity || '', family: '', consang: '否' }
}

/* ── VCF upload hook ── */
function useVcfUpload() {
  const [vcf, setVcf] = useState(null) // null | { name, size, status, progress, error }
  const timerRef = useRef(null)

  const startUpload = (file) => {
    if (!file) return
    const valid = file.name.endsWith('.vcf') || file.name.endsWith('.vcf.gz')
    if (!valid) {
      setVcf({ name: file.name, size: file.size, status: 'error', progress: 0, error: '格式不支持，仅支持 .vcf / .vcf.gz' })
      return
    }
    if (file.size > 2 * 1024 * 1024 * 1024) {
      setVcf({ name: file.name, size: file.size, status: 'error', progress: 0, error: '文件超过 2 GB 限制' })
      return
    }
    setVcf({ name: file.name, size: file.size, status: 'uploading', progress: 0, error: null })
    let p = 0
    timerRef.current = setInterval(() => {
      p += Math.random() * 18 + 6
      if (p >= 100) {
        clearInterval(timerRef.current)
        setVcf(prev => ({ ...prev, status: 'done', progress: 100 }))
      } else {
        setVcf(prev => ({ ...prev, progress: p }))
      }
    }, 250)
  }

  const reset = () => {
    clearInterval(timerRef.current)
    setVcf(null)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  return { vcf, startUpload, reset }
}

export default function PageNewDiag({ route, setRoute }) {
  // Honour tab=vcf when coming from SaveConfirmDialog VCF option
  const [tab, setTab] = useState(route?.tab === 'vcf' ? 'vcf' : 'hpo')

  const [selected, setSelected] = useState(() => {
    const id = route?.patientId
    if (!id) return null
    return id === HERO_PATIENT.id ? HERO_PATIENT : (PATIENTS.find(x => x.id === id) || null)
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [text, setText] = useState('')
  const [form, setForm] = useState(() => buildForm(
    route?.patientId
      ? (route.patientId === HERO_PATIENT.id ? HERO_PATIENT : PATIENTS.find(x => x.id === route.patientId))
      : null
  ))
  const [errors, setErrors] = useState({})
  const { vcf, startUpload, reset: resetVcf } = useVcfUpload()
  const fileInputRef = useRef(null)

  const matches = useMemo(() => {
    if (!query) return PATIENTS.slice(0, 5)
    const q = query.toLowerCase()
    return PATIENTS.filter(p =>
      p.name.includes(query) || p.id.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
    ).slice(0, 6)
  }, [query])

  const onPickPatient = (p) => {
    setSelected(p)
    setSearchOpen(false)
    setQuery('')
    setForm(buildForm(p))
    setErrors({})
  }

  const clearSelected = () => {
    setSelected(null)
    setForm({ name: '', gender: '', dob: '', ethnicity: '', family: '', consang: '否' })
    setErrors({})
  }

  const validate = () => {
    const e = {}
    if (!isReadonly && !form.name.trim()) e.name = '请填写姓名'
    if (!isReadonly && !form.gender)      e.gender = '请选择性别'
    if (!isReadonly && !text.trim())      e.text = '请填写病史文本'
    if (tab === 'vcf' && (!vcf || vcf.status !== 'done')) e.vcf = '请先上传 VCF 文件'
    return e
  }

  const submit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setRoute({ view: 'patient', id: HERO_PATIENT.id, tab, sub: 'running' })
  }

  const isReadonly = !!selected

  /* drag-and-drop */
  const onDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) startUpload(file)
  }

  return (
    <>
      <div className="page-head page-head--compact">
        <div>
          <h1>新建诊断</h1>
          <div className="desc">选择已有患者或创建新患者，填写诊断输入后即可发起 AI 推理。</div>
        </div>
      </div>

      <div className="page-body">
        <div className="newdiag">
          <div className="newdiag__card">

            {/* ── Tab ── */}
            <div className="newdiag__tabs">
              <button className={'newdiag__tab' + (tab === 'hpo' ? ' is-active' : '')} onClick={() => setTab('hpo')}>
                <IconUser/> HPO 表型诊断 <span className="muted">基于症状文本</span>
              </button>
              <button className={'newdiag__tab' + (tab === 'vcf' ? ' is-active' : '')} onClick={() => setTab('vcf')}>
                <IconDna/> VCF 基因诊断 <span className="muted">.vcf / .vcf.gz</span>
              </button>
            </div>

            {/* ── 步骤 1：患者选择 ── */}
            <div className="newdiag__section">
              <div className="newdiag__section-head">
                <div className="newdiag__section-title"><span className="n">1</span>患者选择</div>
                <div className="newdiag__section-hint">不选择患者直接提交，将自动创建新患者档案</div>
              </div>

              {!selected && (
                <div className="p-search" onBlur={() => setTimeout(() => setSearchOpen(false), 150)}>
                  <div className="input-wrap">
                    <span className="input-wrap__icon"><IconSearch/></span>
                    <input className="input" placeholder="按姓名或患者 ID 搜索已有患者..."
                      value={query} onFocus={() => setSearchOpen(true)}
                      onChange={e => { setQuery(e.target.value); setSearchOpen(true) }}/>
                  </div>
                  {searchOpen && (
                    <div className="p-search__drop">
                      {matches.map(p => (
                        <div key={p.id} className="p-search__item" onMouseDown={() => onPickPatient(p)}>
                          <div className="p-search__item-avatar">{p.name.slice(-1)}</div>
                          <div>
                            <div style={{fontWeight:600}}>{p.name}
                              <span style={{color:'var(--text-4)',fontWeight:400,marginLeft:4,fontSize:'var(--fz-12)'}}>{p.gender}</span>
                            </div>
                            <div style={{fontSize:'var(--fz-11)',color:'var(--text-4)'}}>{p.summary}</div>
                          </div>
                          <span className="p-search__item-meta">{p.id}</span>
                        </div>
                      ))}
                      <div className="p-search__create" onMouseDown={() => setSearchOpen(false)}>
                        <IconPlus/> 未找到？提交时自动创建新患者
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selected && (
                <div className="selected-patient">
                  <div className="selected-patient__avatar">{selected.name.slice(-1)}</div>
                  <div>
                    <div className="selected-patient__name">{selected.name}</div>
                    <div className="selected-patient__meta">{selected.id} · {selected.gender} · HPO {selected.hpoCount} · VCF {selected.vcfCount}</div>
                  </div>
                  <div className="selected-patient__right">
                    <Badge tone="brand" dot>已选择 · 档案预填</Badge>
                    <Btn variant="ghost" size="sm" onClick={clearSelected}>切换</Btn>
                  </div>
                </div>
              )}
            </div>

            {/* ── 步骤 2：患者信息 & 病史 ── */}
            <div className={'newdiag__section' + (isReadonly ? ' readonly' : '')}>
              <div className="newdiag__section-head">
                <div className="newdiag__section-title">
                  <span className="n">2</span>
                  {tab === 'hpo' ? '患者信息 & 病史' : '患者信息 & 病史 & VCF 文件'}
                </div>
                {isReadonly && <div className="newdiag__section-hint">基本信息已预填，仅下方病史可追加</div>}
              </div>

              <div style={{display:'flex', gap:24, alignItems:'flex-start'}}>

                {/* ── 左：基本信息 ── */}
                <div style={{width:240, flexShrink:0, display:'flex', flexDirection:'column', gap:12}}>
                  <Field label="姓名" required error={errors.name}>
                    <input className={'input' + (errors.name ? ' input--error' : '')}
                      value={form.name} readOnly={isReadonly}
                      onChange={e => { setForm({...form, name: e.target.value}); setErrors(v => ({...v, name: ''})) }}
                      placeholder="如: 张三"/>
                  </Field>
                  <Field label="性别" required error={errors.gender}>
                    <select className={'select' + (errors.gender ? ' input--error' : '')}
                      value={form.gender} disabled={isReadonly}
                      onChange={e => { setForm({...form, gender: e.target.value}); setErrors(v => ({...v, gender: ''})) }}>
                      <option value="">请选择</option>
                      <option>男</option><option>女</option>
                    </select>
                  </Field>
                  <Field label="出生日期">
                    <input className="input" value={form.dob} readOnly={isReadonly}
                      onChange={e => setForm({...form, dob: e.target.value})} placeholder="YYYY-MM-DD"/>
                  </Field>
                  <Field label="民族 / 族裔">
                    <input className="input" value={form.ethnicity} readOnly={isReadonly}
                      onChange={e => setForm({...form, ethnicity: e.target.value})} placeholder="如: 汉族"/>
                  </Field>
                  <Field label="近亲婚配史">
                    <select className="select" value={form.consang} disabled={isReadonly}
                      onChange={e => setForm({...form, consang: e.target.value})}>
                      <option>否</option><option>是</option><option>不详</option>
                    </select>
                  </Field>
                </div>

                {/* ── 右：病史 & VCF ── */}
                <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:16}}>
                  <div className="field">
                    <label className="field__label">家族史</label>
                    <textarea className="textarea" rows={3} value={form.family} readOnly={isReadonly}
                      onChange={e => setForm({...form, family: e.target.value})}
                      placeholder="有无类似疾病患者、近亲婚配、新生儿死亡、晚发肝病等"
                      style={{resize:'vertical'}}/>
                  </div>
                  <div className="field">
                    <label className={'field__label' + (errors.text ? ' field__label--error' : '')}>
                      病史文本 {!isReadonly && <span className="req">*</span>}
                      {isReadonly && <span style={{marginLeft:8,fontWeight:400,color:'var(--text-4)',fontSize:'var(--fz-11)'}}>历史病史已保留，可在下方追加新内容</span>}
                    </label>
                    {isReadonly && (
                      <div style={{padding:'10px 12px',background:'var(--n-50)',border:'1px solid var(--border)',borderRadius:'var(--r-3)',marginBottom:8,fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.55,whiteSpace:'pre-line',maxHeight:120,overflow:'auto'}}>
                        {selected.id === HERO_PATIENT.id ? HERO_PATIENT.presentText.slice(0, 300) + '...' : '(历史病史摘要) ' + selected.summary}
                      </div>
                    )}
                    <textarea className={'textarea' + (errors.text ? ' input--error' : '')}
                      rows={tab === 'vcf' ? 8 : 13}
                      style={{resize:'vertical'}}
                      placeholder={isReadonly ? '追加此次就诊新症状、检查结果（选填）...' : '支持粘贴完整病历。可包含主诉、现病史、既往史、体格检查、辅助检查...'}
                      value={text}
                      onChange={e => { setText(e.target.value); setErrors(v => ({...v, text: ''})) }}/>
                    {errors.text && <div className="field__error">{errors.text}</div>}
                  </div>

                  {tab === 'vcf' && (
                    <div className="field">
                      <label className={'field__label' + (errors.vcf ? ' field__label--error' : '')}>
                        VCF 文件 <span className="req">*</span>
                      </label>
                      <input ref={fileInputRef} type="file" accept=".vcf,.vcf.gz" style={{display:'none'}}
                        onChange={e => { if (e.target.files[0]) startUpload(e.target.files[0]) }}/>

                      {!vcf && (
                        <div className={'upload' + (errors.vcf ? ' upload--field-error' : '')}
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={e => e.preventDefault()}
                          onDrop={onDrop}>
                          <div className="upload__icon"><IconUpload/></div>
                          <div className="upload__title">拖拽或点击上传 VCF 文件</div>
                          <div className="upload__hint">支持 .vcf / .vcf.gz · 单文件 ≤ 2 GB · 参考基因组 GRCh38 / GRCh37</div>
                        </div>
                      )}

                      {vcf?.status === 'uploading' && (
                        <div className="upload upload--uploading">
                          <div className="upload__title" style={{marginBottom:4}}>{vcf.name}</div>
                          <div className="upload__hint">{fmtSize(vcf.size)} · 上传中 {Math.round(vcf.progress)}%</div>
                          <div className="upload__progress-bar">
                            <div className="upload__progress-fill" style={{width: vcf.progress + '%'}}/>
                          </div>
                        </div>
                      )}

                      {vcf?.status === 'done' && (
                        <div className="upload__file-card">
                          <span style={{color:'var(--ok-500)',flexShrink:0}}><IconCheck/></span>
                          <div style={{flex:1,minWidth:0}}>
                            <div className="upload__file-name">{vcf.name}</div>
                            <div className="upload__file-size">{fmtSize(vcf.size)}</div>
                          </div>
                          <Btn variant="ghost" size="sm" onClick={() => { resetVcf(); fileInputRef.current?.click() }}>重新上传</Btn>
                        </div>
                      )}

                      {vcf?.status === 'error' && (
                        <div className="upload upload--error">
                          <div className="upload__icon" style={{color:'var(--err-500)'}}><IconX/></div>
                          <div className="upload__title" style={{color:'var(--err-700)'}}>{vcf.name}</div>
                          <div className="upload__error-msg">{vcf.error}</div>
                          <Btn variant="ghost" size="sm" style={{marginTop:8}} onClick={() => { resetVcf(); fileInputRef.current?.click() }}>重试</Btn>
                        </div>
                      )}

                      {errors.vcf && <div className="field__error" style={{marginTop:6}}>{errors.vcf}</div>}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* ── 步骤 3：提交 ── */}
            <div className="newdiag__section" style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'var(--bg-sunken)'}}>
              <div style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>
                <IconInfo/> 提交后 AI 推理将在 2–5 分钟内完成，可前往患者详情页查看进度。
              </div>
              <Btn variant="primary" onClick={submit}>
                发起 {tab === 'hpo' ? 'HPO 表型诊断' : 'VCF 基因诊断'}
              </Btn>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
