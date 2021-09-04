import { FormHTMLAttributes, ReactNode } from 'react';

import styles from './Form.module.scss';

type TextButtonProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
}

export function Form({ children, ...props }: TextButtonProps) {
  return (
    <form
      className={styles.formContainer}
      {...props}
    >
      {children}
    </form>
  )
}
