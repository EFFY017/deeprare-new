import { useState, useEffect } from 'react'
import AppShell from './components/AppShell'
import PageNewDiag from './pages/PageNewDiag'
import PageList from './pages/PageList'
import PageListV2 from './pages/PageListV2'
import { PatientDetail, DeleteDialog } from './pages/PatientDetail'
import { PATIENTS, HERO_PATIENT } from './data/mockData'

export default function App() {
  const [route, setRoute] = useState(() => {
    try { const v = JSON.parse(localStorage.getItem('dr-route') || 'null'); return v || { view: 'new' } }
    catch { return { view: 'new' } }
  })
  useEffect(() => { try { localStorage.setItem('dr-route', JSON.stringify(route)) } catch {} }, [route])
  const [deleteFor, setDeleteFor] = useState(null)
  const navigate = (r) => setRoute(r)

  let view = null
  if (route.view === 'new') view = <PageNewDiag setRoute={navigate}/>
  else if (route.view === 'list') view = <PageList setRoute={navigate}/>
  else if (route.view === 'listv2') view = <PageListV2 setRoute={navigate}/>
  else if (route.view === 'patient') view = <PatientDetail route={route} setRoute={navigate} openDeleteDialog={() => {
    const p = PATIENTS.find(x => x.id === route.id) || HERO_PATIENT
    setDeleteFor(p)
  }}/>

  return (
    <>
      <AppShell route={route} setRoute={navigate}>{view}</AppShell>
      {deleteFor && <DeleteDialog patient={deleteFor} onClose={() => setDeleteFor(null)} onConfirm={() => { setDeleteFor(null); navigate({ view: 'list' }) }}/>}
    </>
  )
}
