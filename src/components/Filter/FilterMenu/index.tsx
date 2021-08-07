import { Input } from '../../Input';
import { TextButton } from '../../TextButton';
import styles from './FilterMenu.module.scss';

type Item = {
  id: number;
  name: string;
}

type FilterMenuProps = {
  items: Item[];
  selectedItems: number[];
  state: string;
  city: string;
  handleSelectItem: (id: number) => void;
  handleFilterPoints: (state: string, city: string, itemsId: number[]) => void;
}

export function FilterMenu({
  items,
  selectedItems,
  state,
  city,
  handleSelectItem,
  handleFilterPoints
}: FilterMenuProps) {
  return (
    <div className={styles.filterMenuContainer}>
      <span>Filtrar por itens</span>

      <div className={styles.itemsContainer}>
        {items.map(item => (
          <div key={item.id} className={styles.item}>
            <input
              type="checkbox"
              id={`${item.id}`}
              value={item.id}
              onChange={event => handleSelectItem(Number(event.target.value))}
            />
            <label htmlFor={`${item.id}`}>
              {item.name}
            </label>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <TextButton
          onClick={() => handleFilterPoints(state, city, selectedItems)}
        >
          Filtrar
        </TextButton>
      </div>
    </div>
  )
}