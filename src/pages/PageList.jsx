import { useState, useMemo } from 'react'
import { Btn, Badge, StatusDot } from '../components/primitives'
import { IconSearch, IconFilter, IconPlus, IconChevron } from '../components/icons'
import { PATIENTS, HERO_PATIENT } from '../data/mockData'

export default function PageList({ setRoute }) {
  const [q, setQ] = useState('')
  const [sortKey, setSortKey] = useState('lastAt')
  const [sortDir, setSortDir] = useState('desc')
  const [statusFilter, setStatusFilter] = useState('all')

  const rows = useMemo(() => {
    let arr = PATIENTS.slice()
    if (q) {
      const qq = q.toLowerCase()
      arr = arr.filter(p => p.name.includes(q) || p.id.toLowerCase().includes(qq) || p.summary.toLowerCase().includes(qq))
    }
    if (statusFilter !== 'all') arr = arr.filter(p => p.status === statusFilter)
    arr.sort((a, b) => {
      const av = a[sortKey] || ''; const bv = b[sortKey] || ''
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return arr
  }, [q, sortKey, sortDir, statusFilter])

  const toggleSort = (k) => {
    if (sortKey === k) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(k); setSortDir('desc') }
  }
  const sortCls = (k) => 'is-sort' + (sortKey === k ? (sortDir === 'asc' ? ' is-asc' : ' is-desc') : '')

  const statusMap = {
    diagnosed: { tone: 'ok',   label: '已确诊' },
    running:   { tone: 'info', label: '诊断中' },
    review:    { tone: 'warn', label: '待复核' },
    failed:    { tone: 'err',  label: '失败' },
  }

  return (
    <>
      <div className="page-head page-head--compact">
        <div>
          <h1>患者列表</h1>
          <div className="desc">共 {PATIENTS.length} 名患者 · 我发起过诊断的所有患者档案</div>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary"><IconFilter/>导出 CSV</Btn>
          <Btn variant="primary" onClick={() => setRoute({ view: 'new' })}><IconPlus/>新建诊断</Btn>
        </div>
      </div>

      <div className="plist-toolbar">
        <div className="input-wrap">
          <span className="input-wrap__icon"><IconSearch/></span>
          <input className="input" placeholder="按姓名、ID、病史关键词搜索..." value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <div className="chip-group">
          {[['all','全部'],['diagnosed','已确诊'],['running','诊断中'],['review','待复核'],['failed','失败']].map(([k,l]) => (
            <button key={k} className={'chip' + (statusFilter === k ? ' is-active' : '')} onClick={() => setStatusFilter(k)}>{l}</button>
          ))}
        </div>
        <div style={{marginLeft:'auto',fontSize:'var(--fz-12)',color:'var(--text-3)'}}>
          显示 <b>{rows.length}</b> / {PATIENTS.length}
        </div>
      </div>

      <div className="plist-wrap">
        <div className="plist-frame">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{width:180}}>患者 ID</th>
                <th>姓名 / 年龄性别</th>
                <th>核心症状摘要</th>
                <th className="num" style={{width:80}}>HPO 次数</th>
                <th className="num" style={{width:80}}>VCF 次数</th>
                <th className={sortCls('lastAt')} style={{width:140}} onClick={() => toggleSort('lastAt')}>最后诊断</th>
                <th className={sortCls('createdAt')} style={{width:140}} onClick={() => toggleSort('createdAt')}>创建时间</th>
                <th style={{width:100}}>状态</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => {
                const s = statusMap[p.status]
                return (
                  <tr key={p.id} onClick={() => setRoute({ view: 'patient', id: p.id, tab: 'hpo', sub: p.status === 'running' ? 'running' : 'done' })}>
                    <td className="mono" style={{color:'var(--text-3)'}}>{p.id}</td>
                    <td>
                      <div className="name-cell">
                        <div className="name-avatar">{p.name.slice(-1)}</div>
                        <div>
                          <div className="name-main">{p.name}</div>
                          <div className="name-sub">{p.gender} · {p.age}岁</div>
                        </div>
                      </div>
                    </td>
                    <td><div className="sum-cell">{p.summary}</div></td>
                    <td className="num">{p.hpoCount}</td>
                    <td className="num">{p.vcfCount}</td>
                    <td className="mono" style={{color:'var(--text-2)'}}>{p.lastAt}</td>
                    <td className="mono" style={{color:'var(--text-3)'}}>{p.createdAt}</td>
                    <td>
                      {p.status === 'running'
                        ? <span className="running-pill"><span className="spinner"/>诊断中</span>
                        : <StatusDot kind={p.status === 'diagnosed' ? 'ok' : p.status === 'review' ? 'warn' : p.status === 'failed' ? 'err' : 'queue'}>{s.label}</StatusDot>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
