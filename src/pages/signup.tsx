import { FormEvent, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { parseCookies } from 'nookies';

import { Input } from '../components/Input';
import { OpacityButton } from '../components/OpacityButton';

import { AuthContext } from '../contexts/AuthContext';

import { api } from '../services/api';

import styles from '../styles/SignIn.module.scss';

type SignUpData = {
  name: string;
  lastName: String;
  email: string;
  password: string;
}

export default function SignUp() {
  const { signIn } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isTheEmailValid, setIsTheEmailValid] = useState(true);

  async function handleSignUp(
    event: FormEvent,
    { name, lastName, email, password }: SignUpData
  ) {
    event.preventDefault();

    !isTheEmailValid && setIsTheEmailValid(true);

    const { data } = await api.post('/users/signup', {
      name,
      lastName,
      email,
      password,
    })

    if (!data) {
      return
    }

    if (data['emailAlreadyRegistered']) {
      setIsTheEmailValid(false);
      return;
    }

    try {
      await signIn({ email, password });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div className={styles.signInPage}>
      <Head>
        <title>Criar uma conta | Recycle.it</title>
      </Head>

      <div className={styles.signInContainer}>
        <span className={styles.logo}>
          <Image src="/recycleit.svg" alt="Recycle.it" width="28" height="24" />
          <span>Recycle.it</span>
        </span>

        <form onSubmit={event => {
          handleSignUp(event, { name, lastName, email, password })
        }}>
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

          <div>
            {
              (!isTheEmailValid)
              &&
              <span className={styles.formAlert}>
                * Este endereço de e-mail já foi registrado
              </span>
            }

            <OpacityButton>
              Continuar
            </OpacityButton>
          </div>
        </form>

        <span>Já tem uma conta? <Link href="/signin"><a>Entrar</a></Link></span>
      </div>

      <div className={styles.otherLinks}>
        <Link href="/"><a>Ir para o mapa</a></Link>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ['recycleit.token']: token } = parseCookies(context);

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
}