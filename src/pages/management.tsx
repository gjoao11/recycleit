import { NextPage } from 'next';
import { Layout } from '../Layouts/Layout';
import { PointTitleLayout } from '../Layouts/PointTitleLayout/PointTitleLayout';

import styles from '../styles/Management.module.scss'

export default function Management() {
  return (
    <div className={styles.mainContent}>
      <p>Olá</p>
    </div>
  );
}

// eslint-disable-next-line react/display-name
Management.getLayout = (page: NextPage) => (
  <Layout>
    <PointTitleLayout
      title="Gerenciar pontos de coleta"
      textButton={{
        text: '+ criar um ponto',
        linkDirection: '/'
      }}
    >
      {page}
    </PointTitleLayout>
  </Layout>
)