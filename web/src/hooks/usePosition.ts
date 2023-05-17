import { useContext } from 'react';
import { PositionContext } from '../contexts/PositionContext';

export function usePosition() {
  const context = useContext(PositionContext);

  return context;
}
