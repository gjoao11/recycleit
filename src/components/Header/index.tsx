import Image from 'next/image';
import { useRouter } from 'next/router';
import { MdMap, MdAccountCircle } from "react-icons/md";

import { IconButton } from '../IconButton';

import styles from './Header.module.scss';

type HeaderProps = {
  toggleLateralMenuVisibility: () => void;
}

export function Header({ toggleLateralMenuVisibility }: HeaderProps) {
  const router = useRouter();

  return (
    <div className={styles.headerContainer}>
      <span className={styles.logo}>
        <Image src="/recycleit.svg" alt="Recycle.it" width="28" height="24" />
        <span>Recycle.it</span>
      </span>

      <div className={styles.buttons}>
        <IconButton onClick={() => router.push('/')} aria-label="Mapa" >
          <MdMap size={30} color="var(--title)" />
        </IconButton>

        <IconButton onClick={toggleLateralMenuVisibility}>
          <MdAccountCircle size={30} color="var(--title)" aria-label="Conta" />
        </IconButton>
      </div>
    </div>
  )
}
