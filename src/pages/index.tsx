import { Children, useContext } from 'react';
import Head from 'next/head';

import { Layout } from '../components/Layout';

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

// eslint-disable-next-line react/display-name
Home.getLayout = (page: any) => (
  <Layout>
    {page}
  </Layout>
)