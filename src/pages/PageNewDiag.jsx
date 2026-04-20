import { useState, useMemo } from 'react'
import { Btn, Badge, Hpo, Field } from '../components/primitives'
import { IconSearch, IconPlus, IconUser, IconDna, IconInfo, IconUpload } from '../components/icons'
import { PATIENTS, HERO_PATIENT } from '../data/mockData'

export default function PageNewDiag({ setRoute }) {
  const [tab, setTab] = useState('hpo')
  const [selected, setSelected] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [text, setText] = useState('')
  const [form, setForm] = useState({ name: '', gender: '', age: '', dob: '', ethnicity: '', family: '', consang: '否' })

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
    if (p.id === HERO_PATIENT.id) {
      setForm({ name: HERO_PATIENT.name, gender: HERO_PATIENT.gender, age: String(HERO_PATIENT.age), dob: HERO_PATIENT.dob, ethnicity: HERO_PATIENT.ethnicity, family: HERO_PATIENT.familyHistory, consang: HERO_PATIENT.consanguinity })
    } else {
      setForm({ name: p.name, gender: p.gender, age: String(p.age), dob: '—', ethnicity: '—', family: '—', consang: '否' })
    }
  }
  const clearSelected = () => { setSelected(null); setForm({ name: '', gender: '', age: '', dob: '', ethnicity: '', family: '', consang: '否' }) }
  const submit = () => setRoute({ view: 'patient', id: HERO_PATIENT.id, tab, sub: tab === 'hpo' ? 'running' : 'done' })
  const isReadonly = !!selected

  return (
    <>
      <div className="page-head page-head--compact">
        <div>
          <h1>新建诊断</h1>
          <div className="desc">选择已有患者或创建新患者，填写诊断输入后即可发起 AI 推理。</div>
        </div>
        <div className="flex gap-2">
          <Btn variant="ghost" size="sm">保存草稿</Btn>
        </div>
      </div>

      <div className="page-body">
        <div className="newdiag">
          <div className="newdiag__card">

            <div className="newdiag__tabs">
              <button className={'newdiag__tab' + (tab === 'hpo' ? ' is-active' : '')} onClick={() => setTab('hpo')}>
                <IconUser/> HPO 表型诊断 <span className="muted">基于症状文本</span>
              </button>
              <button className={'newdiag__tab' + (tab === 'vcf' ? ' is-active' : '')} onClick={() => setTab('vcf')}>
                <IconDna/> VCF 基因诊断 <span className="muted">.vcf / .vcf.gz</span>
              </button>
            </div>

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
                            <div style={{fontWeight:600}}>{p.name} <span style={{color:'var(--text-4)',fontWeight:400,marginLeft:4,fontSize:'var(--fz-12)'}}>{p.gender} · {p.age}岁</span></div>
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
                    <div className="selected-patient__meta">{selected.id} · {selected.gender} · {selected.age}岁 · HPO {selected.hpoCount} · VCF {selected.vcfCount}</div>
                  </div>
                  <div className="selected-patient__right">
                    <Badge tone="brand" dot>已选择 · 档案预填</Badge>
                    <Btn variant="ghost" size="sm" onClick={clearSelected}>切换</Btn>
                  </div>
                </div>
              )}
            </div>

            <div className={'newdiag__section' + (isReadonly ? ' readonly' : '')}>
              <div className="newdiag__section-head">
                <div className="newdiag__section-title">
                  <span className="n">2</span>
                  {tab === 'hpo' ? '患者信息 & 病史' : '患者信息 & 病史 & VCF 文件'}
                </div>
                {isReadonly && <div className="newdiag__section-hint">基本信息已预填，仅下方病史可追加</div>}
              </div>

              <div className="form-grid">
                <Field label="姓名" required>
                  <input className="input" value={form.name} readOnly={isReadonly} onChange={e => setForm({...form, name: e.target.value})} placeholder="如: 张三"/>
                </Field>
                <Field label="性别" required>
                  <select className="select" value={form.gender} disabled={isReadonly} onChange={e => setForm({...form, gender: e.target.value})}>
                    <option value="">请选择</option>
                    <option>男</option><option>女</option>
                  </select>
                </Field>
                <Field label="年龄">
                  <input className="input" value={form.age} readOnly={isReadonly} onChange={e => setForm({...form, age: e.target.value})} placeholder="例如 14"/>
                </Field>
                <Field label="出生日期">
                  <input className="input" value={form.dob} readOnly={isReadonly} onChange={e => setForm({...form, dob: e.target.value})} placeholder="YYYY-MM-DD"/>
                </Field>
                <Field label="民族 / 族裔">
                  <input className="input" value={form.ethnicity} readOnly={isReadonly} onChange={e => setForm({...form, ethnicity: e.target.value})} placeholder="如: 汉族"/>
                </Field>
                <Field label="近亲婚配史">
                  <select className="select" value={form.consang} disabled={isReadonly} onChange={e => setForm({...form, consang: e.target.value})}>
                    <option>否</option><option>是</option><option>不详</option>
                  </select>
                </Field>
                <div className="field field--wide">
                  <label className="field__label">家族史</label>
                  <textarea className="textarea" rows="2" value={form.family} readOnly={isReadonly} onChange={e => setForm({...form, family: e.target.value})} placeholder="有无类似疾病患者、近亲婚配、新生儿死亡、晚发肝病等"/>
                </div>
                <div className="field field--wide">
                  <label className="field__label">
                    病史文本 <span className="req">*</span>
                    {isReadonly && <span style={{marginLeft:8,fontWeight:400,color:'var(--text-4)',fontSize:'var(--fz-11)'}}>历史病史已保留，可在下方追加新内容</span>}
                  </label>
                  {isReadonly && (
                    <div style={{padding:'10px 12px',background:'var(--n-50)',border:'1px solid var(--border)',borderRadius:'var(--r-3)',marginBottom:8,fontSize:'var(--fz-12)',color:'var(--text-2)',lineHeight:1.55,whiteSpace:'pre-line',maxHeight:160,overflow:'auto'}}>
                      {selected.id === HERO_PATIENT.id ? HERO_PATIENT.presentText.slice(0, 300) + '...' : '(历史病史摘要) ' + selected.summary}
                    </div>
                  )}
                  <textarea className="textarea" rows={isReadonly ? 4 : 8}
                    placeholder={isReadonly ? '追加此次就诊新症状、检查结果...' : '支持粘贴完整病历。可包含主诉、现病史、既往史、体格检查、辅助检查...'}
                    value={text} onChange={e => setText(e.target.value)}/>
                </div>
                {tab === 'vcf' && (
                  <div className="field field--wide">
                    <label className="field__label">VCF 文件 <span className="req">*</span></label>
                    <div className="upload">
                      <div className="upload__icon"><IconUpload/></div>
                      <div className="upload__title">拖拽或点击上传 VCF 文件</div>
                      <div className="upload__hint">支持 .vcf / .vcf.gz · 单文件 ≤ 2 GB · 参考基因组 GRCh38 / GRCh37</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="newdiag__section" style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'var(--bg-sunken)'}}>
              <div style={{fontSize:'var(--fz-12)',color:'var(--text-3)'}}>
                <IconInfo/> 提交后 AI 推理将在 2–5 分钟内完成，可前往患者详情页查看进度。
              </div>
              <div className="flex gap-2">
                <Btn variant="ghost">取消</Btn>
                <Btn variant="primary" onClick={submit}>
                  发起 {tab === 'hpo' ? 'HPO 表型诊断' : 'VCF 基因诊断'}
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
