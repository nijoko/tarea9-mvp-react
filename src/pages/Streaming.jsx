import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { SESSIONS } from '../data/projects'
import { toDate, fmtHour } from '../utils/date'
import styles from '../styles/Streaming.module.css'

export default function Transmission({txSessionId}){
  const [forceLive, setForceLive] = useState(false)
  const [reactions, setReactions] = useState({like:0, clap:0, idea:0})
  const [viewers, setViewers] = useState(42)
  const [chat, setChat] = useState([])
  const [name, setName] = useState('Estudiante')
  const [msg, setMsg] = useState('')
  
  const sessions = SESSIONS.map(s => ({...s, startDate: toDate(s.start), endDate: toDate(s.end)}))
  const [selId, setSelId] = useState(txSessionId || sessions[0]?.id)
  useEffect(()=>{ if(txSessionId) setSelId(txSessionId) }, [txSessionId])

  const s = sessions.find(x=>x.id===selId)
  if(!s) return <div className="container">No hay sesiones.</div>
  const now = new Date()
  const isLive = now >= s.startDate && now <= s.endDate

  return (
    <div className="container">
      <h2 className="h2">📺 Transmisión de sesiones (simulada)</h2>
      <div className={`grid grid-3 ${styles.filterSection}`}>
        <select className="input" value={selId} onChange={e=>setSelId(e.target.value)}>
          {SESSIONS.map(x => <option key={x.id} value={x.id}>{x.start} — {x.title} [{x.track||'—'}]</option>)}
        </select>
        <label className={styles.simulateLiveLabel}>
          <input type="checkbox" checked={forceLive} onChange={e=>setForceLive(e.target.checked)} /> Simular "EN VIVO"
        </label>
      </div>

      <div className="grid grid-2">
        <Card>
          <div className={styles.videoHeader}>
            <div>
              <div className={`h1 ${styles.videoTitle}`}>🎤 {s.title}</div>
              <div className={styles.videoMeta}>🕒 {fmtHour(s.start)} — {fmtHour(s.end)} · 🎯 {s.track||'—'} · 👥 {(s.speakers||[]).join(', ')||'—'}</div>
            </div>
            <div className={`kpi ${(isLive||forceLive) ? styles.statusBadgeLive : styles.statusBadgeWaiting}`}>
              {(isLive||forceLive)?'🔴 EN VIVO':'🕓 En espera'}
            </div>
          </div>
          <div className={styles.videoContainer}>
            {s.streaming_url ? (
              <div className={styles.videoFrame}>
                <iframe title="stream" src={s.streaming_url.replace('watch?v=','embed/')} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className={styles.videoIframe} />
              </div>
            ) : (
              <div className={styles.videoPlaceholder}>Sin URL de transmisión</div>
            )}
          </div>
          <div className={styles.reactionsSection}>
            <div className={styles.audienceSection}>Reacciones</div>
            <div className={styles.reactionButtons}>
              <Button variant="subtle" onClick={()=>setReactions(r=>({...r, like:r.like+1}))}>👍 {reactions.like}</Button>
              <Button variant="subtle" onClick={()=>setReactions(r=>({...r, clap:r.clap+1}))}>👏 {reactions.clap}</Button>
              <Button variant="subtle" onClick={()=>setReactions(r=>({...r, idea:r.idea+1}))}>💡 {reactions.idea}</Button>
            </div>
          </div>
        </Card>
        <div>
          <Card>
            <div className={styles.audienceSection}>Audiencia (simulada)</div>
            <input type="range" min={0} max={1000} value={viewers} onChange={e=>setViewers(parseInt(e.target.value))} className={styles.audienceSlider} />
            <div className={styles.audienceCount}>{viewers}</div>
          </Card>
          <Card>
            <div className={styles.chatSection}>Chat en vivo (simulado)</div>
            <div className={styles.chatContainer}>
              {chat.length===0 ? <div className={styles.chatEmpty}>No hay mensajes aún.</div> : chat.map((m,i)=>(<div key={i} className={styles.chatMessage}><b>{m.name}</b>: {m.msg}</div>))}
            </div>
            <input className={`input ${styles.chatInput}`} value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" />
            <input className={`input ${styles.chatInput}`} value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Escribe un mensaje" />
            <Button onClick={()=>{ if(msg.trim()){ setChat(c=>[...c,{name, msg}]); setMsg('') } }}>Enviar</Button>
          </Card>
          <Card>
            <div className={styles.reportSection}>Reportar problema</div>
            <textarea className={`input ${styles.reportTextarea}`} placeholder="Describe el problema (audio, video, acceso…)" />
            <Button variant="ghost" onClick={()=>alert('Reporte enviado (simulado)')}>Enviar reporte</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}