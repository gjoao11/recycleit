import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './TextButton.module.scss';

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isRed?: boolean;
}

export function TextButton({ isRed, ...props }: TextButtonProps) {
  return (
    <button
      className={`${styles.textButtonContainer} ${isRed ? styles.isRed : ''}`}
      {...props}
    />
  )
}
