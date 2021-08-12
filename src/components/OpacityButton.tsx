import { ButtonHTMLAttributes } from "react";

import styles from '../styles/components/OpacityButton.module.scss';

export function OpacityButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={styles.container}
      {...props}
    />
  )
}