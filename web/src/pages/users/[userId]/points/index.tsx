import { InferGetServerSidePropsType, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';

import { Layout } from '../../../../Layouts/Layout';
import { PointTitleLayout } from '../../../../Layouts/PointTitleLayout/PointTitleLayout';
import PointView from '../../../../components/PointView';

import { getAPIClient } from '../../../../services/axios';

import styles from '../../../../styles/Management.module.scss';
import { parseCookies } from 'nookies';

type Point = {
  name: string;
  image: string;
  id: number;
}

type ManagementProps = {
  points: Point[],
  hasNotPoints: boolean,
}

export default function Management({ points }: ManagementProps) {
  return (
    <div className={styles.mainContent}>
      <Head>
        <title>Gerenciar pontos de coleta | Recycle.it</title>
      </Head>

      {
        points.length < 1
        &&
        <span>você não tem nenhum ponto!</span>
      }

      {points.map(point => (
        <div key={`${point.id}`}>
          <PointView
            id={point.id}
            image={point.image}
            name={point.name}
          />
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { ['recycleit.token']: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

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
