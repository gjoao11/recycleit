import { useState } from "react";
import { ReactNode } from "react";

import { Header } from "../components/Header";
import { LateralMenu } from "../components/LateralMenu";
import { UserMenu } from "../components/LateralMenu/UserMenu";

type LayoutProps = {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isLateralMenuVisible, setIsLateralMenuVisible] = useState(false);

  function toggleLateralMenuVisibility() {
    setIsLateralMenuVisible(!isLateralMenuVisible);
  }

  return (
    <>
      <Header toggleLateralMenuVisibility={toggleLateralMenuVisibility} />
      {
        isLateralMenuVisible
        &&
        <LateralMenu
          title="Conta"
          toggleVisibility={toggleLateralMenuVisibility}
        >
          <UserMenu />
        </LateralMenu>
      }
      {children}
    </>
  )
}