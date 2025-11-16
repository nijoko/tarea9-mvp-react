import React, { useMemo, useState } from "react";
import Card from "../components/Card";
import ExplorarCard from "../components/ExplorarCard";
import Button from "../components/Button";
import Tag from "../components/Tag";
import { PROJECTS } from "../data/projects";
import styles from "../styles/Explorar.module.css";
import cardStyles from "../components/ExplorarCard.module.css";

export default function Explore({
  favorites,
  setFavorites,
  compare,
  setCompare,
  selectedProject,
  setSelectedProject,
}) {
  const [q, setQ] = useState("");
  const allIndustries = [
    ...new Set(PROJECTS.flatMap((p) => p.industries || [])),
  ];
  const [selInd, setSelInd] = useState([]);
  const trls = ["Idea", "Prototipo", "Piloto", "En producción"];
  const [selTrl, setSelTrl] = useState("");
  const [hasDemo, setHasDemo] = useState(false);
  const langs = [...new Set(PROJECTS.flatMap((p) => p.languages || []))];
  const [selLang, setSelLang] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.one_liner.toLowerCase().includes(q.toLowerCase()) ||
        (p.tech_stack || []).some((t) =>
          t.toLowerCase().includes(q.toLowerCase())
        );
      const matchesInd =
        selInd.length === 0 ||
        (p.industries || []).some((i) => selInd.includes(i));
      const matchesTrl = !selTrl || p.trl === selTrl;
      const matchesDemo = !hasDemo || !!p.has_live_demo;
      const matchesLang = !selLang || (p.languages || []).includes(selLang);
      return matchesQ && matchesInd && matchesTrl && matchesDemo && matchesLang;
    });
  }, [q, selInd, selTrl, hasDemo, selLang]);

  const toggleFav = (id) =>
    setFavorites((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id]
    );
  const toggleCmp = (id) =>
    setCompare((c) =>
      c.includes(id)
        ? c.filter((x) => x !== id)
        : c.length >= 3
        ? c
        : [...c, id]
    );

  const chips = [
    q && `🔎 "${q}"`,
    selInd.length > 0 && `🏷️ ${selInd.join(", ")}`,
    selTrl && `📈 ${selTrl}`,
    hasDemo && "🎥 Demo en vivo",
    selLang && `🌐 ${selLang}`,
  ].filter(Boolean);

  return (
    <>
      <div className="containermt2">
        {" "}
        <h2 className="title2n" style={{ textAlign: "left" }}>
          Explorar Proyectos
        </h2>
      </div>
      <div className='contain-filters' >
          <input
            className="input"
            placeholder="Buscar (título, resumen, tecnología)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{flex: 1}}
          />
          <select
            className="input"
            value={selTrl}
            onChange={(e) => setSelTrl(e.target.value)}
            style={{flex: 1}}
          >
            <option value="">Estado/TRL (Todos)</option>
            {trls.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            className="input"
            value={selLang}
            onChange={(e) => setSelLang(e.target.value)}
            style={{flex: 1}}
          >
            <option value="">Idioma (Todos)</option>
            {langs.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>

          <div style={{flex: 1, position: 'relative'}}>
            <button 
              className={styles.collapsible}
              onClick={() => setShowFilters(!showFilters)}
            >
              <img 
                src="https://cdn.iconscout.com/icon/free/png-512/free-filter-icon-svg-download-png-3007732.png?f=webp&w=512" 
                alt="Filter icon"
                style={{width: '14px', height: '16px', marginRight: '6px', verticalAlign: 'middle'}}
              />
              Filtros
            </button>
            
            {showFilters && (
              <div className={styles.dropdownFilters}>
                <div className={styles.moreFilters}>
                  <div className={styles.filterLabel}>Industrias</div>
                  <div className={styles.tagContainer}>
                    {allIndustries.map((i) => (
                      <label
                        key={i}
                        className={`tag ${styles.filterTag} ${
                          selInd.includes(i) ? styles.filterTagActive : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          className={styles.hiddenCheckbox}
                          checked={selInd.includes(i)}
                          onChange={() =>
                            setSelInd((v) =>
                              v.includes(i) ? v.filter((x) => x !== i) : [...v, i]
                            )
                          }
                        />
                        {i}
                      </label>
                    ))}
                  </div>
                  <label className={styles.demoCheckbox}>
                    <input
                      type="checkbox"
                      checked={hasDemo}
                      onChange={(e) => setHasDemo(e.target.checked)}
                    />{" "}
                    Ver solo proyectos con Demo en vivo
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

      <div className="container">
        
        {chips.length > 0 && (
          <div className={styles.filterChips}>
            Filtros activos: {chips.join("  •  ")}
          </div>
        )}

        {compare.length > 0 && (
          <Card>
            <h3>Comparar proyectos</h3>
            {compare.length < 2 ? (
              <p className={styles.compareHint}>
                Selecciona al menos 2 (máx. 3) para comparar.
              </p>
            ) : (
              <div className={styles.compareTable}>
                <table className={styles.compareTable}>
                  <thead className={styles.compareTableHeader}>
                    <tr>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Industria</th>
                      <th>Stack</th>
                      <th>TRL</th>
                      <th>Demo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compare.map((id) => {
                      const p = PROJECTS.find((x) => x.id === id);
                      return (
                        <tr key={id}>
                          <td>{p.id}</td>
                          <td>{p.title}</td>
                          <td>{(p.industries || []).join(", ")}</td>
                          <td>{(p.tech_stack || []).join(", ")}</td>
                          <td>{p.trl}</td>
                          <td>{p.has_live_demo ? "Sí" : "No"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div className={styles.clearCompare}>
              <Button variant="ghost" onClick={() => setCompare([])}>
                Limpiar comparación
              </Button>
            </div>
          </Card>
        )}

        <h3 className={styles.resultsGrid}>Resultados ({results.length})</h3>
        {results.length === 0 ? (
          <p>No hay resultados. Ajusta filtros o búsqueda.</p>
        ) : (
          <div className="grid grid-3">
            {results.map((p) => (
              <ExplorarCard key={p.id}>
                <div className={cardStyles.projectCard}>
                  <div className={cardStyles.projectInfo}>
                    <div className={`h1 ${cardStyles.projectTitle}`}>
                      {p.title}
                    </div>
                    <div className={cardStyles.projectSubtitle}>
                      {p.one_liner}
                    </div>
                  </div>
                  {p.has_live_demo && (
                    <span className="badge">🎥 Demo en vivo</span>
                  )}
                </div>
                <div className={cardStyles.tagContainer}>
                  {(p.industries || []).map((i) => (
                    <Tag key={i}>{i}</Tag>
                  ))}
                </div>
                <div className={cardStyles.techTagContainer}>
                  {(p.tech_stack || []).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                  <Tag>TRL: {p.trl}</Tag>
                </div>
                <div className={`grid grid-3 ${cardStyles.actionButtons}`}>
                  <Button onClick={() => toggleFav(p.id)}>
                    {favorites.includes(p.id) ? "⭐ Quitar" : "⭐ Guardar"}
                  </Button>
                  <Button variant="subtle" onClick={() => toggleCmp(p.id)}>
                    {compare.includes(p.id) ? "🧪 Quitar" : "🧪 Comparar"}
                  </Button>
                  <Button variant="ghost" onClick={() => setSelectedProject(p)}>
                    📄 Ver ficha
                  </Button>
                </div>
              </ExplorarCard>
            ))}
          </div>
        )}

        {selectedProject && (
          <div className="modal" onClick={() => setSelectedProject(null)}>
            <div className="panel" onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div>
                  <h3>📄 {selectedProject.title}</h3>
                  <p className={styles.modalSubtitle}>
                    {selectedProject.one_liner}
                  </p>
                  {selectedProject.summary && (
                    <p className={styles.modalSummary}>
                      {selectedProject.summary}
                    </p>
                  )}
                </div>
                <button
                  className="btn ghost"
                  onClick={() => setSelectedProject(null)}
                >
                  Cerrar
                </button>
              </div>

              {(selectedProject.awards || []).length > 0 && (
                <div className={styles.awardsContainer}>
                  {selectedProject.awards.map((award) => (
                    <span key={award} className={`badge ${styles.awardBadge}`}>
                      🏆 {award}
                    </span>
                  ))}
                </div>
              )}

              <div className={`grid grid-2 ${styles.modalGrid}`}>
                <div>
                  <h4>Problema</h4>
                  <p>{selectedProject.problem || "—"}</p>
                </div>
                <div>
                  <h4>Solución e impacto</h4>
                  <p>{selectedProject.solution || "—"}</p>
                </div>
              </div>

              {(selectedProject.team || []).length > 0 && (
                <div className={styles.teamSection}>
                  <h4>Equipo</h4>
                  <div className={styles.teamContainer}>
                    {selectedProject.team.map((member) => (
                      <span key={member} className={styles.teamMember}>
                        👤 {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.tagContainer}>
                {(selectedProject.tech_stack || []).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
                <Tag>TRL: {selectedProject.trl}</Tag>
              </div>

              <div className={`grid grid-3 ${styles.modalActions}`}>
                {selectedProject.demo_url && (
                  <Button
                    onClick={() =>
                      window.open(selectedProject.demo_url, "_blank")
                    }
                  >
                    🎥 Ver demo
                  </Button>
                )}
                {selectedProject.site_url && (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      window.open(selectedProject.site_url, "_blank")
                    }
                  >
                    🌐 Sitio web
                  </Button>
                )}
                {selectedProject.repo_url && (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      window.open(selectedProject.repo_url, "_blank")
                    }
                  >
                    📦 Repositorio
                  </Button>
                )}
                {selectedProject.contact_url && (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      window.open(selectedProject.contact_url, "_blank")
                    }
                  >
                    ✉️ Contactar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
