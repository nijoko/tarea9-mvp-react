import styles from './MiFeriaCard.module.css';

export default function MiFeriaCard({ children, variant = 'default' }) {
  return <div className={`${styles.miferiaCard} ${styles[variant]}`}>{children}</div>;
}
