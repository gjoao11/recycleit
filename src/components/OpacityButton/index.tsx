import { ButtonHTMLAttributes } from 'react';

import styles from './OpacityButton.module.scss';

type OpacityButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function OpacityButton({ isOutlined, ...props }: OpacityButtonProps) {
  return (
    <button
      className={`${styles.opacityButtonContainer} ${isOutlined ? styles.outlined : ''}`}
      {...props}
    />
  )
}