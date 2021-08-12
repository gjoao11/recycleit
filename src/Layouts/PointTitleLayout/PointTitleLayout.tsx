import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { MdArrowBack } from 'react-icons/md';

import { IconButton } from '../../components/IconButton';
import { TextButton } from '../../components/TextButton';

import styles from './PointTitleLayout.module.scss';

type PointTitleLayoutProps = {
  title: String;
  hasBackButton?: boolean;
  textButton?: {
    text: string;
    linkDirection: string;
  }
  children: ReactNode;
}

export function PointTitleLayout({
  title,
  hasBackButton,
  textButton,
  children
}: PointTitleLayoutProps) {
  const router = useRouter()

  return (
    <div className={styles.conteiner}>
      <div className={styles.contentPointTitle}>
        <div>
          {
            hasBackButton
            &&
            <IconButton onClick={() => router.back()}>
              <MdArrowBack size={32} color="var(--title)" />
            </IconButton>
          }

          <h1>{title}</h1>
        </div>

        {
          textButton
          &&
          <TextButton onClick={() => router.push(`${textButton.linkDirection}`)}>
            {textButton.text}
          </TextButton>
        }
      </div>

      <hr></hr>

      <main>
        {children}
      </main>
    </div>
  );
}