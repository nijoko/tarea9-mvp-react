import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { SESSIONS } from '../data/projects'
import { fmtHour, toDate } from '../utils/date'
import styles from '../styles/Programa.module.css'

export default function Program({agenda, setAgenda, setTxSessionId}){
  const navigate = useNavigate()
  const sessions = SESSIONS.map(s => ({...s, startDate: toDate(s.start), endDate: toDate(s.end)}))
  const days = [...new Set(sessions.map(s => s.start.split(' ')[0]))]
  const tracks = [...new Set(sessions.map(s => s.track).filter(Boolean))]

  const [selDay, setSelDay] = useState(days[0]||'')
  const [selTrack, setSelTrack] = useState('')
  const [order, setOrder] = useState('early')

  const filtered = useMemo(()=>sessions
    .filter(s => (!selDay || s.start.startsWith(selDay)) && (!selTrack || s.track===selTrack))
    .sort((a,b)=> order==='early'? a.startDate-b.startDate : b.startDate-a.startDate)
  ,[sessions, selDay, selTrack, order])

  const addAgenda = (id) => setAgenda(a => a.includes(id)? a : [...a,id])

  return (
    <div className="container">
      <h2 className="h2">🗓️ Sesiones y Agenda</h2>
      <div className={`grid grid-3 ${styles.filterSection}`}>
        <select className="input" value={selDay} onChange={e=>setSelDay(e.target.value)}>
          {days.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="input" value={selTrack} onChange={e=>setSelTrack(e.target.value)}>
          <option value="">Track (Todos)</option>
          {tracks.map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="input" value={order} onChange={e=>setOrder(e.target.value)}>
          <option value="early">Ordenar: más temprano primero</option>
          <option value="late">Ordenar: más tarde primero</option>
        </select>
      </div>
      <div className={styles.anchorSection}>Anclas: <button className="btn ghost" onClick={()=>setOrder('early')}>Inicio del día</button> · <button className="btn ghost" onClick={()=>setOrder('late')}>Fin del día</button></div>

      {filtered.length===0 ? (
        <p>No hay sesiones para el filtro seleccionado.</p>
      ) : (
        <div className="grid grid-2" style={{marginTop:12}}>
          {filtered.map(s => (
            <Card key={s.id}>
              <div className={styles.sessionCard}>
                <div className={styles.sessionInfo}>
                  <div className={`h1 ${styles.sessionTitle}`}>{s.title}</div>
                  <div className={styles.sessionMeta}>🕒 {fmtHour(s.start)} — {fmtHour(s.end)} · 🎯 {s.track||'—'}</div>
                  <div className={styles.sessionSpeakers}>{(s.speakers||[]).join(', ')}</div>
                </div>
              </div>
              <div className={`grid grid-2 ${styles.sessionActions}`}>
                <Button onClick={()=>{ setTxSessionId(s.id); navigate('/streaming'); }}>🏟️ Ver transmisión en sala</Button>
                <Button variant="subtle" onClick={()=>addAgenda(s.id)}>➕ Añadir a mi agenda</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}