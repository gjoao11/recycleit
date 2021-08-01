import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Input } from '../components/Input';
import { OpacityButton } from '../components/OpacityButton';

import styles from '../styles/SignIn.module.scss';

export default function SignUp() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.signInPage}>
      <Head>Criar uma conta | Recycle.it</Head>

      <div className={styles.signInContainer}>
        <span className={styles.logo}>
          <Image src="/recycleit.svg" alt="Recycle.it" width="30" height="26" />
          <span>Recycle.it</span>
        </span>

        <form>
          <fieldset>
            <span>Informações pessoais</span>
            <Input
              type="text"
              placeholder="Nome"
              required
              onChange={event => setName(event.target.value)}
              value={name}
            />
            <Input
              type="text"
              placeholder="Sobrenome"
              required
              onChange={event => setLastName(event.target.value)}
              value={lastName}
            />
          </fieldset>

          <fieldset>
            <span>Informações da conta</span>
            <Input
              type="email"
              placeholder="Email"
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

        <span>Já tem uma conta? <Link href="/signin"><a>Entrar</a></Link></span>
      </div>

      <div className={styles.otherLinks}>
        <Link href="/"><a>Ir para o mapa</a></Link>
      </div>
    </div>
  )
}