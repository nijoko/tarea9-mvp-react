import React from 'react'
import MiFeriaCard from '../components/MiFeriaCard'
import Button from '../components/Button'
import { buildICS } from '../utils/ics'
import { downloadText } from '../utils/download'
import styles from '../styles/MiFeria.module.css'
import cardStyles from '../components/MiFeriaCard.module.css'

export default function MyFair({favorites, setFavorites, compare, setCompare, agenda, setAgenda, projectsById, sessionsById}){
  const favProjects = favorites.map(id => projectsById[id]).filter(Boolean)
  const cmpProjects = compare.map(id => projectsById[id]).filter(Boolean)
  const agSessions = agenda.map(id => sessionsById[id]).filter(Boolean)

  const removeFav = (id) => setFavorites(f => f.filter(x=>x!==id))
  const removeAg = (id) => setAgenda(a => a.filter(x=>x!==id))

  const downloadICS = () => { const ics = buildICS(agSessions); downloadText('mi_agenda.ics', ics, 'text/calendar') }

  return (
    <>
      <div className="containermt2">
        <h2 className="title2n" style={{ textAlign: "left" }}>Mi Feria</h2>
      </div>
      <div className="container">

      <h3 className={styles.sectionTitle}>Favoritos</h3>
      {favProjects.length===0 ? <p>Aún no tienes favoritos.</p> : (
        <div className={`grid grid-2 ${styles.favoritesSection}`}>
          {favProjects.map(p => (
            <MiFeriaCard key={p.id}>
              <div className={cardStyles.favoriteInfo}>
                <div className={`h1 ${cardStyles.favoriteTitle}`}>{p.title}</div>
                <div className={cardStyles.favoriteSubtitle}>{p.one_liner}</div>
              </div>
              <div className={cardStyles.favoriteActions}>
                <Button variant="danger" onClick={()=>removeFav(p.id)}>Quitar favorito</Button>
              </div>
            </MiFeriaCard>
          ))}
        </div>
      )}

      <h3 className={styles.sectionTitle}>Comparación (hasta 3)</h3>
      {cmpProjects.length<2 ? <p>Selecciona al menos 2 proyectos en Explorar para comparar.</p> : (
        <div className={styles.compareTable}>
          <table className={styles.compareTableInner}>
            <thead className={styles.compareTableHeader}>
              <tr><th>Título</th><th>Industria</th><th>Stack</th><th>TRL</th><th>Demo</th></tr>
            </thead>
            <tbody>
              {cmpProjects.map(p => (
                <tr key={p.id}><td>{p.title}</td><td>{(p.industries||[]).join(', ')}</td><td>{(p.tech_stack||[]).join(', ')}</td><td>{p.trl}</td><td>{p.has_live_demo?'Sí':'No'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cmpProjects.length>0 && <Button variant="ghost" onClick={()=>setCompare([])}>Limpiar comparación</Button>}

      <h3 className={styles.sectionTitle}>Mi agenda</h3>
      {agSessions.length===0 ? <p>Tu agenda está vacía.</p> : (
        <>
          <div className={`grid grid-2 ${styles.agendaGrid}`}>
            {agSessions.map(s => (
              <MiFeriaCard key={s.id}>
                <div className={cardStyles.agendaInfo}>
                  <div className={`h1 ${cardStyles.agendaTitle}`}>{s.title}</div>
                  <div className={cardStyles.agendaMeta}>{s.start} — {s.end} · {s.track||'—'}</div>
                </div>
                <div className={cardStyles.agendaActions}>
                  <Button variant="danger" onClick={()=>removeAg(s.id)}>Quitar de agenda</Button>
                </div>
              </MiFeriaCard>
            ))}
          </div>
          <Button onClick={downloadICS}>⬇️ Descargar .ics</Button>
        </>
      )}
      </div>
    </>
  )
}