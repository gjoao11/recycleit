import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './TextButton.module.scss';

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}

export function TextButton({ children, ...props }: TextButtonProps) {
  return (
    <button
      className={styles.textButtonContainer}
      {...props}
    >
      {children}
    </button>
  )
}