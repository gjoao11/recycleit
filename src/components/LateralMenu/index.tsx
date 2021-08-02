import { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

import { IconButton } from '../IconButton';

import styles from './LateralMenu.module.scss';

type LateralMenuProps = {
  title: string;
  children: ReactNode;
  toggleVisibility: () => void;
}

export function LateralMenu({ title, children, toggleVisibility }: LateralMenuProps) {
  return (
    <div className={styles.lateralMenuContainer}>
      <header>
        <IconButton onClick={toggleVisibility} aria-label="Fechar">
          <MdClose size={28} color="var(--title)" />
        </IconButton>
        <span>{title}</span>
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}