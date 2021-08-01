import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Input } from '../components/Input';
import { OpacityButton } from '../components/OpacityButton';

import styles from '../styles/SignIn.module.scss';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.signInPage}>
      <Head>
        <title>Entrar | Recycle.it</title>
      </Head>

      <div className={styles.signInContainer}>
        <span className={styles.logo}>
          <Image src="/recycleit.svg" alt="Recycle.it" width="30" height="26" />
          <span>Recycle.it</span>
        </span>

        <form>
          <h1>Entrar</h1>

          <fieldset>
            <Input
              type="email"
              placeholder="E-mail"
              required
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
            <Input
              type="password"
              placeholder="Senha"
              required
              onChange={event => setPassword(event.target.value)}
              value={password}
            />
          </fieldset>

          <OpacityButton>
            Continuar
          </OpacityButton>
        </form>

        <span>Não tem uma conta? <Link href="/signup"><a>Criar uma conta</a></Link></span>
      </div>

      <div className={styles.otherLinks}>
        <Link href="/"><a>Ir para o mapa</a></Link>
      </div>
    </div>
  )
}