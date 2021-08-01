import { useContext } from 'react';
import Head from 'next/head';

import { AuthContext } from '../contexts/AuthContext';

import styles from '../styles/Home.module.scss';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Recycle.it</title>
      </Head>

      <main className={styles.main}>
        <h1>Hello, {user?.name}</h1>
      </main>
    </div>
  )
}
