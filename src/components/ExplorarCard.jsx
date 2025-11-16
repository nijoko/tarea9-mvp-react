import styles from './ExplorarCard.module.css';

export default function ExplorarCard({ children }) {
  return <div className={styles.explorarCard}>{children}</div>;
}
