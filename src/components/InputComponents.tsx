import { InputHTMLAttributes } from 'react';

import styles from '../styles/components/InputComponent.module.scss';

export function InputComponent(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={styles.container}
      {...props}
    />
  )
}