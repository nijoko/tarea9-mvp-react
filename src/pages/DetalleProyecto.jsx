import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Tag from '../components/Tag'
import { PROJECTS } from '../data/projects'
import styles from '../styles/DetalleProyecto.module.css'

export default function DetalleProyecto({ favorites, setFavorites, agenda, setAgenda }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find(p => p.id === id)

  if (!project) {
    return (
      <div className="container">
        <h2>Proyecto no encontrado</h2>
        <Button onClick={() => navigate('/explorar')}>Volver a Explorar</Button>
      </div>
    )
  }

  const toggleFav = () =>
    setFavorites((f) =>
      f.includes(project.id) ? f.filter((x) => x !== project.id) : [...f, project.id]
    )

  const toggleAgendaSession = (sessionId) => {
    setAgenda((a) =>
      a.includes(sessionId) ? a.filter((x) => x !== sessionId) : [...a, sessionId]
    )
  }

  const isFavorite = favorites.includes(project.id)

  return (
    <>
      <div className="containermt2">
        <h2 className="title2n" style={{ textAlign: "left" }}>
          {project.title}
        </h2>
      </div>

      <div className={styles.actionsBar}>
        <Button onClick={() => navigate('/explorar')}>← Volver a Explorar</Button>
        <div className={styles.actionButtons}>
          <Button onClick={toggleFav}>
            {isFavorite ? "⭐ Quitar de favoritos" : "⭐ Guardar en favoritos"}
          </Button>
          {project.demo_url && (
            <Button variant="ghost" onClick={() => window.open(project.demo_url, '_blank')}>
              🎥 Ver demo en vivo
            </Button>
          )}
        </div>
      </div>

      <div className="container">
        <div className={styles.projectLayout}>
          {/* Columna izquierda: Equipo e información de contacto (1fr) */}
          <aside className={styles.teamSidebar}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>👥 Equipo del Proyecto</h3>
              {project.team && project.team.length > 0 ? (
                <div className={styles.teamList}>
                  {project.team.map((member, idx) => (
                    <div key={idx} className={styles.teamMember}>
                      <div className={styles.memberAvatar}>
                        {member.substring(0, 2).toUpperCase()}
                      </div>
                      <div className={styles.memberInfo}>
                        <div className={styles.memberName}>{member}</div>
                        <div className={styles.memberRole}>
                          {idx === 0 ? 'Project Lead' : 'Team Member'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noInfo}>Información no disponible</p>
              )}
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>📧 Contacto</h3>
              {project.contact_url ? (
                <Button 
                  variant="subtle" 
                  onClick={() => window.open(project.contact_url, '_blank')}
                  style={{ width: '100%' }}
                >
                  ✉️ Contactar al equipo
                </Button>
              ) : (
                <p className={styles.noInfo}>No disponible</p>
              )}
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>🔗 Enlaces</h3>
              <div className={styles.linkButtons}>
                {project.site_url && (
                  <Button 
                    variant="ghost" 
                    onClick={() => window.open(project.site_url, '_blank')}
                    style={{ width: '100%' }}
                  >
                    🌐 Sitio web
                  </Button>
                )}
                {project.repo_url && (
                  <Button 
                    variant="ghost" 
                    onClick={() => window.open(project.repo_url, '_blank')}
                    style={{ width: '100%' }}
                  >
                    📦 Repositorio
                  </Button>
                )}
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>🌐 Idiomas</h3>
              <div className={styles.languages}>
                {project.languages && project.languages.length > 0 ? (
                  project.languages.map((lang) => (
                    <Tag key={lang}>{lang}</Tag>
                  ))
                ) : (
                  <p className={styles.noInfo}>No especificado</p>
                )}
              </div>
            </div>

            {project.awards && project.awards.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>🏆 Reconocimientos</h3>
                <div className={styles.awards}>
                  {project.awards.map((award, idx) => (
                    <div key={idx} className={styles.awardBadge}>
                      🏆 {award}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Columna derecha: Detalles del proyecto (3fr) */}
          <main className={styles.projectContent}>
            <div className={styles.contentSection}>
              <h3 className={styles.contentTitle}>📋 Resumen</h3>
              <p className={styles.oneLiner}>{project.one_liner}</p>
              {project.summary && (
                <p className={styles.summary}>{project.summary}</p>
              )}
            </div>

            <div className={styles.contentSection}>
              <h3 className={styles.contentTitle}>❓ Problema</h3>
              <p className={styles.description}>
                {project.problem || 'No especificado'}
              </p>
            </div>

            <div className={styles.contentSection}>
              <h3 className={styles.contentTitle}>💡 Solución e Impacto</h3>
              <p className={styles.description}>
                {project.solution || 'No especificado'}
              </p>
            </div>

            <div className={styles.contentSection}>
              <h3 className={styles.contentTitle}>🏭 Industrias</h3>
              <div className={styles.tags}>
                {project.industries && project.industries.length > 0 ? (
                  project.industries.map((industry) => (
                    <Tag key={industry}>{industry}</Tag>
                  ))
                ) : (
                  <p className={styles.noInfo}>No especificado</p>
                )}
              </div>
            </div>

            <div className={styles.contentSection}>
              <h3 className={styles.contentTitle}>🛠️ Stack Tecnológico</h3>
              <div className={styles.tags}>
                {project.tech_stack && project.tech_stack.length > 0 ? (
                  project.tech_stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))
                ) : (
                  <p className={styles.noInfo}>No especificado</p>
                )}
              </div>
            </div>

            <div className={styles.contentSection}>
              <h3 className={styles.contentTitle}>📈 Estado de Desarrollo</h3>
              <div className={styles.trlBadge}>
                <span className={styles.trlLabel}>TRL:</span>
                <span className={styles.trlValue}>{project.trl}</span>
              </div>
              {project.has_live_demo && (
                <div className={styles.demoBadge}>
                  🎥 Demo en vivo disponible
                </div>
              )}
            </div>

            {project.schedules && project.schedules.length > 0 && (
              <div className={styles.contentSection}>
                <h3 className={styles.contentTitle}>📅 Horarios de Presentación</h3>
                <div className={styles.schedulesList}>
                  {project.schedules.map((schedule, idx) => {
                    const isInAgenda = agenda.includes(schedule.sub_id)
                    return (
                      <div key={idx} className={styles.scheduleItem}>
                        <div className={styles.scheduleInfo}>
                          <div className={styles.scheduleDate}>
                            📅 {schedule.date}
                          </div>
                          <div className={styles.scheduleTime}>
                            🕒 {schedule.start} - {schedule.end}
                          </div>
                          <div className={styles.scheduleLocation}>
                            📍 Sala {schedule.room} • {schedule.type}
                          </div>
                        </div>
                        <Button 
                          onClick={() => toggleAgendaSession(schedule.sub_id)}
                        >
                          {isInAgenda ? "✓ En mi agenda" : "📅 Agregar a agenda"}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
