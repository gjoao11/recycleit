import { ReactNode } from 'react';

import styles from './InputLine.module.scss';

type InputLineProps = {
  children: ReactNode;
  reverse?: boolean;
}

export function InputLine({ children, reverse }: InputLineProps) {
  return (
    <div className={`${styles.inputLineContainer} ${reverse ? styles.reverse : ''}`}>
      {children}
    </div>
  )
}
