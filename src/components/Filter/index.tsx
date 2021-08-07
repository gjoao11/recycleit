import { useState } from 'react';
import { MdFilterList } from 'react-icons/md';

import { FilterMenu } from './FilterMenu';

import styles from './Filter.module.scss';

type Item = {
  id: number;
  name: string;
}

type FilterProps = {
  items: Item[];
  selectedItems: number[];
  state: string;
  city: string;
  handleSelectItem: (id: number) => void;
  handleFilterPoints: (state: string, city: string, itemsId: number[]) => void;
}

export function Filter({
  items,
  selectedItems,
  state,
  city,
  handleSelectItem,
  handleFilterPoints
}: FilterProps) {
  const [isFilteMenuVisible, setIsFilterMenuVisible] = useState(false);

  function toggleFilterMenuVisibility() {
    setIsFilterMenuVisible(!isFilteMenuVisible);
  }

  return (
    <div className={styles.filterContainer}>
      <button className={styles.openFilterMenuButton} onClick={toggleFilterMenuVisibility}>
        <MdFilterList size={32} color="var(--title)" />
        <span>Filtrar</span>
      </button>

      {
        isFilteMenuVisible
        &&
        <FilterMenu
          items={items}
          selectedItems={selectedItems}
          state={state}
          city={city}
          handleSelectItem={handleSelectItem}
          handleFilterPoints={handleFilterPoints}
        />
      }
    </div>
  )
}