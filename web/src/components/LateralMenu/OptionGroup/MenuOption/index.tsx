import { ButtonHTMLAttributes } from 'react';

import styles from './MenuOption.module.scss';

export function MenuOption(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={styles.menuOptionContainer}
      {...props}
    />
  )
}