import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";

type PositionProviderProps = {
  children: ReactNode;
}

type PositionContextType = {
  position: LatLngExpression;
}

export const PositionContext = createContext({} as PositionContextType);

export function PositionProvider({ children }: PositionProviderProps) {
  const [position, setPosition] = useState<LatLngExpression>([-15.7751885, -48.3575963]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
    })
  }, [])

  return (
    <PositionContext.Provider value={{ position }}>
      {children}
    </PositionContext.Provider>
  )
}