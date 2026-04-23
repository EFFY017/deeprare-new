import { useState, useEffect, useRef } from 'react'
import AppShell from './components/AppShell'
import PageNewDiag from './pages/PageNewDiag'
import PageListV2 from './pages/PageListV2'
import { PatientDetail, DeleteDialog } from './pages/PatientDetail'
import { Btn } from './components/primitives'
import { PATIENTS, HERO_PATIENT } from './data/mockData'

export default function App() {
  const [route, setRoute] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('view')) return Object.fromEntries(params.entries())
    try { const v = JSON.parse(localStorage.getItem('dr-route') || 'null'); return v || { view: 'new' } }
    catch { return { view: 'new' } }
  })
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('view')) return
    try { localStorage.setItem('dr-route', JSON.stringify(route)) } catch {}
  }, [route])

  const [deleteFor, setDeleteFor] = useState(null)
  const [pendingRoute, setPendingRoute] = useState(null)
  const editingRef = useRef(false)

  const navigate = (r) => setRoute(r)

  // AppShell nav uses this — blocks if list panel is in edit mode
  const guardedNavigate = (r) => {
    if (editingRef.current) { setPendingRoute(r) }
    else { navigate(r) }
  }

  const handleEditingChange = (v) => { editingRef.current = v }

  let view = null
  if (route.view === 'new') view = <PageNewDiag route={route} setRoute={navigate}/>
  else if (route.view === 'list') view = <PageListV2 setRoute={navigate} onEditingChange={handleEditingChange}/>
  else if (route.view === 'patient') view = <PatientDetail route={route} setRoute={navigate} openDeleteDialog={() => {
    const p = PATIENTS.find(x => x.id === route.id) || HERO_PATIENT
    setDeleteFor(p)
  }}/>

  return (
    <>
      <AppShell route={route} setRoute={guardedNavigate}>{view}</AppShell>
      {deleteFor && <DeleteDialog patient={deleteFor} onClose={() => setDeleteFor(null)} onConfirm={() => { setDeleteFor(null); navigate({ view: 'list' }) }}/>}
      {pendingRoute && (
        <div className="overlay" onClick={() => setPendingRoute(null)}>
          <div className="dialog" style={{maxWidth:420}} onClick={e => e.stopPropagation()}>
            <div className="dialog__head">
              <div>
                <div className="dialog__title">当前编辑未保存</div>
                <div className="dialog__desc">离开后，当前编辑的内容将丢失。是否继续？</div>
              </div>
            </div>
            <div className="dialog__foot">
              <Btn variant="ghost" size="sm" onClick={() => setPendingRoute(null)}>返回继续编辑</Btn>
              <Btn variant="danger" size="sm" onClick={() => {
                editingRef.current = false
                navigate(pendingRoute)
                setPendingRoute(null)
              }}>放弃编辑并离开</Btn>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
