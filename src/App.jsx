import React, { useMemo, useState } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import './styles.css'
import Home from './pages/Home'
import Explore from './pages/Explorar'
import Program from './pages/Programa'
import Transmission from './pages/Streaming'
import MyFair from './pages/MiFeria'
import { PROJECTS, SESSIONS } from './data/projects'

function NavTab({label, to, badge}){
  return (
    <NavLink 
      to={to} 
      className={({isActive}) => `tabs-btn ${isActive ? 'active' : ''}`}
      style={({isActive}) => ({
        marginRight: 8,
        marginBottom: 8,
        padding: '8px 12px',
        background: isActive ? 'var(--indigo)' : '',
        textDecoration: 'none',
        display: 'inline-block',
        color: isActive ? 'black' : '',
      })}
    >
      {label}{badge != null && <span className="kpi">{badge}</span>}
    </NavLink>
  )
}

export default function App(){
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  
  // Ocultar scroll en Home
  React.useEffect(() => {
    if (isHomePage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isHomePage])
  
  const [favorites, setFavorites] = useState([])
  const [compare, setCompare] = useState([])
  const [agenda, setAgenda] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [txSessionId, setTxSessionId] = useState(null)

  const projectsById = useMemo(()=>Object.fromEntries(PROJECTS.map(p=>[p.id,p])), [])
  const sessionsById = useMemo(()=>Object.fromEntries(SESSIONS.map(s=>[s.id,s])), [])

  return (
    <div style={{ 
      background: isHomePage ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' : 'transparent', 
      minHeight: '100vh',
      height: isHomePage ? '100vh' : 'auto',
      overflow: isHomePage ? 'hidden' : 'auto'
    }}>
      {!isHomePage && (
        <div className="topbar">
          <div className="inner">
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <div className="h1">FESW</div>
            </div>
            <div className="tabs">
              <NavTab label="Home" to="/" />
              <NavTab label="Explorar" to="/explorar" />
              <NavTab label="Sesiones y Agenda" to="/programa" />
              <NavTab label="Transmisión" to="/streaming" />
              <NavTab label="Mi Feria" to="/mi-feria" badge={(favorites.length+agenda.length)||undefined} />
            </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorar" element={<Explore favorites={favorites} setFavorites={setFavorites} compare={compare} setCompare={setCompare} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />} />
        <Route path="/programa" element={<Program agenda={agenda} setAgenda={setAgenda} setTxSessionId={setTxSessionId} />} />
        <Route path="/streaming" element={<Transmission txSessionId={txSessionId} />} />
        <Route path="/mi-feria" element={<MyFair favorites={favorites} setFavorites={setFavorites} compare={compare} setCompare={setCompare} agenda={agenda} setAgenda={setAgenda} projectsById={projectsById} sessionsById={sessionsById} />} />
      </Routes>

      {!isHomePage && (
        <footer className="footer">
          Hecho como prototipo educativo. Todos los elementos interactivos funcionan (favoritos, comparar, agenda, transmisión simulada, chat, descarga .ics).
        </footer>
      )}
    </div>
  )
}