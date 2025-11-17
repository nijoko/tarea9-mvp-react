import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgramaCard from '../components/ProgramaCard'
import Button from '../components/Button'
import { SESSIONS } from '../data/projects'
import { fmtHour, toDate } from '../utils/date'
import styles from '../styles/Programa.module.css'
import cardStyles from '../components/ProgramaCard.module.css'

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

  const toggleAgenda = (id) => setAgenda(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id])

  // Formatear fecha: "Viernes, 15 de Noviembre 2024"
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-')
    const date = new Date(year, month - 1, day)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('es-ES', options)
  }


  return (
    <>
      <div className="containermt2">
        <h2 className="title2n" style={{ textAlign: "left" }}>Agenda</h2>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterRow}>
          <div className={styles.dateButtons}>
            {days.map(d => (
              <button 
                key={d}
                className={`${styles.dateButton} ${selDay === d ? styles.dateButtonActive : ''}`}
                onClick={() => setSelDay(d)}
              >
                {formatDate(d)}
              </button>
            ))}
          </div>
          <div className={styles.filterControls}>
            <select className="input" value={selTrack} onChange={e=>setSelTrack(e.target.value)}>
              <option value="">Track (Todos)</option>
              {tracks.map(t => <option key={t}>{t}</option>)}
            </select>
            <select className="input" value={order} onChange={e=>setOrder(e.target.value)}>
              <option value="early">Ordenar: más temprano primero</option>
              <option value="late">Ordenar: más tarde primero</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container">
      {filtered.length===0 ? (
        <p>No hay sesiones para el filtro seleccionado.</p>
      ) : (
        <div className={styles.sessionsList}>
          {filtered.map(s => (
            <div key={s.id} className={styles.sessionItem}>
              <div className={styles.sessionTime}>{fmtHour(s.start)}</div>
              <ProgramaCard>
                <div className={cardStyles.sessionCard}>
                  <div className={cardStyles.sessionInfo}>
                    <div className={cardStyles.sessionHeader}>
                      <div className={`h1 ${cardStyles.sessionTitle}`}>{s.title}</div>
                      {s.type && (
                        <span className={cardStyles.sessionType}>{s.type}</span>
                      )}
                    </div>
                    <div className={cardStyles.sessionMeta}>
                      <span>🕒 {fmtHour(s.start)} — {fmtHour(s.end)}</span>
                      {s.location && <span>📍 {s.location}</span>}
                      {s.track && <span className={cardStyles.trackBadge}>🎯 {s.track}</span>}
                    </div>
                    {s.speakers && s.speakers.length > 0 && (
                      <div className={cardStyles.sessionSpeakers}>
                        <span className={cardStyles.speakersLabel}>👥 Presentadores:</span>
                        <span className={cardStyles.speakersList}>
                          {s.speakers.slice(0, 3).join(' • ')}
                          {s.speakers.length > 3 && ` +${s.speakers.length - 3} más`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={cardStyles.sessionActions}>
                  <Button onClick={()=>{ setTxSessionId(s.id); navigate('/streaming'); }}>🏟️ Ver transmisión en sala</Button>
                  <Button 
                    variant={agenda.includes(s.id) ? "ghost" : "subtle"} 
                    onClick={()=>toggleAgenda(s.id)}
                  >
                    {agenda.includes(s.id) ? "✓ En mi agenda" : "➕ Añadir a mi agenda"}
                  </Button>
                </div>
              </ProgramaCard>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  )
}