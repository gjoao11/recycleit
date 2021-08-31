import { useRouter } from 'next/router';

import { TextButton } from '../TextButton';

import styles from './Point.module.scss';

type PointProps = {
  name: String;
  image?: String;
  status: String;
  textButton: {
    text: String;
    linkDirection: String;
  };
}

export default function PointView({ name, image, status, textButton }: PointProps) {
  const router = useRouter();

  return (
    <div className={styles.conteiner}>
      <div className={styles.imageDiv}>
        <span>{image}</span>
      </div>

      <div className={styles.infoDiv}>
        <div>
          <h3>{name}</h3>
          <span>{status ? 'ativo' : 'inativo'}</span>
        </div>

        <div>
          <TextButton onClick={() => router.push(`${textButton.linkDirection}`)}>
            {textButton.text}
          </TextButton>
        </div>
      </div>
    </div>
  )
}
