import { useEffect, useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Layout } from '../components/Layout';

import { api } from '../services/api';

import styles from '../styles/Home.module.scss';
import { Filter } from '../components/Filter';

const Map = dynamic(
  () => import('../components/MapWrapper'),
  { ssr: false }
)

type Item = {
  id: number;
  name: string;
}

type Point = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

export default function Home({ items }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [position, setPosition] = useState<LatLngExpression>([-15.7751885, -48.3575963]);

  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
      getLocation(latitude, longitude)
    })
  }, []);

  useEffect(() => {
    handleFilterPoints(state, city, [NaN]);
  }, [state, city]);

  async function getLocation(lat: number, lon: number) {
    const { data: { address } } = await api.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`
    );

    setState(address['state']);
    if (address['city']) {
      setCity(address['city']);
    }
    if (address['town']) {
      setCity(address['town']);
    }
  }

  async function handleFilterPoints(state: string, city: string, itemsId: number[]) {
    try {
      const { data } = await api.get('/points/filter', {
        params: {
          state,
          city,
          itemsId,
        }
      })

      setPoints(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Recycle.it</title>
      </Head>

      <Filter
        items={items}
        state={state}
        selectedItems={selectedItems}
        city={city}
        handleSelectItem={handleSelectItem}
        handleFilterPoints={handleFilterPoints}
      />

      <main className={styles.main}>
        <Map position={position} points={points} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await api.get(
    '/items'
  );

  const items: Item[] = await response.data;

  return {
    props: {
      items,
    },
  }
}

// eslint-disable-next-line react/display-name
Home.getLayout = (page: any) => (
  <Layout>
    {page}
  </Layout>
)