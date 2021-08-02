import { ReactNode } from 'react';

import styles from './OptionGroup.module.scss';

type OptionGroupProps = {
  children: ReactNode;
}

export function OptionGroup({ children }: OptionGroupProps) {
  return (
    <div className={styles.optionGroupContainer}>
      {children}
    </div>
  )
}