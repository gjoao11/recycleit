import { useRouter } from 'next/router';
import {
  MdAccountCircle,
  MdExitToApp,
  MdInfo,
  MdViewAgenda
} from 'react-icons/md';

import { GoMarkGithub } from "react-icons/go"

import { OpacityButton } from '../../OpacityButton';
import { OptionGroup } from '../OptionGroup';
import { MenuOption } from '../OptionGroup/MenuOption';

import styles from './UserMenu.module.scss';
import { useAuth } from '../../../hooks/useAuth';

type UserMenuProps = {
  toggleLateralMenuVisibility: () => void;
}

export function UserMenu({ toggleLateralMenuVisibility }: UserMenuProps) {
  const { user, signOut } = useAuth();
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
              router.push(`/users/${user.id}/points`);
              toggleLateralMenuVisibility();
            }}>
              <MdViewAgenda size={20} color="var(--text)" />
              <span>Gerenciar pontos de coleta</span>
            </MenuOption>

            <MenuOption>
              <GoMarkGithub size={20} color="var(--text)" />
              <a href="https://github.com/gjoao11/recycleit" target="_blank" rel='noreferrer'>
                <span>Repositório no GitHub</span>
              </a>
            </MenuOption>

            <MenuOption onClick={() => {
              router.push(`/info`);
              toggleLateralMenuVisibility();
            }}>
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
