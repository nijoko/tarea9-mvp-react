import styles from './ProgramaCard.module.css';

export default function ProgramaCard({ children }) {
  return <div className={styles.programaCard}>{children}</div>;
}
