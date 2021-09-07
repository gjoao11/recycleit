import Image from 'next/image';
import { useRouter } from 'next/router';
import { api } from '../../services/api';

import { TextButton } from '../TextButton';

import styles from './PointView.module.scss';

type PointProps = {
  id: number;
  name: string;
  image: string;
}

export default function PointView({ name, image, id }: PointProps) {
  const router = useRouter();

  async function handleDeletePoint() {
    if (window.confirm('Tem certeza de que deseja deletar o ponto?')) {
      try {
        const response = await api.delete('/points/delete', {
          data: {
            id,
          }
        });

        if (response) {
          router.reload();
        }
      } catch (error) {
        console.log(error)
      }
    }

    return;
  }

  return (
    <div className={styles.pointViewContainer}>
      <div className={styles.imageDiv}>
        {
          image && image !== 'http://localhost:3333/uploads/undefined'
          &&
          <Image src={image} alt={name} layout="fill" />
        }
      </div>

      <div className={styles.infoDiv}>
        <h3>{name}</h3>

        <TextButton isRed onClick={handleDeletePoint}>
          Excluir
        </TextButton>
      </div>
    </div>
  )
}
