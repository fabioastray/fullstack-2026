import styles from './spinner.module.css'

interface Props {
  message?: string
}

function Spinner({ message }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}

export default Spinner
