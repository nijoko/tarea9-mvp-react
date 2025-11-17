import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { buildICS } from '../utils/ics'
import { downloadText } from '../utils/download'
import styles from '../styles/MiFeria.module.css'

export default function MyFair({favorites, setFavorites, compare, setCompare, agenda, setAgenda, projectsById, sessionsById}){
  const favProjects = favorites.map(id => projectsById[id]).filter(Boolean)
  const cmpProjects = compare.map(id => projectsById[id]).filter(Boolean)
  const agSessions = agenda.map(id => sessionsById[id]).filter(Boolean)

  const removeFav = (id) => setFavorites(f => f.filter(x=>x!==id))
  const removeAg = (id) => setAgenda(a => a.filter(x=>x!==id))

  const downloadICS = () => { const ics = buildICS(agSessions); downloadText('mi_agenda.ics', ics, 'text/calendar') }

  return (
    <div className="container">
      <h2 className="h2">⭐ Mi Feria</h2>

      <h3>Favoritos</h3>
      {favProjects.length===0 ? <p>Aún no tienes favoritos.</p> : (
        <div className={`grid grid-2 ${styles.favoritesSection}`}>
          {favProjects.map(p => (
            <Card key={p.id}>
              <div className={styles.favoriteCard}>
                <div>
                  <div className={`h1 ${styles.favoriteTitle}`}>{p.title}</div>
                  <div className={styles.favoriteSubtitle}>{p.one_liner}</div>
                </div>
                <Button variant="danger" onClick={()=>removeFav(p.id)}>Quitar</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <h3>Comparación (hasta 3)</h3>
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

      <h3 className={styles.agendaSection}>Mi agenda</h3>
      {agSessions.length===0 ? <p>Tu agenda está vacía.</p> : (
        <>
          <div className={`grid grid-2 ${styles.agendaGrid}`}>
            {agSessions.map(s => (
              <Card key={s.id}>
                <div className={styles.agendaCard}>
                  <div>
                    <div className={`h1 ${styles.agendaTitle}`}>{s.title}</div>
                    <div className={styles.agendaMeta}>{s.start} — {s.end} · {s.track||'—'}</div>
                  </div>
                  <Button variant="danger" onClick={()=>removeAg(s.id)}>Quitar</Button>
                </div>
              </Card>
            ))}
          </div>
          <Button onClick={downloadICS}>⬇️ Descargar .ics</Button>
        </>
      )}
    </div>
  )
}