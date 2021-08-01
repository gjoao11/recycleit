import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recycle.it</title>
      </Head>

      <main className={styles.main}>
        <h1>Hello World</h1>
      </main>
    </div>
  )
}
