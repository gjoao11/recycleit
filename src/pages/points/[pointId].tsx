import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { MdEmail, MdMessage } from 'react-icons/md';

import { Layout } from '../../Layouts/Layout';
import { PointTitleLayout } from '../../Layouts/PointTitleLayout/PointTitleLayout';

import { api } from '../../services/api';

import styles from '../../styles/Point.module.scss';

type Point = {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  image: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: number;
  items: {
    id: number;
    name: string;
  }[];
}

export default function Point({ point }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(`https://wa.me/55${point.whatsapp}`)

  return (
    <div className={styles.pointPage}>
      <Head>
        <title>{point.name} | Reycle.it</title>
      </Head>

      <div className={styles.pointImage}>
        {point.image !== 'http://localhost:3333/uploads/undefined' ? (
          <Image src={point.image} alt={`${point.name} image`} layout="fill" />
        ) : (
          <span className={styles.noImage}>Sem imagem</span>
        )}
      </div>

      <main>
        <h1>{point.name}</h1>

        <div className={styles.mainContent}>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <h2>Endereço:</h2>
              <div>
                <span>{point.city}, {point.state}</span>
                <span>{point.street}, {point.district}</span>
                <span>Nº {point.number}</span>
              </div>
            </div>

            <div className={styles.info}>
              <h2>Contato:</h2>
              <div>
                <a href={`https://wa.me/55${point.whatsapp}`} target="_blank" rel="noreferrer">
                  <MdMessage size={24} color="var(--text)" />
                  Whatsapp
                </a>

                <a href={`mailto:${point.email}`} target="_blank" rel="noreferrer">
                  <MdEmail size={24} color="var(--text)" />
                  E-mail
                </a>
              </div>
            </div>
          </div>

          <div className={styles.itemsContainer}>
            <h2>Itens que o ponto coleta:</h2>
            <div className={styles.items}>
              {point.items.map(item => (
                <span key={item.id} className={styles.item}>{item.name}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const response = await api.get(`/points/${params?.pointId}`);
  const point: Point = await response.data;

  return {
    props: {
      point,
    },
    revalidate: 60 * 60 * 24 // 24 hour
  }
}

// eslint-disable-next-line react/display-name
Point.getLayout = (page: NextPage) => (
  <Layout>
    <PointTitleLayout
      hasBackButton
      title="Ponto de coleta"
    >
      {page}
    </PointTitleLayout>
  </Layout>
)
