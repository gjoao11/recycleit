import { LeafletMouseEvent } from 'leaflet';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { FormEvent, useContext, useEffect, useState } from 'react';

import { Form } from '../../../../../components/Form';
import { InputLine } from '../../../../../components/Form/InputLine';
import { ImageUpload } from '../../../../../components/ImageUpload';
import { Input } from '../../../../../components/Input';
import { OpacityButton } from '../../../../../components/OpacityButton';
import { TextButton } from '../../../../../components/TextButton';
import { usePosition } from '../../../../../hooks/usePosition';

import { Layout } from '../../../../../Layouts/Layout';
import { PointTitleLayout } from '../../../../../Layouts/PointTitleLayout/PointTitleLayout';
import { api } from '../../../../../services/api';

import styles from '../../../../../styles/CreatePoint.module.scss';

const Map = dynamic(
  () => import('../../../../../components/Form/MapForm'),
  { ssr: false }
)

type Item = {
  id: number;
  name: string;
}

type CreatePointData = {
  name: string;
  email: string;
  whatsapp: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  selectedPosition: [number, number];
  cpfOrCnpj: string;
  itemsId: number[];
  file: File[] | undefined;
}

type CreatePointProps = {
  items: Item[];
}

export default function CreatePoint({ items }: CreatePointProps) {
  const { position } = usePosition();
  const router = useRouter();

  const [name, setName] = useState('');
  const [cpfOrCnpj, setCpfOrCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [selectedFile, setSelectedFile] = useState<File[]>();

  useEffect(() => {
    getLocation(position)
  }, [position]);

  async function getLocation(position: any) {
    const { data: { address } } = await api.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=jsonv2`
    );

    setState(address['state']);
    if (address['city']) {
      setCity(address['city']);
    }
    if (address['town']) {
      setCity(address['town']);
    }
  }

  function handleSelectPosition(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setSelectedPosition([lat, lng]);
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

  async function handleSubmit(
    event: FormEvent,
    {
      name,
      email,
      whatsapp,
      state,
      city,
      district,
      street,
      number,
      selectedPosition,
      cpfOrCnpj,
      itemsId,
      file,
    }: CreatePointData
  ) {
    try {
      event.preventDefault();

      const image = file ? file[0] : '';

      console.log(itemsId.toString())

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('whatsapp', whatsapp);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('district', district);
      formData.append('street', street);
      formData.append('number', number);
      formData.append('latitude', String(selectedPosition[0]));
      formData.append('longitude', String(selectedPosition[1]));
      formData.append('cpfOrCnpj', cpfOrCnpj);
      formData.append('itemsId', itemsId.join());
      formData.append('file', image);

      const result = await api.put('/points/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (result.data) {
        router.back();
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  function handleUpload(file: any) {
    setSelectedFile(file);
  }

  return (
    <div className={styles.createPointPage}>
      <Head>
        <title>Criar ponto de coleta | Recycle.it</title>
      </Head>

      <Form onSubmit={event => {
        handleSubmit(event, {
          name,
          email,
          whatsapp,
          state,
          city,
          district,
          street,
          number,
          selectedPosition,
          cpfOrCnpj,
          itemsId: selectedItems,
          file: selectedFile,
        })
      }}>
        <fieldset>
          <span>Imagem do local</span>

          <ImageUpload
            onUpload={handleUpload}
            selectedFile={selectedFile}
          />
        </fieldset>

        <fieldset>
          <span>Informações</span>

          <InputLine>
            <Input
              type="text"
              placeholder="Nome do ponto de coleta"
              required
              onChange={event => setName(event.target.value)}
              value={name}
            />

            <Input
              type="number"
              placeholder="CPF ou CNPJ"
              required
              onChange={event => setCpfOrCnpj(event.target.value)}
              value={cpfOrCnpj}
            />
          </InputLine>
        </fieldset>

        <fieldset>
          <span>Contato</span>

          <InputLine>
            <Input
              type="email"
              placeholder="E-mail"
              required
              onChange={event => setEmail(event.target.value)}
              value={email}
            />

            <Input
              type="number"
              placeholder="Whatsapp"
              required
              onChange={event => setWhatsapp(event.target.value)}
              value={whatsapp}
            />
          </InputLine>
        </fieldset>

        <fieldset>
          <span>Localização</span>
          <Input
            type="text"
            placeholder="Bairro"
            required
            onChange={event => setDistrict(event.target.value)}
            value={district}
          />

          <InputLine>
            <Input
              type="text"
              placeholder="Endereço"
              required
              onChange={event => setStreet(event.target.value)}
              value={street}
            />

            <Input
              type="number"
              placeholder="Número"
              required
              onChange={event => setNumber(event.target.value)}
              value={number}
            />
          </InputLine>
        </fieldset>

        <fieldset>
          <span>Marque a localização do ponto de coleta clicando no mapa:</span>

          <Map
            selectedPosition={selectedPosition}
            handleSelectPosition={handleSelectPosition}
          />
        </fieldset>

        <fieldset>
          <span>Selecione os itens que o ponto coleta</span>

          <div className={styles.itemList}>
            {items?.map(item => (
              <div key={item.id} className={styles.item}>
                <input
                  type="checkbox"
                  id={`${item.id}`}
                  value={item.id}
                  onChange={event => handleSelectItem(Number(event.target.value))}
                />
                <label htmlFor={`${item.id}`}>
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className={styles.buttons}>
          <TextButton
            type="button"
            isRed
            onClick={() => router.back()}
          >
            Cancelar
          </TextButton>

          <OpacityButton>
            Criar ponto
          </OpacityButton>
        </div>
      </Form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ['recycleit.token']: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const response = await api.get(
    '/items'
  );

  const items: Item[] = await response.data;

  return {
    props: {
      items,
    }
  }
}

// eslint-disable-next-line react/display-name
CreatePoint.getLayout = (page: NextPage) => (
  <Layout>
    <PointTitleLayout
      title="Cadastrar ponto de coleta"
    >
      {page}
    </PointTitleLayout>
  </Layout>
)
