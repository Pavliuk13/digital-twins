import styles from './Divider.module.scss';

interface DividerProps {
  offset?: number;
}

function Divider(props: DividerProps) {
  const { offset = 0 } = props;

  return <div style={{ margin: `${offset}px 0` }} className={styles.divider} />;
}

export default Divider;
