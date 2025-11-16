import styles from './StreamingCard.module.css';

export default function StreamingCard({ children }) {
  return <div className={styles.streamingCard}>{children}</div>;
}
