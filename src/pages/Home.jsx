import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION centrado */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          {/* Llave de apertura más arriba */}
          <span className={`${styles.brace} ${styles.braceOpen}`}>&#123;</span>
          
          {/* Feria de */}
          <span className={`${styles.heroTitle} ${styles.heroTitle1}`}>Feria de</span>
          
          {/* Software */}
          <span className={`${styles.heroTitle} ${styles.heroTitle2}`}>Software</span>
          
          {/* USM */}
          <span className={`${styles.typewriterAnimation} ${styles.heroTitle} ${styles.heroTitle3}`}>USM</span>
          
          {/* Llave de cierre más abajo */}
          <span className={`${styles.brace} ${styles.braceClose}`}>&#125;</span>
          
          <span className={styles.heroEnd}>
            Donde las ideas se transforman en software que impacta  |  FESW
          </span>
        </div>
      </div>

      {/* Botón centrado */}
      <div className={styles.buttonContainer}>
        <button 
          className={styles.exploreButton}
          onClick={() => navigate('/explorar')}
        >
          🔎 EXPLORAR AHORA →
        </button>
      </div>

      {/* FOOTER centrado */}
      <div className={styles.footerSection}>
        © 2025 Feria de Software — MVP Docencia
      </div>
    </>
  );
}