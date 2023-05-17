import { ButtonHTMLAttributes } from "react";

import styles from './IconButton.module.scss';

export function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={styles.iconButtonContainer}
      {...props}
    />
  )
}