import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  MdAccountCircle,
  MdExitToApp,
  MdHelp, MdInfo,
  MdViewAgenda
} from 'react-icons/md';

import { AuthContext } from '../../../contexts/AuthContext';
import { OpacityButton } from '../../OpacityButton';
import { OptionGroup } from '../OptionGroup';
import { MenuOption } from '../OptionGroup/MenuOption';

import styles from './UserMenu.module.scss';

type UserMenuProps = {
  toggleLateralMenuVisibility: () => void;
}

export function UserMenu({ toggleLateralMenuVisibility }: UserMenuProps) {
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className={styles.userMenuContainer}>
      {user ? (
        <>
          <div className={styles.userInfo}>
            <MdAccountCircle size={32} color="var(--title)" />
            <span>{user?.name} {user?.lastName}</span>
          </div>

          <OptionGroup>
            <MenuOption onClick={() => {
              router.push(`/users/${user.id}/management`);
              toggleLateralMenuVisibility();
            }}>
              <MdViewAgenda size={20} color="var(--text)" />
              <span>Gerenciar pontos de coleta</span>
            </MenuOption>
            <MenuOption>
              <MdHelp size={20} color="var(--text)" />
              <span>Ajuda</span>
            </MenuOption>
            <MenuOption>
              <MdInfo size={20} color="var(--text)" />
              <span>Sobre</span>
            </MenuOption>
          </OptionGroup>

          <OptionGroup>
            <MenuOption onClick={signOut}>
              <MdExitToApp size={20} color="var(--text)" />
              <span>Sair</span>
            </MenuOption>
          </OptionGroup>
        </>
      ) : (
        <div className={styles.noUser}>
          <OpacityButton
            isOutlined
            onClick={() => router.push('/signin')}
          >
            Entrar
          </OpacityButton>
          <span>ou</span>
          <OpacityButton
            isOutlined
            onClick={() => router.push('/signup')}
          >
            Criar uma conta
          </OpacityButton>
        </div>
      )}


    </div>
  )
}