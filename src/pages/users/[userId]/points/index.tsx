import { InferGetServerSidePropsType, GetServerSidePropsContext, NextPage } from 'next';

import { Layout } from '../../../../Layouts/Layout';
import { PointTitleLayout } from '../../../../Layouts/PointTitleLayout/PointTitleLayout';
import PointView from '../../../../components/PointView';

import { getAPIClient } from '../../../../services/axios';

import styles from '../../../../styles/Management.module.scss';

type Point = {
  name: String;
  image?: String;
  status: String;
  id: String;
}

export default function Management({ points }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.mainContent}>
      {points.map(point => (
        <div key={`${point.id}`}>
          <PointView
            name={`${point.name}`}
            status={`${point.status}`}
            textButton={{
              text: 'Editar',
              linkDirection: '/'
            }}
          />
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apiClient = getAPIClient(context);

  const response = await apiClient.get(`/users/${context.params?.userId}/points`);
  const points: Point[] = await response.data;

  return {
    props: {
      points,
    }
  }
}

// eslint-disable-next-line react/display-name
Management.getLayout = (page: NextPage) => (
  <Layout>
    <PointTitleLayout
      title="Gerenciar pontos de coleta"
      textButton={{
        text: '+ criar um ponto',
        linkDirection: `/users/${1}/points/new`,
      }}
    >
      {page}
    </PointTitleLayout>
  </Layout>
)
